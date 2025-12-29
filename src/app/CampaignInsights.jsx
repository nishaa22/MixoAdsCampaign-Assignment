"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function CampaignInsights({ insights }) {
  const statusData = [
    { name: "Active", value: insights?.active_campaigns },
    { name: "Paused", value: insights?.paused_campaigns },
    { name: "Completed", value: insights?.completed_campaigns }
  ];

  const metricsData = [
    { name: "Impressions", value: insights?.total_impressions },
    { name: "Clicks", value: insights?.total_clicks },
    { name: "Conversions", value: insights?.total_conversions },
    { name: "Spend (₹)", value: insights?.total_spend }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Campaign Insights</h1>
      <div className="flex flex-wrap gap-8">
        <div>
          <h2 className="font-semibold mb-2">Campaign Status</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Campaign Metrics</h2>
          <BarChart width={500} height={300} data={metricsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
