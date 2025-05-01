
// Helper for Core Web Vitals monitoring
export const vitalsMonitoring = {
  getCLS: (onReport: (metric: any) => void) => {
    if (typeof window !== 'undefined') {
      // @ts-ignore - Web Vitals may not be defined in all TypeScript environments
      import('web-vitals').then(({ getCLS }) => {
        getCLS(onReport);
      });
    }
  },
  getFID: (onReport: (metric: any) => void) => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      import('web-vitals').then(({ getFID }) => {
        getFID(onReport);
      });
    }
  },
  getLCP: (onReport: (metric: any) => void) => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      import('web-vitals').then(({ getLCP }) => {
        getLCP(onReport);
      });
    }
  }
};

// Image lazy loading detection
export const isLazyLoadSupported = () => {
  return 'loading' in HTMLImageElement.prototype;
};

// Connection speed detection for adaptive loading
export const getConnectionSpeed = (): 'slow' | 'medium' | 'fast' => {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'medium';
  }
  
  // @ts-ignore - Not all browsers support Navigator.connection
  const connection = navigator.connection;
  
  if (!connection) return 'medium';
  
  const { effectiveType, downlink, rtt, saveData } = connection;
  
  if (saveData) return 'slow';
  
  if (effectiveType === '4g' && downlink >= 1.5 && rtt <= 100) {
    return 'fast';
  } else if (effectiveType === '4g' || effectiveType === '3g' && downlink >= 0.7) {
    return 'medium';
  } else {
    return 'slow';
  }
};

// Detect if browser supports WebP
export const detectWebpSupport = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  if ('createImageBitmap' in window && 'avif' in ImageDecoder.supportedMIMETypes) {
    return true; // Modern browser that supports advanced formats
  }
  
  // Feature detection for WebP
  const webpData = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';
  
  return fetch(webpData)
    .then(response => response.blob())
    .then(blob => createImageBitmap(blob))
    .then(() => true)
    .catch(() => false);
};

// Tool to measure component render time
export const measureRenderTime = (componentName: string) => {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    console.debug(`[Performance] ${componentName} render time: ${Math.round(endTime - startTime)}ms`);
  };
};
