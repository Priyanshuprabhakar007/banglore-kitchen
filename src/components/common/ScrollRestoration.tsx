import { useLayoutEffect, useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Central ScrollRestoration component for React Router.
 * 
 * Core responsibilities:
 * 1. Genuine new-page navigation (e.g. Home -> Menu -> Offers -> Notifications -> Reserve Table)
 *    immediately resets the scroll position to top (top: 0) before the browser paints, avoiding
 *    any visual flicker or landing at the previous page's scroll offset (e.g. viewing the footer).
 * 2. Browser Back/Forward navigation (navigationType === 'POP') restores the user's previous scroll position.
 * 3. In-page anchor / hash navigation (e.g. #reviews, #chef-story) scrolls to the target element.
 * 4. Filter or query parameter changes on the same route (e.g. /menu?category=dosa -> /menu?category=biryani)
 *    do not force a scroll reset.
 */
export function ScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();

  const prevPathnameRef = useRef<string>(location.pathname);
  const prevSearchRef = useRef<string>(location.search);
  const scrollPositionsRef = useRef<Map<string, number>>(new Map());

  // Configure manual browser scroll restoration to prevent native competing jumps
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Record user's scroll position per history key continuously
  useEffect(() => {
    const handleScroll = () => {
      scrollPositionsRef.current.set(location.key, window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.key]);

  // Synchronous layout effect: runs after DOM mutations but BEFORE the browser paints the frame
  useLayoutEffect(() => {
    // Case 1: In-page hash link (e.g. #chef-story or anchor targets)
    if (location.hash) {
      const elementId = location.hash.replace(/^#/, '');
      const targetElement = document.getElementById(elementId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      // If element is not rendered yet, allow a quick microtask check
      const timer = setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timer);
    }

    // Case 2: Browser Back/Forward navigation (POP)
    if (navigationType === 'POP') {
      const savedPosition = scrollPositionsRef.current.get(location.key);
      if (typeof savedPosition === 'number') {
        window.scrollTo({
          top: savedPosition,
          left: 0,
          behavior: 'instant' as ScrollBehavior,
        });
        document.documentElement.scrollTop = savedPosition;
        document.body.scrollTop = savedPosition;

        // If the document height hasn't settled yet, verify after frame
        const raf = requestAnimationFrame(() => {
          if (Math.abs(window.scrollY - savedPosition) > 10) {
            window.scrollTo({
              top: savedPosition,
              left: 0,
              behavior: 'instant' as ScrollBehavior,
            });
          }
        });
        return () => cancelAnimationFrame(raf);
      }
    }

    const isNewPathname = location.pathname !== prevPathnameRef.current;
    const isSearchChangeOnly = !isNewPathname && location.search !== prevSearchRef.current;
    prevPathnameRef.current = location.pathname;
    prevSearchRef.current = location.search;

    // Case 3: Same pathname navigation where only query / filters changed (e.g. /menu?category=dosa)
    if (isSearchChangeOnly) {
      return;
    }

    // Case 4: Genuine new-page navigation (PUSH or new pathname) or re-clicking current page
    // Instantly reset scroll to top before user can see the previous scroll offset
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname, location.search, location.hash, location.key, navigationType]);

  return null;
}
