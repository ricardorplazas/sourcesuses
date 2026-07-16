import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.DesktopOnly(Component.PageTitle()),
    Component.DesktopOnly(Component.LinksHeader()),
    Component.DesktopOnly(
      Component.Flex({
        components: [
          { Component: Component.Search(), grow: true },
          { Component: Component.Darkmode() },
        ],
      }),
    ),
  ],
  afterBody: [Component.ConversionCTA()],
  footer: Component.Footer({
    links: {
      Privacy: "/privacy-policy",
      Terms: "/terms",
      About: "/about",
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
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.TagList(),
    Component.ConditionalRender({
      component: Component.ValidationHero(),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.DecisionDiagnostic(),
      condition: (page) => page.fileData.slug === "diagnostic/index",
    }),
    Component.ConditionalRender({
      component: Component.CaseRoomPrototype(),
      condition: (page) => page.fileData.slug === "prototypes/case-room",
    }),
    Component.ConditionalRender({
      component: Component.AddinPrototype(),
      condition: (page) => page.fileData.slug === "prototypes/excel-addin",
    }),
    Component.ConditionalRender({
      component: Component.InterestForm(),
      condition: (page) => page.fileData.slug === "interest",
    }),
  ],
  left: [
    Component.MobileOnly(Component.PageTitle()),
    Component.MobileOnly(Component.Spacer()),
    Component.MobileOnly(
      Component.Flex({
        components: [
          {
            Component: Component.Search(),
            grow: true,
          },
          { Component: Component.Darkmode() },
        ],
      }),
    ),
    Component.MobileOnly(Component.Explorer()),
    Component.MobileOnly(Component.LinksHeader()),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Study Notes",
        limit: 5,
        filter: (f) => f.slug!.startsWith("Notes/"),
      }),
    ),
  ],
  right: [Component.DesktopOnly(Component.TableOfContents())],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.ConditionalRender({
      component: Component.DecisionDiagnostic(),
      condition: (page) => page.fileData.slug === "diagnostic/index",
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.MobileOnly(Component.LinksHeader()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Study Notes",
        limit: 5,
        filter: (f) => f.slug!.startsWith("Notes/"),
      }),
    ),
  ],
  right: [],
}
