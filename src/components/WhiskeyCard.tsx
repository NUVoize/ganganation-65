import { WhiskeyProduct } from '../types/whiskey';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useUser } from '../contexts/UserContext';
import { Heart, Cigarette, ExternalLink } from 'lucide-react';
import { ShareModal } from './ShareModal';
import { useState } from 'react';
import { ImageZoom } from './ImageZoom';
import { CountryFlag } from './CountryFlag';
import { BrandBadge } from './BrandBadge';

interface WhiskeyCardProps {
  whiskey: WhiskeyProduct;
  onClick: (whiskey: WhiskeyProduct) => void;
  onTastingClick?: (whiskey: WhiskeyProduct) => void;
}

export const WhiskeyCard = ({ whiskey, onClick, onTastingClick }: WhiskeyCardProps) => {
  const { isWhiskeySaved, addToSaved, removeFromSaved, hasUserTasted } = useUser();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShareModalOpen(true);
  };
  
  const isLeafsAndPapers = ['Backwoods', 'Juicy Hemp Wraps', 'Juicy Jay\'s', 'OCB', 'Bambú', 'Blaze'].includes(whiskey.brand);
  
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Ultra Rare': return 'bg-gradient-amber text-primary-foreground';
      case 'Rare': return 'bg-gradient-copper text-accent-foreground';
      case 'Limited': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card 
      className="glass-card product-card-glow hover:amber-glow transition-all duration-500 cursor-pointer group animate-fade-in"
      onClick={() => onClick(whiskey)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="h-48 bg-gradient-smokey flex items-center justify-center p-4">
          {whiskey.images && whiskey.images.length > 0 ? (
            <ImageZoom
              src={whiskey.images[0]} 
              alt={`${whiskey.name} - ${whiskey.type} cannabis product`}
              className="h-full w-auto mx-auto"
              objectFit="contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="text-center">
              <h3 className="font-serif text-xl text-smokey mb-2">{whiskey.brand}</h3>
              <p className="text-muted-foreground text-sm">Premium Collection</p>
            </div>
          )}
        </div>
        {whiskey.featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-featured text-accent-foreground font-semibold animate-glow-pulse border border-accent/30">
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isLeafsAndPapers && (
            <BrandBadge brand={whiskey.brand} size="sm" />
          )}
          <Badge className={getRarityColor(whiskey.rarity)}>{whiskey.rarity}</Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="font-serif text-lg text-smokey">{whiskey.name}</CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{whiskey.type}</span>
          {!isLeafsAndPapers && whiskey.thcContent && <span>{whiskey.thcContent}% THC</span>}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-3">
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">${whiskey.price}</span>
            {!isLeafsAndPapers && whiskey.type !== 'Edible' && <span className="text-sm text-muted-foreground block">per gram</span>}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {whiskey.description}
        </p>
        
        <div className="flex items-center justify-between mb-3 gap-2">
          <div className="text-xs text-muted-foreground flex items-center space-x-2 flex-1 min-w-0">
            <CountryFlag country={whiskey.origin} size={24} />
            {whiskey.region && <span className="truncate ml-1"> • {whiskey.region}</span>}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="btn-premium group-hover:scale-105 transition-transform flex-shrink-0"
          >
            View Details
          </Button>
        </div>
        
        <div className="mt-3 text-center">
          <Badge 
            variant={whiskey.inStock ? "default" : "destructive"}
            className="text-xs"
          >
            {whiskey.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-center mt-4">
          <div className="flex space-x-8">
            <Button
              variant="ghost"
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                isWhiskeySaved(whiskey.id) ? removeFromSaved(whiskey.id) : addToSaved(whiskey.id);
              }}
              className={`p-3 rounded-lg bg-muted/50 hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-colors ${isWhiskeySaved(whiskey.id) ? 'text-primary' : 'text-muted-foreground'} hover:text-red-500`}
            >
              <Heart className={`h-8 w-8 ${isWhiskeySaved(whiskey.id) ? 'fill-current' : ''}`} />
            </Button>
            {onTastingClick && (
              <Button
                variant="ghost"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  onTastingClick(whiskey);
                }}
                className={`p-3 rounded-lg bg-muted/50 hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-colors ${hasUserTasted(whiskey.id) ? 'text-primary' : 'text-muted-foreground'} hover:text-red-500`}
              >
                <Cigarette className="h-8 w-8" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="lg"
              onClick={handleShareClick}
              className="p-3 rounded-lg bg-muted/50 hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-colors text-muted-foreground hover:text-red-500"
            >
              <ExternalLink className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </CardContent>
      
      <ShareModal 
        whiskey={whiskey}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </Card>
  );
};