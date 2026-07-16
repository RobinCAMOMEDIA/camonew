"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

// One-click import of the original 8 demo cases. No-ops if cases already exist
// (the seed mutation guards against duplicates). Handy for first-run setup.
export function SeedButton() {
  const seed = useMutation(api.seed.seedCases);
  const [state, setState] = useState<"idle" | "running" | "done" | "error">(
    "idle",
  );
  const [msg, setMsg] = useState("");

  async function run() {
    setState("running");
    setMsg("");
    try {
      const result = (await seed({})) as { inserted?: number } | undefined;
      setState("done");
      setMsg(
        result?.inserted
          ? `${result.inserted} Cases importiert.`
          : "Bereits vorhanden.",
      );
    } catch (e) {
      setState("error");
      setMsg(e instanceof Error ? e.message : "Fehler beim Import.");
    }
  }

  return (
    <button
      className="admin-btn"
      onClick={run}
      disabled={state === "running"}
      title={msg || "Original-Demo-Cases importieren"}
    >
      {state === "running"
        ? "Importiere…"
        : state === "done"
          ? "Importiert ✓"
          : "Demo-Cases importieren"}
    </button>
  );
}
