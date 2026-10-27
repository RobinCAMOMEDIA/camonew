"use client";

import { useContactOverlay } from "@/components/contact/ContactOverlay";

// Big orange call-to-action that opens the global "Catch us" contact overlay.
export function CatchUsButton() {
  const { open } = useContactOverlay();
  return (
    <button type="button" className="x-pill" onClick={open}>
      <span className="x-pill__fill" aria-hidden="true" />
      <span className="x-pill__label">Catch us</span>
    </button>
  );
}
