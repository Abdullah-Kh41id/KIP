"use client";

import { useCallback, useEffect, useState } from "react";
import type { Campaign, CampaignProgress } from "@/types/campaign";
import {
  completeStage as completeStageFn,
  selectStage as selectStageFn,
} from "@/lib/progress";
import { clearProgress, loadProgress, saveProgress } from "@/lib/storage";

export function useCampaignProgress(campaign: Campaign) {
  const [progress, setProgress] = useState<CampaignProgress | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadProgress(campaign);
    setProgress(loaded);
    setHydrated(true);
  }, [campaign]);

  const persist = useCallback((next: CampaignProgress) => {
    setProgress(next);
    saveProgress(next);
  }, []);

  const completeStage = useCallback(
    (stageId: string) => {
      if (!progress) return;
      persist(completeStageFn(campaign, progress, stageId));
    },
    [campaign, persist, progress]
  );

  const selectStage = useCallback(
    (stageId: string) => {
      if (!progress) return;
      persist(selectStageFn(progress, stageId));
    },
    [persist, progress]
  );

  const restart = useCallback(() => {
    persist(clearProgress(campaign));
  }, [campaign, persist]);

  return {
    progress,
    hydrated,
    completeStage,
    selectStage,
    restart,
  };
}
