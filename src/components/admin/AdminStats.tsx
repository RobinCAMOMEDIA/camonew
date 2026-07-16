"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

// Live case counts from Convex. The `adminStats` query is itself protected by
// requireAdmin() on the server, so this never returns data to non-admins.
export function AdminStats() {
  const stats = useQuery(api.cases.adminStats);

  const items = [
    { label: "Cases gesamt", value: stats?.total, accent: false },
    { label: "Veröffentlicht", value: stats?.published, accent: true },
    { label: "Entwürfe", value: stats?.drafts, accent: false },
    { label: "Featured", value: stats?.featured, accent: false },
  ];

  return (
    <div className="admin-stats">
      {items.map((it) => (
        <div className="admin-stat" key={it.label}>
          <div
            className={`admin-stat__value${it.accent ? " admin-stat__value--accent" : ""}`}
          >
            {it.value ?? "–"}
          </div>
          <div className="admin-stat__label">{it.label}</div>
        </div>
      ))}
    </div>
  );
}
