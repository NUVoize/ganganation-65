import React from 'react';
import { cn } from '@/lib/utils';

interface BrandBadgeProps {
  brand: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandBadge: React.FC<BrandBadgeProps> = ({ brand, size = 'sm', className }) => {
  const getBrandLogo = (brandName: string) => {
    const lowerBrand = brandName.toLowerCase();
    
    if (lowerBrand.includes('backwoods')) {
      return (
        <div className="flex flex-col items-center gap-1">
          <svg className={cn(
            "text-amber-700",
            size === 'sm' && "w-6 h-6",
            size === 'md' && "w-8 h-8",
            size === 'lg' && "w-10 h-10"
          )} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18L18.18 8 12 11.82 5.82 8 12 4.18zM6 9.73l5 2.91v8.63l-5-2.91V9.73zm12 8.63l-5 2.91v-8.63l5-2.91v8.63z"/>
          </svg>
          <span className={cn(
            "font-bold text-amber-700 text-center leading-none",
            size === 'sm' && "text-[9px]",
            size === 'md' && "text-xs",
            size === 'lg' && "text-sm"
          )}>
            BACKWOODS
          </span>
        </div>
      );
    }
    
    if (lowerBrand.includes('juicy jay')) {
      return (
        <div className="flex flex-col items-center gap-1">
          <svg className={cn(
            "text-pink-500",
            size === 'sm' && "w-6 h-6",
            size === 'md' && "w-8 h-8",
            size === 'lg' && "w-10 h-10"
          )} viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" opacity="0.3"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
          <span className={cn(
            "font-bold text-pink-500 text-center leading-none",
            size === 'sm' && "text-[9px]",
            size === 'md' && "text-xs",
            size === 'lg' && "text-sm"
          )}>
            JUICY JAY'S
          </span>
        </div>
      );
    }
    
    if (lowerBrand.includes('juicy hemp')) {
      return (
        <div className="flex flex-col items-center gap-1">
          <svg className={cn(
            "text-green-600",
            size === 'sm' && "w-6 h-6",
            size === 'md' && "w-8 h-8",
            size === 'lg' && "w-10 h-10"
          )} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L9.5 7.5 4 8l4 3.5L7 18l5-3 5 3-1-6.5 4-3.5-5.5-.5z"/>
            <circle cx="12" cy="12" r="2" opacity="0.5"/>
          </svg>
          <span className={cn(
            "font-bold text-green-600 text-center leading-none",
            size === 'sm' && "text-[9px]",
            size === 'md' && "text-xs",
            size === 'lg' && "text-sm"
          )}>
            JUICY HEMP
          </span>
        </div>
      );
    }
    
    if (lowerBrand.includes('ocb')) {
      return (
        <div className="flex flex-col items-center gap-1">
          <svg className={cn(
            "text-slate-700",
            size === 'sm' && "w-6 h-6",
            size === 'md' && "w-8 h-8",
            size === 'lg' && "w-10 h-10"
          )} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="16" height="16" rx="2"/>
            <path d="M9 12h6M12 9v6"/>
          </svg>
          <span className={cn(
            "font-bold text-slate-700 text-center leading-none",
            size === 'sm' && "text-[9px]",
            size === 'md' && "text-xs",
            size === 'lg' && "text-sm"
          )}>
            OCB
          </span>
        </div>
      );
    }
    
    if (lowerBrand.includes('bambú') || lowerBrand.includes('bambu')) {
      return (
        <div className="flex flex-col items-center gap-1">
          <svg className={cn(
            "text-emerald-700",
            size === 'sm' && "w-6 h-6",
            size === 'md' && "w-8 h-8",
            size === 'lg' && "w-10 h-10"
          )} viewBox="0 0 24 24" fill="currentColor">
            <rect x="10" y="3" width="4" height="18" rx="1"/>
            <rect x="10" y="7" width="4" height="2" opacity="0.5"/>
            <rect x="10" y="15" width="4" height="2" opacity="0.5"/>
            <path d="M8 5L10 7M16 5L14 7M8 19L10 17M16 19L14 17"/>
          </svg>
          <span className={cn(
            "font-serif text-emerald-700 text-center leading-none",
            size === 'sm' && "text-[9px]",
            size === 'md' && "text-xs",
            size === 'lg' && "text-sm"
          )}>
            BAMBÚ
          </span>
        </div>
      );
    }
    
    if (lowerBrand.includes('blaze')) {
      return (
        <div className="flex flex-col items-center gap-1">
          <svg className={cn(
            "text-orange-500",
            size === 'sm' && "w-6 h-6",
            size === 'md' && "w-8 h-8",
            size === 'lg' && "w-10 h-10"
          )} viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" opacity="0.2"/>
            <path d="M12 2C10.9 2 10 2.9 10 4v4H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
          <span className={cn(
            "font-bold text-orange-500 text-center leading-none",
            size === 'sm' && "text-[9px]",
            size === 'md' && "text-xs",
            size === 'lg' && "text-sm"
          )}>
            BLAZE
          </span>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={cn(
      "inline-flex items-center justify-center bg-card/90 backdrop-blur-sm rounded-lg border border-border/50 shadow-sm",
      size === 'sm' && "px-2 py-1.5",
      size === 'md' && "px-3 py-2",
      size === 'lg' && "px-4 py-3",
      className
    )}>
      {getBrandLogo(brand)}
    </div>
  );
};