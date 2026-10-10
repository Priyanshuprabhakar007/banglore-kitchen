import React, { useState, useEffect } from 'react';
import { Utensils } from 'lucide-react';
import { getDishImageUrl } from '../services/menuSyncService';

interface ProductImageProps {
  src?: string;
  alt?: string;
  className?: string;
  fallbackIconSize?: number;
}

export function ProductImage({
  src,
  alt = 'Food Item',
  className = 'w-full h-full object-cover',
  fallbackIconSize = 28
}: ProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let target = src?.trim();
    const fallback = getDishImageUrl(alt);

    if (!target || target === 'undefined' || target === 'null' || target === '' || target.startsWith('/images/dishes/')) {
      target = fallback || target;
    }
    setCurrentSrc(target || fallback);
    setHasError(false);
    setIsLoading(true);
  }, [src, alt]);

  const handleImageError = () => {
    const fallback = getDishImageUrl(alt);
    if (currentSrc !== fallback && fallback) {
      setCurrentSrc(fallback);
      setHasError(false);
    } else {
      setHasError(true);
    }
    setIsLoading(false);
  };

  if (hasError || !currentSrc) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 text-bangalore-primary/80 p-2 select-none w-full h-full ${className}`}>
        <Utensils size={fallbackIconSize} className="text-bangalore-primary/50 mb-0.5" />
        <span className="text-[10px] font-semibold text-bangalore-primary/70 text-center line-clamp-1 max-w-[90%]">
          {alt || 'Bangalore Kitchen'}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-amber-50/50 animate-pulse flex items-center justify-center">
          <Utensils size={fallbackIconSize} className="text-amber-300 animate-pulse" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoading(false)}
        onError={handleImageError}
      />
    </div>
  );
}
