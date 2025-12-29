import { getAllCampaign, getCampaignInsights } from "../utils/campaign-functions";
import CampaignInsights from "./CampaignInsights";
import Campaign from "./campaigns/page";

export default async function Home() {
  let campaigns = [];
  const { insights } = await getCampaignInsights()

  try {
    const response = await getAllCampaign();
    campaigns = response?.campaigns || [];
  } catch (error) {
    console.error("Failed to fetch campaigns:", error);
  }

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center ">
      <p className="text-4xl font-bold mt-10 text-blue-900">MIXO ADS CAMPAIGNS</p>
      <Campaign campaigns={campaigns} />
      <CampaignInsights insights={insights} />
    </div>
  );
}
