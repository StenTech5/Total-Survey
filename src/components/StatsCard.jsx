import React from "react";

export default function StatsCard({ title, value, icon }) {
  return (
    <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow">
      <div className="p-4 bg-gray-100 rounded-full">{icon}</div>
      <h2 className="mt-4 text-gray-700 font-medium text-center">{title}</h2>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
