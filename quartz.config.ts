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
          light: "#F8FAFC", // Slate 50 (Off-white)
          lightgray: "#E2E8F0", // Slate 200 (Borders)
          gray: "#64748B", // Slate 500 (Muted)
          darkgray: "#475569", // Slate 600 (Body)
          dark: "#1E293B", // Slate 800 (Headings/Text)
          secondary: "#6366F1", // Indigo 500 (Primary Accent)
          tertiary: "#818CF8", // Indigo 400 (Hover/Graph)
          highlight: "rgba(99, 102, 241, 0.15)", // Indigo Highlight
          textHighlight: "#6366F188",
        },
        darkMode: {
          light: "#0F172A", // Slate 900 (Deep Dark)
          lightgray: "#1E293B", // Slate 800 (Borders)
          gray: "#94A3B8", // Slate 400 (Muted)
          darkgray: "#E2E8F0", // Slate 200 (Body)
          dark: "#F8FAFC", // Slate 50 (Headings)
          secondary: "#818CF8", // Indigo 400 (Accent)
          tertiary: "#6366F1", // Indigo 500 (Hover)
          highlight: "rgba(99, 102, 241, 0.15)",
          textHighlight: "#818CF888",
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
