import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "DevEnsino",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "pt-BR",
    baseUrl: "arcelino-cavalcante.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#F8FAFC", // Slate 50
          lightgray: "#E2E8F0", // Slate 200
          gray: "#64748B", // Slate 500
          darkgray: "#475569", // Slate 600
          dark: "#1E293B", // Slate 800 (Text)
          secondary: "#EA580C", // Orange 600 (Strong Accent)
          tertiary: "#FB923C", // Orange 400 (Lighter Hover)
          highlight: "rgba(234, 88, 12, 0.15)", // Orange Highlight
          textHighlight: "#EA580C88",
        },
        darkMode: {
          light: "#000000", // True Black
          lightgray: "#334155", // Slate 700
          gray: "#94A3B8", // Slate 400
          darkgray: "#E2E8F0", // Slate 200
          dark: "#F8FAFC", // Slate 50
          secondary: "#EA580C", // Orange 600 (Consistent Strong Accent)
          tertiary: "#FB923C", // Orange 400 (Lighter Hover)
          highlight: "rgba(234, 88, 12, 0.15)",
          textHighlight: "#EA580C88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
      Plugin.PWA(),
    ],
  },
}

export default config
