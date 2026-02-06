import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Meu Blog",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "pt-BR",
    baseUrl: "quartz.jzhao.xyz",
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
          secondary: "#0F172A", // Slate 900 (Accent - Dark Gray/Black)
          tertiary: "#334155", // Slate 700 (Hover/Graph)
          highlight: "rgba(15, 23, 42, 0.15)", // Gray Highlight
          textHighlight: "#0F172A88",
        },
        darkMode: {
          light: "#000000", // True Black
          lightgray: "#334155", // Slate 700 (Visible Borders)
          gray: "#94A3B8", // Slate 400 (Muted)
          darkgray: "#E2E8F0", // Slate 200 (Body)
          dark: "#F8FAFC", // Slate 50 (Headings)
          secondary: "#E2E8F0", // Slate 200 (Almost White Gradient)
          tertiary: "#CBD5E1", // Slate 300 (Hover)
          highlight: "rgba(226, 232, 240, 0.15)",
          textHighlight: "#E2E8F088",
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
    ],
  },
}

export default config
