"use client";

import { useMemo, useState } from "react";
import type { Campaign } from "@/types/campaign";
import { useCampaignProgress } from "@/hooks/useCampaignProgress";
import {
  getNextStage,
  getStageById,
  getStageStatus,
  isStageUnlocked,
} from "@/lib/progress";
import { Sidebar } from "./Sidebar";
import { StageContent } from "./StageContent";
import { TopBar } from "./TopBar";

interface CampaignShellProps {
  campaign: Campaign;
}

export function CampaignShell({ campaign }: CampaignShellProps) {
  const { progress, hydrated, completeStage, selectStage, restart } =
    useCampaignProgress(campaign);
  const [toast, setToast] = useState<string | null>(null);

  const currentStage = useMemo(() => {
    if (!progress) return campaign.stages[0];
    return (
      getStageById(campaign, progress.currentStageId) ?? campaign.stages[0]
    );
  }, [campaign, progress]);

  const handleSelectStage = (stageId: string) => {
    if (!progress) return;
    const stage = getStageById(campaign, stageId);
    if (!stage) return;
    if (!isStageUnlocked(campaign, stage, progress)) return;
    selectStage(stageId);
  };

  const handleRestart = () => {
    const confirmed = window.confirm(
      "Restart this campaign? Your progress will be cleared."
    );
    if (confirmed) {
      restart();
      setToast("Campaign restarted.");
      window.setTimeout(() => setToast(null), 2500);
    }
  };

  const handleUploadClick = () => {
    setToast("Upload your own book — coming soon.");
    window.setTimeout(() => setToast(null), 2800);
  };

  if (!hydrated || !progress) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-kip-void text-kip-muted">
        <p className="text-sm tracking-wider">Loading campaign…</p>
      </div>
    );
  }

  const alreadyCompleted = progress.completedStageIds.includes(
    currentStage.id
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-kip-void text-kip-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% -10%, rgba(201,162,39,0.08), transparent 55%), radial-gradient(ellipse 60% 40% at 90% 20%, rgba(212,165,116,0.05), transparent 50%), linear-gradient(180deg, #070707 0%, #0a0a0a 40%, #050505 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <TopBar
          campaign={campaign}
          progress={progress}
          currentStage={currentStage}
          onRestart={handleRestart}
        />

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <Sidebar
            campaign={campaign}
            progress={progress}
            onSelectStage={handleSelectStage}
            onUploadClick={handleUploadClick}
          />

          <main className="min-h-0 flex-1 overflow-y-auto">
            <StageContent
              key={currentStage.id}
              stage={currentStage}
              alreadyCompleted={alreadyCompleted}
              isFinalStage={!getNextStage(campaign, currentStage.id)}
              onComplete={() => {
                if (getStageStatus(campaign, currentStage, progress) === "locked") {
                  return;
                }
                completeStage(currentStage.id);
              }}
              onContinue={() => {
                const next = getNextStage(campaign, currentStage.id);
                if (next) selectStage(next.id);
              }}
            />
          </main>
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-kip-border bg-kip-surface px-4 py-2 text-sm text-kip-cream shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
