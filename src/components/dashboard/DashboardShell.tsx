"use client";

import { DASHBOARD_NAV } from "@/config/dashboard-nav";
import { useDashboardSidebarCollapsed } from "@/hooks/use-dashboard-sidebar-collapsed";
import { useMediaQuery } from "@/hooks/use-media-query";
import { isDashboardNavItemActive } from "@/lib/dashboard-nav-active";
import { signOutFromApp } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, PanelLeft, PanelLeftClose, X } from "lucide-react";
import { useEffect, useState } from "react";

type NavListProps = {
  collapsed: boolean;
  onNavigate?: () => void;
};

function DashboardNavList({ collapsed, onNavigate }: NavListProps) {
  const pathname = usePathname() ?? "";

  return (
    <nav className="flex flex-col gap-1 p-3" aria-label="Dashboard">
      {DASHBOARD_NAV.map(({ href, label, icon: Icon }) => {
        const active = isDashboardNavItemActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            title={collapsed ? label : undefined}
            aria-label={collapsed ? label : undefined}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors",
              collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5",
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-5 shrink-0" aria-hidden />
            {!collapsed ? <span>{label}</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}

type SidebarLogoutProps = {
  collapsed: boolean;
};

function SidebarLogout({ collapsed }: SidebarLogoutProps) {
  return (
    <div className={cn("shrink-0 border-t border-border", collapsed ? "p-2" : "p-3")}>
      <form action={signOutFromApp}>
        <Button
          type="submit"
          variant="outline"
          className={cn(
            "w-full gap-2",
            collapsed ? "size-9 p-0" : "justify-start"
          )}
          aria-label="Log out"
          title={collapsed ? "Log out" : undefined}
        >
          <LogOut className="size-5 shrink-0" aria-hidden />
          {!collapsed ? <span>Log out</span> : null}
        </Button>
      </form>
    </div>
  );
}

function useDashboardHeaderTitle(): string {
  const pathname = usePathname() ?? "";
  if (pathname.startsWith("/dashboard/settings")) {
    return "Settings";
  }
  return "Dashboard";
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, toggleSidebarCollapsed] = useDashboardSidebarCollapsed();
  const headerTitle = useDashboardHeaderTitle();

  const drawerOpen = isMobile && mobileOpen;

  useEffect(() => {
    if (!drawerOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden shrink-0 flex-col border-border bg-card md:flex md:flex-col",
          "border-b md:border-b-0 md:border-r",
          "md:min-h-screen",
          "transition-[width] duration-200 ease-out",
          sidebarCollapsed ? "w-[4.5rem]" : "w-56"
        )}
      >
        <div
          className={cn(
            "flex h-14 shrink-0 items-center border-b border-border px-3",
            sidebarCollapsed ? "justify-center" : "justify-end"
          )}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={toggleSidebarCollapsed}
          >
            {sidebarCollapsed ? (
              <PanelLeft className="size-5" aria-hidden />
            ) : (
              <PanelLeftClose className="size-5" aria-hidden />
            )}
          </Button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <DashboardNavList collapsed={sidebarCollapsed} />
          </div>
          <SidebarLogout collapsed={sidebarCollapsed} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3 md:hidden">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {drawerOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </Button>
            <span className="truncate font-semibold text-foreground">{headerTitle}</span>
          </div>
          <span className="hidden font-semibold text-foreground md:block">{headerTitle}</span>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>

      {/* Mobile overlay + drawer */}
      {drawerOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="fixed inset-y-0 left-0 z-50 flex h-full max-h-[100dvh] w-[min(18rem,100vw-2rem)] flex-col border-r border-border bg-card shadow-lg md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-3">
              <span className="text-sm font-semibold text-foreground">Menu</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-5" aria-hidden />
              </Button>
            </div>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="min-h-0 flex-1 overflow-y-auto">
                <DashboardNavList collapsed={false} onNavigate={() => setMobileOpen(false)} />
              </div>
              <SidebarLogout collapsed={false} />
            </div>
          </aside>
        </>
      ) : null}
    </div>
  );
}
