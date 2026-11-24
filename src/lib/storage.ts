import type { Campaign, CampaignProgress } from "@/types/campaign";
import { createInitialProgress, PROGRESS_STORAGE_KEY } from "./progress";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function loadProgress(campaign: Campaign): CampaignProgress {
  if (!isBrowser()) {
    return createInitialProgress(campaign);
  }

  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) {
      return createInitialProgress(campaign);
    }

    const parsed = JSON.parse(raw) as CampaignProgress;

    if (parsed.campaignId !== campaign.id) {
      return createInitialProgress(campaign);
    }

    const stageIds = new Set(campaign.stages.map((s) => s.id));
    const completedStageIds = parsed.completedStageIds.filter((id) =>
      stageIds.has(id)
    );
    const currentStageId = stageIds.has(parsed.currentStageId)
      ? parsed.currentStageId
      : campaign.stages[0].id;

    return {
      campaignId: campaign.id,
      completedStageIds,
      currentStageId,
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return createInitialProgress(campaign);
  }
}

export function saveProgress(progress: CampaignProgress): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export function clearProgress(campaign: Campaign): CampaignProgress {
  const fresh = createInitialProgress(campaign);
  saveProgress(fresh);
  return fresh;
}
