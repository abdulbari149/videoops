/** Normalizes pathname for comparison (drops trailing slash except root). */
function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/**
 * Whether a dashboard nav link is active. `/dashboard` matches only the index route,
 * not `/dashboard/settings` or other nested paths.
 */
export function isDashboardNavItemActive(pathname: string, href: string): boolean {
  const p = normalizePath(pathname);
  const h = normalizePath(href);
  if (h === "/dashboard") {
    return p === "/dashboard";
  }
  return p === h || p.startsWith(`${h}/`);
}
