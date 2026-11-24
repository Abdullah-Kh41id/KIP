export type InteractionType = "multiple_choice" | "short_answer";

export interface StageInteraction {
  type: InteractionType;
  prompt: string;
  /** For multiple_choice: options the player can pick */
  options?: string[];
  /** Index of the correct option, or accepted keywords for short answers */
  correctOptionIndex?: number;
  acceptedKeywords?: string[];
  /** Hint shown after a wrong attempt */
  hint?: string;
  /** Success copy after they pass */
  successMessage: string;
}

export interface CampaignStage {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  /** Short passages in Naval’s voice — adapted / faithful excerpts */
  passages: string[];
  keyIdea: string;
  interaction: StageInteraction;
}

export interface Campaign {
  id: string;
  title: string;
  author: string;
  tagline: string;
  description: string;
  stages: CampaignStage[];
}

export interface CampaignProgress {
  campaignId: string;
  /** Stage IDs the player has completed */
  completedStageIds: string[];
  /** Currently selected / focused stage id */
  currentStageId: string;
  /** ISO timestamp of last update */
  updatedAt: string;
}

export type StageStatus = "locked" | "available" | "completed" | "current";
