import { type RouteConfig, route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

// Resource routes (sitemap.xml, feed.xml) are declared explicitly with
// bracket-free filenames; everything else is file-based via flatRoutes.
export default (async () => {
  const fileRoutes = await flatRoutes();
  return [
    route("sitemap.xml", "seo/sitemap.tsx"),
    route("feed.xml", "seo/feed.tsx"),
    ...fileRoutes,
  ];
})() satisfies RouteConfig;
