import type {
  Campaign,
  CampaignProgress,
  CampaignStage,
  StageStatus,
} from "@/types/campaign";

export const PROGRESS_STORAGE_KEY = "kip:campaign-progress";

export function createInitialProgress(campaign: Campaign): CampaignProgress {
  const firstStage = campaign.stages[0];
  return {
    campaignId: campaign.id,
    completedStageIds: [],
    currentStageId: firstStage.id,
    updatedAt: new Date().toISOString(),
  };
}

export function getStageById(
  campaign: Campaign,
  stageId: string
): CampaignStage | undefined {
  return campaign.stages.find((s) => s.id === stageId);
}

export function getStageStatus(
  campaign: Campaign,
  stage: CampaignStage,
  progress: CampaignProgress
): StageStatus {
  if (progress.completedStageIds.includes(stage.id)) {
    return "completed";
  }

  const sorted = [...campaign.stages].sort((a, b) => a.order - b.order);
  const index = sorted.findIndex((s) => s.id === stage.id);

  if (index === 0) {
    return progress.currentStageId === stage.id ? "current" : "available";
  }

  const previous = sorted[index - 1];
  const unlocked = progress.completedStageIds.includes(previous.id);

  if (!unlocked) {
    return "locked";
  }

  if (progress.currentStageId === stage.id) {
    return "current";
  }

  return "available";
}

export function isStageUnlocked(
  campaign: Campaign,
  stage: CampaignStage,
  progress: CampaignProgress
): boolean {
  return getStageStatus(campaign, stage, progress) !== "locked";
}

export function getCompletionPercent(
  campaign: Campaign,
  progress: CampaignProgress
): number {
  if (campaign.stages.length === 0) return 0;
  return Math.round(
    (progress.completedStageIds.length / campaign.stages.length) * 100
  );
}

export function getNextStage(
  campaign: Campaign,
  stageId: string
): CampaignStage | undefined {
  const sorted = [...campaign.stages].sort((a, b) => a.order - b.order);
  const index = sorted.findIndex((s) => s.id === stageId);
  if (index < 0) return undefined;
  return sorted[index + 1];
}

export function completeStage(
  campaign: Campaign,
  progress: CampaignProgress,
  stageId: string
): CampaignProgress {
  const stage = getStageById(campaign, stageId);
  if (!stage) return progress;

  const completed = new Set(progress.completedStageIds);
  completed.add(stageId);

  return {
    ...progress,
    completedStageIds: Array.from(completed),
    currentStageId: stageId,
    updatedAt: new Date().toISOString(),
  };
}

export function selectStage(
  progress: CampaignProgress,
  stageId: string
): CampaignProgress {
  return {
    ...progress,
    currentStageId: stageId,
    updatedAt: new Date().toISOString(),
  };
}
