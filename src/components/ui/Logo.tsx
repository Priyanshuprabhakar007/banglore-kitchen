import React from 'react';
import { cn } from '../../lib/utils';

export const OFFICIAL_LOGO_PATH = '/images/branding/bangalore-kitchen-logo.png';
export const OFFICIAL_SYMBOL_PATH = '/images/branding/bangalore-kitchen-symbol.png';

/**
 * Check if a provided logo URL is the legacy Basant logo or invalid.
 */
export function isLegacyLogo(url?: string | null): boolean {
  if (!url) return true;
  // Check for legacy base64 data URL or mentions of basant
  if (url.includes('basant')) return true;
  if (url.startsWith('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOE')) return true;
  if (url.startsWith('data:image') && url.length < 15000) return true; // Legacy circular thumbnail
  return false;
}

/**
 * Resolves the active logo source, ensuring the new official Bangalore Kitchen
 * branding is preserved and never unexpectedly overwritten by legacy values.
 */
export function getCleanLogoUrl(candidateUrl?: string | null): string {
  if (!candidateUrl || isLegacyLogo(candidateUrl)) {
    return OFFICIAL_LOGO_PATH;
  }
  return candidateUrl;
}

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * - 'dark-bg': transparent logo displayed directly (for dark headers, footers, dark hero, admin sidebar)
   * - 'light-bg': logo framed within a subtle dark-glass pill surface so white lettering is 100% visible on light backgrounds
   * - 'icon-only': extracts and renders only the golden bottle and glass symbol
   * - 'raw': plain transparent logo without container styling
   */
  variant?: 'dark-bg' | 'light-bg' | 'icon-only' | 'raw';
  /**
   * Optional custom logo URL (will fallback to official logo if legacy/empty)
   */
  logoUrl?: string | null;
  /**
   * Optional wrapper container className (for positioning or extra padding)
   */
  containerClassName?: string;
  /**
   * Display width in pixels (or string with units)
   */
  width?: number | string;
  /**
   * Alt text
   */
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'raw',
  logoUrl,
  containerClassName,
  className,
  width,
  alt = 'The Bangalore Kitchen',
  style,
  ...props
}) => {
  const cleanUrl = getCleanLogoUrl(logoUrl);

  if (variant === 'icon-only') {
    return (
      <div className={cn("inline-flex items-center justify-center shrink-0", containerClassName)}>
        <img
          src={OFFICIAL_SYMBOL_PATH}
          alt={alt}
          width={width || 36}
          style={style}
          className={cn("object-contain shrink-0 select-none", className)}
          loading="eager"
          decoding="async"
          {...props}
        />
      </div>
    );
  }

  if (variant === 'light-bg') {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-[#1c221e]/90 hover:bg-[#1c221e] border border-white/10 shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-all duration-200 px-3 py-1.5 backdrop-blur-md shrink-0",
          containerClassName
        )}
      >
        <img
          src={cleanUrl}
          alt={alt}
          width={width || 170}
          style={style}
          className={cn("h-auto object-contain shrink-0 select-none", className)}
          loading="eager"
          decoding="async"
          {...props}
        />
      </div>
    );
  }

  if (variant === 'dark-bg') {
    return (
      <div className={cn("inline-flex items-center justify-center shrink-0", containerClassName)}>
        <img
          src={cleanUrl}
          alt={alt}
          width={width || 175}
          style={style}
          className={cn("h-auto object-contain shrink-0 select-none", className)}
          loading="eager"
          decoding="async"
          {...props}
        />
      </div>
    );
  }

  // Default 'raw' variant
  return (
    <img
      src={cleanUrl}
      alt={alt}
      width={width || 175}
      style={style}
      className={cn("h-auto object-contain shrink-0 select-none", className)}
      loading="eager"
      decoding="async"
      {...props}
    />
  );
};
