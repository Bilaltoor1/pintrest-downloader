export default async function sitemap() {
  const baseUrl = 'https://yttmp3.com'
  const routes = ['', '/about-us', '/contact-us', '/how-to', '/terms', '/privacy-policy', '/supported-urls']
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.7,
  }))
}
