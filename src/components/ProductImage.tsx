import React, { useState, useEffect } from 'react';
import { Utensils } from 'lucide-react';
import { getDishImageUrl, getApprovedAiImageUrl } from '../services/menuSyncService';

interface ProductImageProps {
  id?: string;
  src?: string;
  alt?: string;
  className?: string;
  fallbackIconSize?: number;
}

export function ProductImage({
  id,
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

    // 1. Priority: Approved AI Menu image for this exact dish ID or name
    const approvedAi = getApprovedAiImageUrl(id, alt);
    if (approvedAi) {
      setCurrentSrc(approvedAi);
      setHasError(false);
      setIsLoading(true);
      return;
    }

    // 2. Custom admin uploaded image (local uploads or Firebase Storage)
    const isCustomUpload = target && (
      target.startsWith('/uploads/') ||
      target.startsWith('data:image/') ||
      target.includes('firebasestorage.googleapis.com')
    );
    if (isCustomUpload) {
      setCurrentSrc(target);
      setHasError(false);
      setIsLoading(true);
      return;
    }

    // Disregard external generic Unsplash URLs entirely for customer-facing rendering
    if (target && target.includes('images.unsplash.com')) {
      target = '';
    }

    // 3. Fallback to verified local dish image if authentic
    const verifiedLocal = getDishImageUrl(alt);
    if (verifiedLocal) {
      setCurrentSrc(verifiedLocal);
      setHasError(false);
      setIsLoading(true);
      return;
    }

    // 4. Neutral branded placeholder
    setCurrentSrc('');
    setHasError(true);
    setIsLoading(false);
  }, [id, src, alt]);

  const handleImageError = () => {
    const verifiedLocal = getDishImageUrl(alt);
    if (currentSrc !== verifiedLocal && verifiedLocal) {
      setCurrentSrc(verifiedLocal);
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
