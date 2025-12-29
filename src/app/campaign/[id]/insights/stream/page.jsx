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
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const CampaignStream = () => {
  const { id } = useParams();
  const [inSights, setInSights] = useState(null);

  useEffect(() => {
    if (!id) return;

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns/${id}/insights/stream`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setInSights(data);
    };

    eventSource.onerror = (error) => {
      console.error("SSE error", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [id]);

  if (!inSights) {
    return <p className="p-6">Waiting for live data…</p>;
  }

  const performanceData = [
    { name: "Impressions", value: inSights.impressions },
    { name: "Clicks", value: inSights.clicks },
    { name: "Conversions", value: inSights.conversions }
  ];

  const costData = [
    { name: "CTR (%)", value: inSights.ctr },
    { name: "CPC (₹)", value: inSights.cpc },
    { name: "Conv Rate (%)", value: inSights.conversion_rate }
  ];

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold">Campaign Stream</h1>

      <div className="flex items-center justify-center mt-10 gap-10 w-full">
        <div>
          <h2 className="font-semibold mb-2">Volume Metrics</h2>
          <ResponsiveContainer width={400} height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#faa232" />
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
              <Bar dataKey="value" fill="#99a2f8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CampaignStream;
