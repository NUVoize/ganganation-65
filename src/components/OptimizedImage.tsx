import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain';
  sizes?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  priority = false,
  objectFit = 'cover',
  sizes = '100vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Check if we should try advanced image formats
  const hasAdvancedFormats = (url: string) => {
    // Only use advanced formats for imported assets, not public folder images
    return !url.startsWith('/');
  };

  // Generate WebP version URL (if backend supports it, otherwise fallback)
  const getWebPUrl = (url: string) => {
    if (!hasAdvancedFormats(url)) return url;
    if (url.includes('.jpg') || url.includes('.jpeg')) {
      return url.replace(/\.(jpg|jpeg)$/i, '.webp');
    }
    return url;
  };

  // Generate srcset for responsive images
  const generateSrcSet = (url: string) => {
    if (!hasAdvancedFormats(url)) return url;
    const base = url.split('.').slice(0, -1).join('.');
    const ext = url.split('.').pop();
    return `${base}.${ext} 1x, ${base}@2x.${ext} 2x`;
  };

  if (hasError) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-muted",
        className
      )}>
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Blur placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-smokey animate-pulse" />
      )}
      
      <picture>
        {/* WebP format for modern browsers - only for imported assets */}
        {hasAdvancedFormats(src) && (
          <source
            type="image/webp"
            srcSet={generateSrcSet(getWebPUrl(src))}
            sizes={sizes}
          />
        )}
        
        {/* Fallback to original format */}
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            objectFit === 'cover' ? 'object-cover' : 'object-contain',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      </picture>
    </div>
  );
};
