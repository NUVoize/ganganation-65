import { useState } from 'react';
import { WhiskeyProduct } from '../types/whiskey';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageZoom } from './ImageZoom';
import { TieredPricing } from './TieredPricing';
import { LayAwayModal } from './LayAwayModal';
import { CountryFlag } from './CountryFlag';
import { getBasePrice, getDisplayPrice, isTieredPrice } from '@/utils/pricing';

interface WhiskeyDetailProps {
  whiskey: WhiskeyProduct;
  onClose: () => void;
}

export const WhiskeyDetail = ({ whiskey, onClose }: WhiskeyDetailProps) => {
  const [isLayAwayModalOpen, setIsLayAwayModalOpen] = useState(false);
  
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Ultra Rare': return 'bg-gradient-amber text-primary-foreground';
      case 'Rare': return 'bg-gradient-copper text-accent-foreground';
      case 'Limited': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <Card className="glass-card max-w-4xl w-full max-h-[90vh] overflow-auto animate-fade-in">
        <CardHeader className="relative">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10"
          >
            ✕
          </Button>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Section */}
            <div className="md:w-1/3">
              <div className="h-64 bg-gradient-smokey rounded-lg overflow-hidden">
                {whiskey.images && whiskey.images.length > 0 ? (
                  <ImageZoom
                    src={whiskey.images[0]} 
                    alt={`${whiskey.brand} ${whiskey.name} - Detailed view`}
                    className="w-full h-full"
                    objectFit="cover"
                    priority={true}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="font-serif text-2xl text-smokey mb-2">{whiskey.brand}</h3>
                      <p className="text-muted-foreground">Premium Collection</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Basic Info */}
            <div className="md:w-2/3">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getRarityColor(whiskey.rarity)}>{whiskey.rarity}</Badge>
                {whiskey.featured && (
                  <Badge className="bg-gradient-featured text-accent-foreground font-semibold animate-glow-pulse border border-accent/30">
                    Featured
                  </Badge>
                )}
                <Badge variant={whiskey.inStock ? "default" : "destructive"}>
                  {whiskey.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
              
              <CardTitle className="font-serif text-3xl text-smokey mb-2">{whiskey.name}</CardTitle>
              <p className="text-xl text-muted-foreground mb-4">{whiskey.brand}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <p className="font-medium">{whiskey.type}</p>
                </div>
                {whiskey.thcContent && (
                  <div>
                    <span className="text-sm text-muted-foreground">THC:</span>
                    <p className="font-medium">{whiskey.thcContent}%</p>
                  </div>
                )}
                <div>
                  <span className="text-sm text-muted-foreground">Origin:</span>
                  <CountryFlag country={whiskey.origin} size={20} className="mt-1" />
                </div>
              </div>
              
              {/* Show tiered pricing for flower products and hash with tiered pricing */}
              {!isTieredPrice(whiskey.price) && whiskey.type !== 'Concentrate' && whiskey.type !== 'Accessories' && whiskey.type !== 'Pre-Roll' && whiskey.type !== 'Edible' && whiskey.type !== 'Hash' && (
                <TieredPricing perGramPrice={getBasePrice(whiskey.price)} className="mt-4" />
              )}
              {isTieredPrice(whiskey.price) && whiskey.type === 'Hash' && (
                <div className="mt-4 p-4 rounded-lg bg-secondary/50">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <span className="text-xs text-muted-foreground">3.5g</span>
                      <p className="text-lg font-bold text-primary">${whiskey.price['3.5g'].toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-muted-foreground">7g</span>
                      <p className="text-lg font-bold text-primary">${whiskey.price['7g'].toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-muted-foreground">14g</span>
                      <p className="text-lg font-bold text-primary">${whiskey.price['14g'].toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-muted-foreground">Ounce</span>
                      <p className="text-lg font-bold text-primary">${whiskey.price.ounce.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
              {(whiskey.type === 'Concentrate' || whiskey.type === 'Accessories' || whiskey.type === 'Pre-Roll' || whiskey.type === 'Edible') && (
                <div className="mt-4 p-4 rounded-lg bg-secondary/50">
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">Price per item:</span>
                    <p className="text-2xl font-bold text-primary mt-1">{getDisplayPrice(whiskey.price)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1 h-auto">
              <TabsTrigger value="details" className="text-xs sm:text-sm py-2">Details</TabsTrigger>
              <TabsTrigger value="tasting" className="text-xs sm:text-sm py-2">Tasting Notes</TabsTrigger>
              <TabsTrigger value="provenance" className="text-xs sm:text-sm py-2">Provenance</TabsTrigger>
              <TabsTrigger value="awards" className="text-xs sm:text-sm py-2">Recognition</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              <div>
                <h3 className="font-serif text-lg text-smokey mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{whiskey.description}</p>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Flavor Profile</h4>
                  <p className="text-sm text-muted-foreground">{whiskey.flavor}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Pairing Suggestions</h4>
                  <p className="text-sm text-muted-foreground">{whiskey.pairing}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tasting" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-serif text-lg text-natural mb-3">Primary Effects</h3>
                  <div className="space-y-1">
                    {whiskey.effects.primary.map((effect, index) => (
                      <Badge key={index} variant="outline" className="mr-1 mb-1">
                        {effect}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-serif text-lg text-natural mb-3">Secondary Effects</h3>
                  <div className="space-y-1">
                    {whiskey.effects.secondary.map((effect, index) => (
                      <Badge key={index} variant="outline" className="mr-1 mb-1">
                        {effect}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-serif text-lg text-natural mb-3">Duration</h3>
                  <div className="space-y-1">
                    {whiskey.effects.duration.map((duration, index) => (
                      <Badge key={index} variant="outline" className="mr-1 mb-1">
                        {duration}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="provenance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-serif text-lg text-natural mb-3">Grower Information</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Grower:</span>
                      <p className="font-medium">{whiskey.grower}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Region:</span>
                      <p className="font-medium">{whiskey.region || 'Multiple Regions'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Country:</span>
                      <CountryFlag country={whiskey.origin} size={20} className="mt-1" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-serif text-lg text-smokey mb-3">Production Details</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Category:</span>
                      <p className="font-medium">{whiskey.type}</p>
                    </div>
                    {whiskey.thcContent && (
                      <div>
                        <span className="text-sm text-muted-foreground">THC Content:</span>
                        <p className="font-medium">{whiskey.thcContent}%</p>
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-muted-foreground">SKU:</span>
                      <p className="font-medium">{whiskey.sku}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="awards" className="space-y-4">
              <div>
                <h3 className="font-serif text-lg text-smokey mb-3">Awards & Recognition</h3>
                {whiskey.awards && whiskey.awards.length > 0 ? (
                  <div className="space-y-2">
                    {whiskey.awards.map((award, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <p className="text-muted-foreground">{award}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No awards information available for this expression.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <Separator className="my-6" />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="btn-premium flex-1 max-w-xs"
              disabled={!whiskey.inStock}
              onClick={() => setIsLayAwayModalOpen(true)}
            >
              {whiskey.inStock ? 'Request This Strain' : 'Currently Unavailable'}
            </Button>
            <Button variant="outline" className="flex-1 max-w-xs">
              Ask Our Budtender
            </Button>
          </div>
        </CardContent>
      </Card>

      <LayAwayModal
        isOpen={isLayAwayModalOpen}
        onClose={() => setIsLayAwayModalOpen(false)}
        product={whiskey}
      />
    </div>
  );
};