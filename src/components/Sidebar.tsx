"use client";

import type { Campaign, CampaignProgress, CampaignStage } from "@/types/campaign";
import { getStageStatus } from "@/lib/progress";

interface SidebarProps {
  campaign: Campaign;
  progress: CampaignProgress;
  onSelectStage: (stageId: string) => void;
  onUploadClick: () => void;
}

function StatusGlyph({ status }: { status: ReturnType<typeof getStageStatus> }) {
  if (status === "completed") {
    return (
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full border border-kip-gold/50 bg-kip-gold/10 text-[11px] font-medium text-kip-gold"
        aria-hidden
      >
        ✓
      </span>
    );
  }
  if (status === "locked") {
    return (
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full border border-kip-border text-kip-muted"
        aria-hidden
      >
        <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
          <path d="M8.5 5H8V3.5A3 3 0 0 0 2 3.5V5h-.5A1.5 1.5 0 0 0 0 6.5v4A1.5 1.5 0 0 0 1.5 12h7A1.5 1.5 0 0 0 10 10.5v-4A1.5 1.5 0 0 0 8.5 5zM3.2 3.5a1.8 1.8 0 1 1 3.6 0V5H3.2V3.5z" />
        </svg>
      </span>
    );
  }
  if (status === "current") {
    return (
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full border border-kip-amber bg-kip-amber/15 shadow-[0_0_12px_rgba(212,165,116,0.25)]"
        aria-hidden
      >
        <span className="h-2 w-2 rounded-full bg-kip-amber" />
      </span>
    );
  }
  return (
    <span
      className="flex h-6 w-6 items-center justify-center rounded-full border border-kip-border/80"
      aria-hidden
    >
      <span className="h-2 w-2 rounded-full border border-kip-muted" />
    </span>
  );
}

export function Sidebar({
  campaign,
  progress,
  onSelectStage,
  onUploadClick,
}: SidebarProps) {
  const stages = [...campaign.stages].sort((a, b) => a.order - b.order);

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-kip-border bg-kip-surface/60 md:h-full md:w-72 md:border-b-0 md:border-r lg:w-80">
      <div className="border-b border-kip-border px-5 py-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-kip-muted">
          Campaign map
        </p>
        <h2 className="mt-1 font-display text-lg leading-snug text-kip-cream">
          {campaign.title}
        </h2>
        <p className="mt-1 text-xs text-kip-muted">{campaign.tagline}</p>
      </div>

      <nav
        className="flex-1 overflow-x-auto overflow-y-hidden px-3 py-3 md:overflow-y-auto md:overflow-x-hidden"
        aria-label="Campaign stages"
      >
        <ol className="flex gap-2 md:flex-col md:gap-1">
          {stages.map((stage: CampaignStage, i) => {
            const status = getStageStatus(campaign, stage, progress);
            const locked = status === "locked";
            const isActive = progress.currentStageId === stage.id;

            return (
              <li key={stage.id} className="relative min-w-[11rem] md:min-w-0">
                {i < stages.length - 1 && (
                  <span
                    className="absolute left-[1.15rem] top-8 hidden h-[calc(100%-0.5rem)] w-px bg-kip-border md:block"
                    aria-hidden
                  />
                )}
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => onSelectStage(stage.id)}
                  className={[
                    "group flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-left transition-colors",
                    locked
                      ? "cursor-not-allowed opacity-45"
                      : "hover:bg-kip-elevated/80",
                    isActive && !locked
                      ? "bg-kip-elevated ring-1 ring-kip-gold/25"
                      : "",
                  ].join(" ")}
                >
                  <StatusGlyph status={status} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] uppercase tracking-wider text-kip-muted">
                      Stage {stage.order}
                    </span>
                    <span
                      className={[
                        "mt-0.5 block text-sm leading-snug",
                        isActive ? "text-kip-gold" : "text-kip-cream/90",
                      ].join(" ")}
                    >
                      {stage.title}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="border-t border-kip-border p-4">
        <button
          type="button"
          onClick={onUploadClick}
          className="w-full rounded-lg border border-dashed border-kip-border px-3 py-3 text-left transition-colors hover:border-kip-gold/40 hover:bg-kip-elevated/50"
        >
          <span className="block text-xs text-kip-cream">
            Upload your own book
          </span>
          <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-kip-muted">
            Coming soon
          </span>
        </button>
      </div>
    </aside>
  );
}
