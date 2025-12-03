import { useState, useEffect } from 'react';

// Hook to detect current breakpoint
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'laptop' | 'desktop'>('mobile');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint('mobile');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else if (width < 1280) {
        setBreakpoint('laptop');
      } else {
        setBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}

// Hook to check if mobile
export function useIsMobile() {
  const breakpoint = useBreakpoint();
  return breakpoint === 'mobile';
}

// Hook to check if tablet
export function useIsTablet() {
  const breakpoint = useBreakpoint();
  return breakpoint === 'tablet';
}

// Hook to check if desktop (laptop or desktop)
export function useIsDesktop() {
  const breakpoint = useBreakpoint();
  return breakpoint === 'laptop' || breakpoint === 'desktop';
}

// Hook to get window dimensions
export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Utility function to get responsive value
export function getResponsiveValue<T>(
  values: {
    mobile?: T;
    tablet?: T;
    laptop?: T;
    desktop?: T;
  },
  breakpoint: 'mobile' | 'tablet' | 'laptop' | 'desktop'
): T | undefined {
  // Return exact match first
  if (values[breakpoint]) return values[breakpoint];
  
  // Fallback logic: use nearest smaller breakpoint
  const order: ('mobile' | 'tablet' | 'laptop' | 'desktop')[] = ['desktop', 'laptop', 'tablet', 'mobile'];
  const startIndex = order.indexOf(breakpoint);
  
  for (let i = startIndex; i < order.length; i++) {
    if (values[order[i]]) return values[order[i]];
  }
  
  return undefined;
}

// Component for responsive visibility
interface ShowProps {
  mobile?: boolean;
  tablet?: boolean;
  laptop?: boolean;
  desktop?: boolean;
  children: React.ReactNode;
}

export function Show({ mobile, tablet, laptop, desktop, children }: ShowProps) {
  const breakpoint = useBreakpoint();
  
  const shouldShow = 
    (breakpoint === 'mobile' && mobile) ||
    (breakpoint === 'tablet' && tablet) ||
    (breakpoint === 'laptop' && laptop) ||
    (breakpoint === 'desktop' && desktop);
  
  return shouldShow ? <>{children}</> : null;
}

// Component for hiding on specific breakpoints
interface HideProps {
  mobile?: boolean;
  tablet?: boolean;
  laptop?: boolean;
  desktop?: boolean;
  children: React.ReactNode;
}

export function Hide({ mobile, tablet, laptop, desktop, children }: HideProps) {
  const breakpoint = useBreakpoint();
  
  const shouldHide = 
    (breakpoint === 'mobile' && mobile) ||
    (breakpoint === 'tablet' && tablet) ||
    (breakpoint === 'laptop' && laptop) ||
    (breakpoint === 'desktop' && desktop);
  
  return !shouldHide ? <>{children}</> : null;
}

// Responsive spacing utilities
export const spacing = {
  mobile: {
    padding: 'p-4',
    paddingX: 'px-4',
    paddingY: 'py-4',
    gap: 'gap-3',
    margin: 'm-3',
  },
  tablet: {
    padding: 'md:p-6',
    paddingX: 'md:px-6',
    paddingY: 'md:py-6',
    gap: 'md:gap-4',
    margin: 'md:m-4',
  },
  desktop: {
    padding: 'lg:p-8',
    paddingX: 'lg:px-8',
    paddingY: 'lg:py-8',
    gap: 'lg:gap-6',
    margin: 'lg:m-6',
  },
};

// Responsive text sizes
export const textSize = {
  xs: 'text-[10px] md:text-xs lg:text-sm',
  sm: 'text-xs md:text-sm lg:text-base',
  base: 'text-sm md:text-base lg:text-lg',
  lg: 'text-base md:text-lg lg:text-xl',
  xl: 'text-lg md:text-xl lg:text-2xl',
  '2xl': 'text-xl md:text-2xl lg:text-3xl',
  '3xl': 'text-2xl md:text-3xl lg:text-4xl',
};

// Responsive icon sizes
export const iconSize = {
  sm: 'w-4 h-4 md:w-5 md:h-5',
  base: 'w-5 h-5 md:w-6 md:h-6',
  lg: 'w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8',
  xl: 'w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12',
};

// Responsive button sizes
export const buttonSize = {
  sm: 'h-9 px-3 text-xs md:h-10 md:px-4 md:text-sm',
  base: 'h-10 px-4 text-sm md:h-11 md:px-6 md:text-base',
  lg: 'h-11 px-6 text-base md:h-12 md:px-8 md:text-lg',
};

// Grid column configurations
export const gridCols = {
  auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  cards: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  actions: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  list: 'grid-cols-1 md:grid-cols-2',
  wide: 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3',
};

// Example usage component
export function ResponsiveExample() {
  const breakpoint = useBreakpoint();
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const { width, height } = useWindowSize();

  return (
    <div className="p-4">
      <h2>Responsive Utilities Demo</h2>
      <div className="space-y-4">
        {/* Current breakpoint */}
        <p>Current breakpoint: <strong>{breakpoint}</strong></p>
        <p>Screen size: {width} × {height}</p>
        <p>Is Mobile: {isMobile ? 'Yes' : 'No'}</p>
        <p>Is Desktop: {isDesktop ? 'Yes' : 'No'}</p>

        {/* Show component */}
        <Show mobile>
          <div className="bg-blue-100 p-4 rounded">
            This only shows on mobile
          </div>
        </Show>

        <Show desktop>
          <div className="bg-green-100 p-4 rounded">
            This only shows on desktop
          </div>
        </Show>

        {/* Hide component */}
        <Hide mobile>
          <div className="bg-yellow-100 p-4 rounded">
            This is hidden on mobile
          </div>
        </Hide>

        {/* Responsive text */}
        <p className={textSize.xl}>Responsive heading</p>
        <p className={textSize.sm}>Responsive body text</p>

        {/* Responsive grid */}
        <div className={`grid ${gridCols.cards} gap-4`}>
          <div className="bg-gray-200 p-4 rounded">Card 1</div>
          <div className="bg-gray-200 p-4 rounded">Card 2</div>
          <div className="bg-gray-200 p-4 rounded">Card 3</div>
          <div className="bg-gray-200 p-4 rounded">Card 4</div>
        </div>
      </div>
    </div>
  );
}
