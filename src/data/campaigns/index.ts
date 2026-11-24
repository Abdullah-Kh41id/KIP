import type { Campaign } from "@/types/campaign";
import { navalCampaign } from "./naval";

/** Registry of available campaigns — extend here as new books are added. */
export const campaigns: Record<string, Campaign> = {
  [navalCampaign.id]: navalCampaign,
};

export const DEFAULT_CAMPAIGN_ID = navalCampaign.id;

export function getCampaign(id: string = DEFAULT_CAMPAIGN_ID): Campaign {
  const campaign = campaigns[id];
  if (!campaign) {
    throw new Error(`Campaign not found: ${id}`);
  }
  return campaign;
}

export { navalCampaign };
