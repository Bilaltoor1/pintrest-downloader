export default async function sitemap() {
  const baseUrl = 'https://yttmp3.com'
  const routes = [
    '',
    '/image-downloader',
    '/twitter-downloader',
    '/how-to',
    '/about-us',
    '/contact-us',
    '/supported-urls',
    '/terms',
    '/privacy-policy',
  ]
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.7,
  }))
}
