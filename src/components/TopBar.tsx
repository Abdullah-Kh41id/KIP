"use client";

import type { Campaign, CampaignProgress, CampaignStage } from "@/types/campaign";
import { getCompletionPercent } from "@/lib/progress";

interface TopBarProps {
  campaign: Campaign;
  progress: CampaignProgress;
  currentStage: CampaignStage;
  onRestart: () => void;
}

export function TopBar({
  campaign,
  progress,
  currentStage,
  onRestart,
}: TopBarProps) {
  const percent = getCompletionPercent(campaign, progress);
  const stageLabel = `Stage ${currentStage.order} of ${campaign.stages.length}`;

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-kip-border bg-kip-surface/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-[0.2em] text-kip-gold">
            KIP
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.25em] text-kip-muted sm:inline">
            Knowledge in Play
          </span>
        </div>
        <div className="hidden h-4 w-px bg-kip-border md:block" />
        <div className="min-w-0">
          <p className="truncate text-xs text-kip-muted">{campaign.title}</p>
          <p className="truncate text-sm text-kip-cream/90">
            {stageLabel}
            <span className="text-kip-muted"> · </span>
            {currentStage.title}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-3 sm:flex">
          <div className="w-32">
            <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wider text-kip-muted">
              <span>Campaign</span>
              <span className="text-kip-gold">{percent}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-kip-elevated">
              <div
                className="h-full rounded-full bg-gradient-to-r from-kip-amber to-kip-gold transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
        <span className="text-sm text-kip-gold sm:hidden">{percent}%</span>
        <button
          type="button"
          onClick={onRestart}
          className="rounded border border-kip-border px-2.5 py-1 text-[11px] uppercase tracking-wider text-kip-muted transition-colors hover:border-kip-gold/40 hover:text-kip-cream"
        >
          Restart
        </button>
      </div>
    </header>
  );
}
