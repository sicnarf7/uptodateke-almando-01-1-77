
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface PreloadResource {
  href: string;
  as: string;
  type?: string;
  crossOrigin?: string;
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  preloadResources?: PreloadResource[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'UpTodateKE - Kenya\'s Pulse, Your Playground',
  description = 'Stay updated with the latest news, entertainment, and trends from Kenya. UpTodateKE is your trusted source for everything happening in Kenya.',
  canonicalUrl,
  ogImage = '/og-image.png',
  noIndex = false,
  preloadResources = [],
}) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : undefined;
  
  // Default critical resources to preload
  const defaultPreloadResources: PreloadResource[] = [
    { href: '/index.css', as: 'style' },
    { href: '/favicon.ico', as: 'image', type: 'image/x-icon' }
  ];

  const allPreloadResources = [...defaultPreloadResources, ...preloadResources];
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Performance optimizations */}
      <meta httpEquiv="Cache-Control" content="public, max-age=86400, s-maxage=31536000" />
      <meta httpEquiv="Expires" content={new Date(Date.now() + 86400000).toUTCString()} />
      <meta name="theme-color" content="#ffffff" />
      
      {/* Preconnect to important domains */}
      <link rel="preconnect" href={siteUrl} />
      <link rel="dns-prefetch" href={siteUrl} />
      
      {/* Preload critical resources */}
      {allPreloadResources.map((resource, index) => (
        <link 
          key={index} 
          rel="preload" 
          href={resource.href} 
          as={resource.as} 
          type={resource.type} 
          crossOrigin={resource.crossOrigin}
        />
      ))}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />
      
      {/* Canonical URL */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      
      {/* No index if specified */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};
