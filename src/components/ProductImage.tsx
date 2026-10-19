import React, { useState, useMemo } from 'react';
import { Utensils } from 'lucide-react';
import { getDishResolvedUrl } from '../services/menuSyncService';

interface ProductImageProps {
  id?: string;
  src?: string;
  alt?: string;
  className?: string;
  fallbackIconSize?: number;
  priority?: boolean;
}

export const ProductImage = React.memo(function ProductImage({
  id,
  src,
  alt = 'Food Item',
  className = 'w-full h-full object-cover',
  fallbackIconSize = 28,
  priority = false,
}: ProductImageProps) {
  // Synchronous resolution on initial render: 0 delay, eliminates the useEffect cascade & re-render
  const resolved = useMemo(() => getDishResolvedUrl(id, alt, src), [id, alt, src]);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const initialUrl = !hasError && resolved.url ? resolved.url : null;

  if (hasError || !initialUrl) {
    return (
      <div 
        role="img"
        aria-label={alt || 'The Bangalore Kitchen Dish'}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-amber-50/90 via-orange-50/70 to-amber-100/60 border border-amber-200/50 text-amber-900 select-none w-full h-full p-2 text-center ${className}`}
      >
        <div className="w-8 h-8 rounded-full bg-amber-100/80 flex items-center justify-center mb-1 text-amber-700 shadow-xs">
          <Utensils size={fallbackIconSize > 20 ? 18 : fallbackIconSize} />
        </div>
        <span className="text-[11px] font-semibold text-amber-950/80 line-clamp-1 max-w-[95%]">
          {alt || 'Bangalore Kitchen'}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-amber-700/60 font-medium mt-0.5">
          Authentic Recipe
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-100 animate-pulse flex items-center justify-center">
          <Utensils size={fallbackIconSize} className="text-amber-300 animate-pulse" />
        </div>
      )}
      <img
        src={initialUrl}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
});
