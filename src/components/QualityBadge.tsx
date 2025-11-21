import React from 'react';
import { cn } from '@/lib/utils';

interface QualityBadgeProps {
  tier: '1A' | '2A' | '3A' | '4A';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const QualityBadge: React.FC<QualityBadgeProps> = ({ 
  tier, 
  size = 'md',
  className 
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base'
  };

  const tierStyles = {
    '1A': {
      gradient: 'bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800',
      border: 'border-amber-600',
      shadow: 'shadow-lg shadow-amber-900/50',
      glow: 'after:shadow-amber-600/30'
    },
    '2A': {
      gradient: 'bg-gradient-to-br from-slate-400 via-slate-300 to-slate-500',
      border: 'border-slate-400',
      shadow: 'shadow-lg shadow-slate-700/50',
      glow: 'after:shadow-slate-400/30'
    },
    '3A': {
      gradient: 'bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-600',
      border: 'border-yellow-500',
      shadow: 'shadow-lg shadow-yellow-700/50',
      glow: 'after:shadow-yellow-500/30'
    },
    '4A': {
      gradient: 'bg-gradient-to-br from-slate-100 via-white to-slate-200',
      border: 'border-slate-200',
      shadow: 'shadow-xl shadow-slate-300/60',
      glow: 'after:shadow-white/40'
    }
  };

  const style = tierStyles[tier];

  return (
    <div
      className={cn(
        'relative rounded-full flex items-center justify-center font-bold',
        'border-2 transition-all duration-300 hover:scale-110',
        'after:absolute after:inset-0 after:rounded-full after:blur-md after:-z-10',
        sizeClasses[size],
        style.gradient,
        style.border,
        style.shadow,
        style.glow,
        tier === '4A' ? 'text-slate-900' : 'text-white',
        className
      )}
    >
      <span className="font-display tracking-tight">{tier}</span>
    </div>
  );
};
