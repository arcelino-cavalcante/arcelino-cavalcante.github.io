import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [Component.CookieConsent()],
  footer: Component.Footer({
    links: {
      "Instagram": "#",
      "WhatsApp": "#",
      "Contato": "/Contato",
      "Política de Privacidade": "/Politica-de-Privacidade",
      "Termos de Uso": "/Termos-de-Uso",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      title: "Categorias",
      filterFn: (node) => {
        const emptyCategories = ["AI", "Materials", "Documentation", "Cursos", "Documentações", "Inteligência Artificial", "Loja", "Materiais e Arquivos"]
        return node.displayName !== "tags" && !emptyCategories.includes(node.displayName)
      },
      sortFn: (a, b) => {
        return a.slugSegment.localeCompare(b.slugSegment, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      },
      mapFn: (node) => {
        node.displayName = node.displayName.replace(/^\d+[-_.\s]+/, "")
      },
      order: ["filter", "sort", "map"],
    }),
  ],
  right: [
    Component.Graph({
      localGraph: {
        drag: true,
        zoom: true,
        depth: 1,
        scale: 1.1,
        repelForce: 0.8,
        centerForce: 0.3,
        linkDistance: 40,
        fontSize: 0.6,
        opacityScale: 1,
        enableRadial: true,
      },
      globalGraph: {
        drag: true,
        zoom: true,
        depth: -1,
        scale: 0.9,
        repelForce: 0.6,
        centerForce: 0.3,
        linkDistance: 35,
        fontSize: 0.6,
        opacityScale: 1,
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      title: "Categorias",
      filterFn: (node) => {
        const emptyCategories = ["AI", "Materials", "Documentation", "Cursos", "Documentações", "Inteligência Artificial", "Loja", "Materiais e Arquivos"]
        return node.displayName !== "tags" && !emptyCategories.includes(node.displayName)
      },
      useSavedState: true,
      sortFn: (a, b) => {
        return a.slugSegment.localeCompare(b.slugSegment, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      },
      mapFn: (node) => {
        node.displayName = node.displayName.replace(/^\d+[-_.\s]+/, "")
      },
      order: ["filter", "sort", "map"],
    }),
  ],
  right: [],
}
