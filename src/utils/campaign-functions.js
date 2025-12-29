export const getAllCampaign = async () => {
  const data = await (await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns`, { next: { revalidate: 3600 } })).json()
  return data
}

export const getCampaignById = async (id) => {
  const data = await (await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns/${id}`)).json()
  return data
}

export const getCampaignInsights = async () => {
  const data = await (await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns/insights`)).json()
  return data
}

export const getCampaignInsightsById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns/${id}/insights`,
    {
      next: { revalidate: 60 }
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch insights for campaign ${id}`);
  }
  return res.json();
};



