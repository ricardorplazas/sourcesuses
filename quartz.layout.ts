import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.LinksHeader()],
  afterBody: [Component.Graph() ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
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
    Component.MobileOnly(Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true, // Optional: allows search bar to take up available space
        },
        { Component: Component.Darkmode() },
      ],
    }),),
    Component.RecentNotes({ 
      title: "Recent Articles",
      limit: 5,
      filter: (f) => f.slug!.startsWith("Articles/"), // Adjust path if needed
    }),
    Component.RecentNotes({ 
      title: "Recent Notes",
      limit: 5,
      filter: (f) => f.slug!.startsWith("Notes/"), // Adjust path if needed
    }),
    Component.RecentNotes({ 
      title: "Recent Models",
      limit: 5,
      filter: (f) => f.slug!.startsWith("Models/"), // Adjust path if needed
    }),
  ],
  right: [
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true, // Optional: allows search bar to take up available space
        },
        { Component: Component.Darkmode() },
      ],
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
      ],
    }),
    Component.RecentNotes({ 
      title: "Recent Articles", limit: 5, filter: (f) => f.slug!.startsWith("Articles/")
    }),
    Component.RecentNotes({ 
      title: "Recent Notes", limit: 5, filter: (f) => f.slug!.startsWith("Notes/")
    }),
    Component.RecentNotes({ 
      title: "Recent Models", limit: 5, filter: (f) => f.slug!.startsWith("Models/")
    }),
  ],
  right: [],
}
