import React from "react";
import StatsCard from "./StatsCard";

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 shadow hover:shadow-md transition-shadow cursor-pointer">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
