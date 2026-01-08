"use client";

import { useEffect, useState } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function AnalyticsPanel({ urlId }: { urlId: number }) {
  const { getUrlAnalytics } = useAnalytics();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUrlAnalytics(urlId).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [urlId]);

  if (loading) return <p>Loading analytics...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-lg font-semibold">Analytics</h2>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4">
        <Stat title="Total Clicks" value={data.totalClicks} />
        <Stat title="Top Device" value={data.insights.deviceDistribution[0]?.type || "N/A"} />
        <Stat title="Top Browser" value={data.insights.browserUsage[0]?.name || "N/A"} />
      </div>

      {/* DAILY BREAKDOWN */}
      <Section title="Daily Clicks">
        {data.breakdown.daily.map((d: any) => (
          <Row key={d.date} label={d.date} value={d.clicks} />
        ))}
      </Section>

      {/* SOURCES */}
      <Section title="Top Sources">
        {data.insights.topSources.map((s: any, i: number) => (
          <Row key={i} label={s.source} value={s.count} />
        ))}
      </Section>
    </div>
  );
}

function Stat({ title, value }: any) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
