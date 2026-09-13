import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://timewitness.ai';
  const now = new Date();

  const routes = [
    '',
    '/explore',
    '/search',
    '/how-it-works',
    '/about',
    '/privacy',
    '/terms',
    '/auth/signin',
    '/auth/signup',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
