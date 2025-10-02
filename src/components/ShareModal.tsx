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
    const productUrl = `${baseUrl}?whiskey=${whiskey.id}`;
    
    // Business Information with clickable links
    const businessInfo = {
      name: "Ganja Nation",
      website: "https://ganjanation.com",
      websiteWithTracking: (source: string) => `https://ganjanation.com?utm_source=${source}&utm_medium=social&utm_campaign=product_share&utm_content=${whiskey.sku}`,
      instagram: "@ganjanation",
      instagramUrl: "https://instagram.com/ganjanation",
      facebook: "facebook.com/ganjanation",
      facebookUrl: "https://facebook.com/ganjanation",
      address: "123 Green Street, Cannabis City, CC 12345",
      mapsUrl: "https://maps.google.com/?q=Ganja+Nation+Dispensary",
      phone: "+1-555-GANJA-1",
      phoneUrl: "tel:+15557426521"
    };
    
    const hashtags = "#GanjaNation #PremiumCannabis #CannabisLovers #CannabisCommunity";
    
    switch (platform) {
      case 'instagram-post':
        return {
          text: `🌿 ${whiskey.brand} - ${whiskey.name}\n\n✨ ${whiskey.description}\n\n${whiskey.thcContent ? `💚 ${whiskey.thcContent}% THC` : `💚 ${whiskey.type}`}\n💰 $${whiskey.price}/gram\n🏆 ${whiskey.rarity}\n\n📍 Available at ${businessInfo.name}\n🔗 Link in bio → ${businessInfo.website}\n📲 Follow ${businessInfo.instagram} for more\n🗺️ Visit us: ${businessInfo.address}\n\n${hashtags} #${whiskey.type.replace(/\s+/g, '')} #${whiskey.origin.replace(/\s+/g, '')}`,
          url: businessInfo.websiteWithTracking('instagram')
        };
      
      case 'instagram-story':
        return {
          text: `🔥 ${whiskey.brand} ${whiskey.name}\n\n${whiskey.thcContent ? `${whiskey.thcContent}% THC` : whiskey.type}\n$${whiskey.price}/gram\n\n📍 ${businessInfo.name}\n🔗 Swipe up or visit\n${businessInfo.website}\n\n📲 ${businessInfo.instagram}\n\n${hashtags}`,
          url: businessInfo.websiteWithTracking('instagram-story')
        };
      
      case 'facebook':
        return {
          text: `🌿 Discover ${whiskey.brand} - ${whiskey.name} at ${businessInfo.name}!\n\nThis premium ${whiskey.type} from ${whiskey.origin} offers an unforgettable experience. ${whiskey.description}\n\n${whiskey.thcContent ? `💚 THC: ${whiskey.thcContent}%` : `💚 Premium quality`}\n💰 $${whiskey.price} per gram\n🏆 ${whiskey.rarity} selection\n\n━━━━━━━━━━━━━━━━━━━\n🌐 Shop online: ${businessInfo.websiteWithTracking('facebook')}\n📍 Visit us: ${businessInfo.mapsUrl}\n📱 Follow us: ${businessInfo.facebookUrl}\n☎️ Call: ${businessInfo.phoneUrl}\n━━━━━━━━━━━━━━━━━━━\n\nVisit ${businessInfo.name} for the complete premium cannabis experience!\n\n${hashtags} #${whiskey.type.replace(/\s+/g, '')} #${whiskey.origin.replace(/\s+/g, '')}`,
          url: businessInfo.websiteWithTracking('facebook')
        };
      
      case 'twitter':
        return {
          text: `🌿 ${whiskey.brand} - ${whiskey.name} at ${businessInfo.name}\n\n${whiskey.type} | ${whiskey.origin} | $${whiskey.price}/gram\n${whiskey.thcContent ? `${whiskey.thcContent}% THC` : 'Premium quality'}\n\n🌐 ${businessInfo.websiteWithTracking('twitter')}\n📍 ${businessInfo.mapsUrl}\n\n${hashtags}`,
          url: businessInfo.websiteWithTracking('twitter')
        };
      
      default:
        return {
          text: `🌿 ${whiskey.brand} - ${whiskey.name}\n\nExperience this exceptional ${whiskey.type} from ${whiskey.origin} at ${businessInfo.name}.\n\n${whiskey.description}\n\n• ${whiskey.thcContent ? `THC: ${whiskey.thcContent}%` : `Type: ${whiskey.type}`}\n• CBD: ${whiskey.cbdContent || 0}%\n• Price: $${whiskey.price} per gram\n• Rarity: ${whiskey.rarity}\n\n━━━━━━━━━━━━━━━━━━━\n🌐 Website: ${businessInfo.websiteWithTracking('copy')}\n📍 Location: ${businessInfo.mapsUrl}\n📱 Instagram: ${businessInfo.instagramUrl}\n📘 Facebook: ${businessInfo.facebookUrl}\n☎️ Phone: ${businessInfo.phoneUrl}\n━━━━━━━━━━━━━━━━━━━\n\nVisit ${businessInfo.name} for the complete premium cannabis experience.\n\n${hashtags} #${whiskey.type.replace(/\s+/g, '')} #${whiskey.origin.replace(/\s+/g, '')}`,
          url: businessInfo.websiteWithTracking('copy')
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
      
      // Open respective social media platform
      const encodedText = encodeURIComponent(content.text);
      const encodedUrl = encodeURIComponent(content.url);
      
      let shareUrl = '';
      
      switch (platform) {
        case 'instagram-post':
        case 'instagram-story':
          // Instagram doesn't support web posting, try to open app or redirect to Instagram
          shareUrl = 'https://www.instagram.com/';
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      }
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
            Ganja Nation - Premium Cannabis Experience
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            All links include tracking to measure social media traffic
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};