import path from 'path'
import nunjucks from 'nunjucks'
import * as sass from 'sass'
import fs from 'fs-extra'
import { EleventyHtmlBasePlugin } from '@11ty/eleventy'
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import markdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'

import matter from 'gray-matter'
import prettier from 'prettier'

const nunjucksEnv = nunjucks.configure([
  'src/styles',
  'src/assets',
  'docs/_includes/tel',
  'docs/_includes',
  'docs/assets',
  'node_modules/nhsuk-frontend/dist',
  'node_modules/nhsuk-frontend/dist/nhsuk',
  'node_modules/nhsuk-frontend/dist/nhsuk/components',
  'node_modules/nhsuk-frontend/dist/nhsuk/macros'
])

export default function (eleventyConfig) {
  eleventyConfig.on('eleventy.before', async () => {
    try {
      const sourceDirs = {
        components: 'src/components',
        styles: 'src/styles',
        assets: 'src/assets'
      }
      const targetBase = 'docs/_includes/tel'
      await fs.ensureDir(targetBase)
      for (const [name, sourceDir] of Object.entries(sourceDirs)) {
        const targetDir = `${targetBase}/${name}`
        if (await fs.pathExists(sourceDir)) {
          await fs.copy(sourceDir, targetDir)
          console.log(`✅ ${name} synced to ${targetDir}`)
        }
      }
    } catch (error) {
      console.error('❌ Error syncing components:', error)
    }
  })

  eleventyConfig.setLibrary('njk', nunjucksEnv)
  eleventyConfig.addWatchTarget('./src/')
  eleventyConfig.addWatchTarget('./docs/assets/')
  eleventyConfig.addPassthroughCopy('docs/assets/images')
  eleventyConfig.addPassthroughCopy({ 'node_modules/nhsuk-frontend/dist': 'nhsuk-frontend/dist' })
  eleventyConfig.addPassthroughCopy({ 'node_modules/nhsuk-frontend/dist/nhsuk/assets': 'assets' })
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addTemplateFormats('scss')
  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css',
    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath)
      if (parsed.name.startsWith('_')) return
      let result = sass.compileString(inputContent, {
        loadPaths: ['.', 'node_modules', 'node_modules/nhsuk-frontend/dist', 'node_modules/nhsuk-frontend/src']
      })
      return async (data) => result.css
    }
  })

  eleventyConfig.addFilter('toGitHubUrl', function (path) {
    if (path.startsWith('./')) path = path.slice(2)
    return `https://github.com/TechnologyEnhancedLearning/tel-frontend/edit/main/${path}`
  })

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin)
  eleventyConfig.addPassthroughCopy("src");

  // --- UPDATED SHORTCODE ---
  eleventyConfig.addShortcode('example', async function (examplePath) {
    const exampleFile = fs
      .readFileSync(path.join('docs/examples', examplePath), 'utf8')
      .trim()

    let { data, content } = matter(exampleFile)

    // Check if user provided an override in the Front Matter
    const nunjucksCode = data.nunjucksCode || content

    // Always show Nunjucks tab unless explicitly disabled
    let showNunjucksAuto = data.showNunjucks !== false

    const rawHtmlCode = nunjucksEnv.renderString(content)
    let prettyHtmlCode = rawHtmlCode
    try {
      prettyHtmlCode = await prettier.format(rawHtmlCode, { parser: 'html' })
    } catch (e) {
      console.warn("Prettier formatting failed for:", examplePath);
    }

    const href = `/examples/${examplePath.replace('.njk', '')}`

    const templateData = {
      examplePath,
      href,
      id: href.replace(/\//g, '-'),
      title: data.title,
      htmlCode: prettyHtmlCode,
      nunjucksCode: nunjucksCode, // This is now clean or overridden
      figmaLink: data.figmaLink,
      razorLink: data.razorLink,
      mobile: data.mobile,
      mobileHeader: data.mobileHeader,
      hub: data.hub,
      backlink: data.backlink || data.backLink || false,
      backLinkHref: data.backLinkHref,
      backLinkText: data.backLinkText,
      arguments: data.arguments,
      showNunjucks: showNunjucksAuto
    }

    return nunjucksEnv.render('example.njk', templateData)
  })

  eleventyConfig.setLibrary('md', markdownIt({ html: true }).use(anchor))

  // Check if we are running in a GitHub Action environment
  const isProduction = process.env.GITHUB_ACTIONS === 'true'

  return {
    dir: {
      input: 'docs',
      output: 'dist/docs'
    },
    // Only use the prefix if we are in production
    pathPrefix: isProduction ? '/tel-frontend/' : '/',
    markdownTemplateEngine: 'njk'
  }
}
