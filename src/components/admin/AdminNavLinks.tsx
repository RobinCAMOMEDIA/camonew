"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

// Inline icons (currentColor → tinted orange via CSS when active/hover).
const DashboardIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const HeroIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M10 9.2v5.6l4.5-2.8L10 9.2z" fill="currentColor" />
  </svg>
);

const CasesIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 6V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M3 11h18" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const AnalyticsIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <line x1="5" y1="20" x2="5" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="12" y1="20" x2="12" y2="5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="19" y1="20" x2="19" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const InquiriesIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LINKS = [
  { href: "/admin", label: "Dashboard", exact: true, icon: DashboardIcon },
  { href: "/admin/hero", label: "Hero", exact: false, icon: HeroIcon },
  { href: "/admin/cases", label: "Cases", exact: false, icon: CasesIcon },
  { href: "/admin/anfragen", label: "Anfragen", exact: false, icon: InquiriesIcon },
  { href: "/admin/analytics", label: "Analytics", exact: false, icon: AnalyticsIcon },
];

export function AdminNavLinks() {
  const pathname = usePathname();
  const unread = useQuery(api.contact.unreadCount);
  return (
    <>
      {LINKS.map((l) => {
        const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
        const showBadge = l.href === "/admin/anfragen" && !!unread && unread > 0;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`admin-sidebar__link admin-sidebar__nav-link${active ? " is-active" : ""}`}
          >
            <span className="admin-sidebar__nav-icon">{l.icon}</span>
            {l.label}
            {showBadge && <span className="admin-sidebar__count">{unread}</span>}
          </Link>
        );
      })}
    </>
  );
}
