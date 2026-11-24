import { CampaignShell } from "@/components/CampaignShell";
import { getCampaign } from "@/data/campaigns";

export default function HomePage() {
  const campaign = getCampaign();

  return <CampaignShell campaign={campaign} />;
}
