import { WhiskeyProduct } from '../types/whiskey';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface WhiskeyDetailProps {
  whiskey: WhiskeyProduct;
  onClose: () => void;
}

export const WhiskeyDetail = ({ whiskey, onClose }: WhiskeyDetailProps) => {
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
                  <img 
                    src={whiskey.images[0]} 
                    alt={`${whiskey.brand} ${whiskey.name}`}
                    className="w-full h-full object-cover"
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
                  <Badge className="bg-gradient-amber animate-glow-pulse">Featured</Badge>
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
                  <span className="text-sm text-muted-foreground">CBD:</span>
                  <p className="font-medium">{whiskey.cbdContent || 0}%</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Origin:</span>
                  <p className="font-medium">{whiskey.origin}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary">${whiskey.price.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground font-mono">SKU: {whiskey.sku}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="tasting">Tasting Notes</TabsTrigger>
              <TabsTrigger value="provenance">Provenance</TabsTrigger>
              <TabsTrigger value="awards">Recognition</TabsTrigger>
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
                      <p className="font-medium">{whiskey.origin}</p>
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
                      <span className="text-sm text-muted-foreground">CBD Content:</span>
                      <p className="font-medium">{whiskey.cbdContent || 0}%</p>
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
            >
              {whiskey.inStock ? 'Request This Strain' : 'Currently Unavailable'}
            </Button>
            <Button variant="outline" className="flex-1 max-w-xs">
              Ask Our Budtender
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};