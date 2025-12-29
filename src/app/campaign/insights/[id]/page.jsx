"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { useEffect, useState } from 'react';

export default function CampaignInsightById({ params }) {
  const [insights, setInSights] = useState({})
  const [id, setId] = useState("")

  const getCampaignInsightsById = async () => {
    const { id } = await params
    setId(id)

    const res = await (await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns/${id}/insights`,
      { cache: "no-store" }
    )).json();
    if (res.error) {
      throw new Error("Something went wrong!")
    }
    setInSights(res.insights)
    return res.insights
  };

  useEffect(() => {
    getCampaignInsightsById()
    const interval = setInterval(getCampaignInsightsById, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [id])


  const performanceData = [
    { name: "Impressions", value: insights.impressions },
    { name: "Clicks", value: insights.clicks },
    { name: "Conversions", value: insights.conversions }
  ];

  const costData = [
    { name: "CTR (%)", value: insights.ctr },
    { name: "CPC (₹)", value: insights.cpc },
    { name: "Conv Rate (%)", value: insights.conversion_rate }
  ];

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold">Campaign Performance</h1>

      <div className="flex items-center justify-center mt-10 gap-10 w-full">
        <div>
          <h2 className="font-semibold mb-2">Volume Metrics</h2>
          <ResponsiveContainer width={400} height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#234a9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Cost & Rates</h2>
          <ResponsiveContainer width={400} height={300}>
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#867a9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
