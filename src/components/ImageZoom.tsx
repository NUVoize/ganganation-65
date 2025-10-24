import React, { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { OptimizedImage } from './OptimizedImage';
import { ZoomIn } from 'lucide-react';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  objectFit?: 'cover' | 'contain';
  priority?: boolean;
  sizes?: string;
}

export const ImageZoom: React.FC<ImageZoomProps> = ({
  src,
  alt,
  className,
  objectFit = 'cover',
  priority = false,
  sizes = '100vw'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Convert 300x300 image path to 800x800
  const getHighResImage = (imagePath: string) => {
    if (imagePath.includes('mushroom_images_300')) {
      return imagePath.replace('/mushroom_images_300/', '/mushroom_images_800/').replace('X300.jpg', 'X800.jpg');
    }
    if (imagePath.includes('hash_images_300')) {
      return imagePath.replace('/hash_images_300/', '/hash_images_800/').replace('X300.jpg', 'X800.jpg');
    }
    if (imagePath.includes('edible_images_300')) {
      return imagePath.replace('/edible_images_300/', '/edible_images_800/').replace('X300.jpg', 'X800.jpg');
    }
    if (imagePath.includes('papers_images_300')) {
      return imagePath.replace('/papers_images_300/', '/papers_images_800/').replace('X300.jpg', 'X800.jpg');
    }
    if (imagePath.includes('wax_images_300')) {
      return imagePath.replace('/wax_images_300/', '/wax_images_800/').replace('X300.jpg', 'X800.jpg');
    }
    return imagePath.replace('/weed_images_300/', '/weed_images_800/').replace('X300.jpg', 'X800.jpg');
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <>
      <div 
        className={`relative cursor-zoom-in group ${className}`}
        onClick={handleImageClick}
      >
        <OptimizedImage
          src={src}
          alt={alt}
          className="w-full h-full"
          objectFit={objectFit}
          priority={priority}
          sizes={sizes}
        />
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-background/80 rounded-full p-2">
            <ZoomIn className="w-6 h-6 text-foreground" />
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-background/95 backdrop-blur-md">
          <div className="relative w-full h-[80vh] flex items-center justify-center p-4">
            <OptimizedImage
              src={getHighResImage(src)}
              alt={`${alt} - Zoomed view`}
              className="max-w-full max-h-full"
              objectFit="contain"
              priority={true}
              sizes="80vw"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
