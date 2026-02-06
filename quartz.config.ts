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
        header: "Literata", // Estilo Bookerly para títulos
        body: "Literata",   // Estilo Bookerly para texto
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#E3DCD2",   // Beige (Light BG)
          lightgray: "#D4CDC3",
          gray: "#8D8D8D",
          darkgray: "#4A4A4A",
          dark: "#013328",    // Dark Green (Text)
          secondary: "#CC8B65", // Terracotta (Accent)
          tertiary: "#A97050",
          highlight: "rgba(204, 139, 101, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#100C0D",   // Deep Dark (Dark BG) - assumindo correção do hex #100COD para #100C0D
          lightgray: "#1F1B1C",
          gray: "#646464",
          darkgray: "#C0B8B0",
          dark: "#E3DCD2",    // Beige (Text)
          secondary: "#CC8B65", // Terracotta (Accent)
          tertiary: "#A97050",
          highlight: "rgba(204, 139, 101, 0.15)",
          textHighlight: "#b3aa0288",
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
