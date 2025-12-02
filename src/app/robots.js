export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/.next', '/api/internal'],
    },
    sitemap: 'https://mtg-ranker.com/sitemap.xml',
  }
}
