/**
 * Redirects configuration (auto-loaded by Eleventy because it is in docs/_data)
 * Each object needs a leading and trailing slash on `from` so the generated
 * permalink produces /path/index.html
 */
export default [
  {
    from: '/example/page/',
    to: 'https://service-manual.nhs.uk/design-system//example/page'
  }
  // Add more redirects here as needed
]
