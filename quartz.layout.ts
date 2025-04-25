import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(), // Item 1 (for Header Left)
    Component.LinksHeader(), // Item 2 (for Header Center)
    Component.Flex({ // Item 3 (for Header Right)
      components: [
        { Component: Component.Search(), grow: true }, // Search grows within this group
        { Component: Component.Darkmode() },
      ]
    })
  ],
  afterBody: [
    Component.Graph(
    {localGraph: {
      depth: 2
    }}
  ),
  Component.CookieConsent() ],
  footer: Component.Footer({
    links: {
      "Privacy Policy": "/privacy-policy"
    }
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
    Component.RecentNotes({ 
      title: "Recent Articles",
      limit: 5,
      filter: (f) => f.slug!.startsWith("Articles/"), // Adjust path if needed
    }),
    Component.RecentNotes({ 
      title: "Recent Models",
      limit: 5,
      filter: (f) => f.slug!.startsWith("Models/"), // Adjust path if needed
    }),
    Component.RecentNotes({ 
      title: "Recent Notes",
      limit: 5,
      filter: (f) => f.slug!.startsWith("Notes/"), // Adjust path if needed
    }),
  ],
  right: [
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
      title: "Recent Models", limit: 5, filter: (f) => f.slug!.startsWith("Models/")
    }),
    Component.RecentNotes({ 
      title: "Recent Notes", limit: 5, filter: (f) => f.slug!.startsWith("Notes/")
    }),
  ],
  right: [],
}
