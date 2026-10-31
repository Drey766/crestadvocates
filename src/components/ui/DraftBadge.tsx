import { cn } from "@/lib/utils";

const showDraftFlags = process.env.NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true";

/**
 * Marks content the firm has not yet confirmed. Renders only on preview builds
 * (NEXT_PUBLIC_SHOW_DRAFT_FLAGS=true) and only for draft items.
 */
export function DraftBadge({
  status = "draft",
  className,
}: {
  status?: "confirmed" | "draft";
  className?: string;
}) {
  if (!showDraftFlags || status !== "draft") return null;
  return <span className={cn("badge-draft", className)}>Draft — confirm with client</span>;
}
