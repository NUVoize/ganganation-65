import React from 'react';
import { WhiskeyProduct } from '../types/whiskey';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Copy, Facebook, Instagram, Twitter, ExternalLink } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface ShareModalProps {
  whiskey: WhiskeyProduct;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal = ({ whiskey, isOpen, onClose }: ShareModalProps) => {
  const { toast } = useToast();

  const generateShareContent = (platform: string) => {
    const baseUrl = window.location.origin;
    const whiskeyUrl = `${baseUrl}?whiskey=${whiskey.id}`;
    
    const bootleggerBranding = "🥃 Available at BOOTLEGGER Speakeasy";
    const callToAction = "Visit us to taste this premium whiskey!";
    const hashtags = "#BOOTLEGGER #Speakeasy #PremiumWhiskey #WhiskeyLovers";
    
    switch (platform) {
      case 'instagram-post':
        return {
          text: `🥃 ${whiskey.brand} - ${whiskey.name}\n\n✨ ${whiskey.description}\n\n${bootleggerBranding}\n${callToAction}\n\n${hashtags} #${whiskey.type.replace(/\s+/g, '')} #${whiskey.origin.replace(/\s+/g, '')}`,
          url: whiskeyUrl
        };
      
      case 'instagram-story':
        return {
          text: `🔥 ${whiskey.brand} ${whiskey.name}\n\n${whiskey.thcContent ? `${whiskey.thcContent}% THC` : whiskey.type}\n$${whiskey.price}/gram\n\n${bootleggerBranding}\n\n${hashtags}`,
          url: whiskeyUrl
        };
      
      case 'facebook':
        return {
          text: `Discover the exceptional ${whiskey.brand} - ${whiskey.name} at GANJA NATION Dispensary!\n\nThis premium ${whiskey.type} from ${whiskey.origin} offers an unforgettable experience. ${whiskey.description}\n\n🌿 ${whiskey.thcContent ? `${whiskey.thcContent}% THC` : 'Premium quality'}\n💰 $${whiskey.price} per gram\n🏆 ${whiskey.rarity} selection\n\n${callToAction}\n\n${hashtags}`,
          url: whiskeyUrl
        };
      
      case 'twitter':
        return {
          text: `🥃 ${whiskey.brand} - ${whiskey.name} at @BOOTLEGGER_Bar\n\n${whiskey.type} | ${whiskey.origin} | $${whiskey.price}/glass\n\n${callToAction}\n\n${hashtags}`,
          url: whiskeyUrl
        };
      
      default:
        return {
          text: `${whiskey.brand} - ${whiskey.name}\n\nExperience this exceptional ${whiskey.type} from ${whiskey.origin} at GANJA NATION Dispensary.\n\n${whiskey.description}\n\n• ${whiskey.thcContent ? `THC: ${whiskey.thcContent}%` : `Type: ${whiskey.type}`}\n• CBD: ${whiskey.cbdContent || 0}%\n• Price: $${whiskey.price} per gram\n• Rarity: ${whiskey.rarity}\n\n${callToAction}\n\nVisit GANJA NATION Dispensary for the complete premium cannabis experience.\n\n${hashtags}`,
          url: whiskeyUrl
        };
    }
  };

  const copyToClipboard = async (content: { text: string; url: string }) => {
    try {
      const fullText = `${content.text}\n\n${content.url}`;
      await navigator.clipboard.writeText(fullText);
      toast({
        title: "Copied to clipboard!",
        description: "Share content has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try again or copy manually.",
        variant: "destructive"
      });
    }
  };

  const handlePlatformShare = async (platform: string) => {
    const content = generateShareContent(platform);
    
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: `${whiskey.brand} - ${whiskey.name}`,
          text: content.text,
          url: content.url
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      await copyToClipboard(content);
    }
    onClose();
  };

  const shareOptions = [
    {
      id: 'instagram-post',
      name: 'Instagram Post',
      icon: Instagram,
      description: 'Perfect for your feed with hashtags',
      color: 'text-pink-500'
    },
    {
      id: 'instagram-story',
      name: 'Instagram Story',
      icon: Instagram,
      description: 'Short format for stories',
      color: 'text-purple-500'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      description: 'Detailed post with full description',
      color: 'text-blue-500'
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: Twitter,
      description: 'Concise format with key details',
      color: 'text-blue-400'
    },
    {
      id: 'copy',
      name: 'Copy Link',
      icon: Copy,
      description: 'Copy full details to clipboard',
      color: 'text-muted-foreground'
    }
  ];

  // Add native share if available
  if (navigator.share) {
    shareOptions.push({
      id: 'native',
      name: 'Share via Device',
      icon: ExternalLink,
      description: 'Use your device\'s share menu',
      color: 'text-primary'
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-smokey">
            Share {whiskey.brand} - {whiskey.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {shareOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.id}
                variant="ghost"
                className="w-full justify-start h-auto p-4 hover:bg-muted/50"
                onClick={() => handlePlatformShare(option.id)}
              >
                <div className="flex items-center space-x-3 w-full">
                  <IconComponent className={`h-5 w-5 ${option.color}`} />
                  <div className="text-left flex-1">
                    <div className="font-medium text-smokey">{option.name}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
        
        <div className="text-center pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            Ganja nation, premium Buds experience
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};