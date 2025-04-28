import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// sample static data
const sampleReports = [
  { id: 1, name: "User Engagement",    createdAt: "2025-04-01", totalViews: 1200, completionRate: 75 },
  { id: 2, name: "Sales Performance",  createdAt: "2025-04-03", totalViews: 950,  completionRate: 60 },
  { id: 3, name: "Survey Results",     createdAt: "2025-04-05", totalViews: 600,  completionRate: 85 },
  { id: 4, name: "Task Completion",    createdAt: "2025-04-07", totalViews: 780,  completionRate: 50 },
  { id: 5, name: "Daily Active Users", createdAt: "2025-04-09", totalViews: 1500, completionRate:90 },
  { id: 6, name: "Monthly Revenue",    createdAt: "2025-04-11", totalViews: 400,  completionRate:40 },
];

export default function Reports() {
  const [filterText, setFilterText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  const displayed = useMemo(() => {
    let data = sampleReports.filter(r =>
      r.name.toLowerCase().includes(filterText.toLowerCase())
    );
    data.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [filterText, sortConfig]);

  const requestSort = key => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Reports</h2>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Views by Report</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={displayed} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalViews" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filter */}
      <input
        type="text"
        placeholder="Filter by name..."
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
        className="pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-indigo-300 w-full sm:w-1/3"
      />

      {/* Mobile card view */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {displayed.map(r => (
          <NavLink
            key={r.id}
            to={`/reports/${r.id}`}
            className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h4 className="font-semibold text-gray-800 truncate">{r.name}</h4>
            <p className="text-sm text-gray-600">Created: {r.createdAt}</p>
            <p className="text-sm text-gray-600">Views: {r.totalViews}</p>
            <p className="text-sm text-gray-600">Completion: {r.completionRate}%</p>
          </NavLink>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => requestSort("name")}
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Report Name
              </th>
              <th
                onClick={() => requestSort("createdAt")}
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Created At
              </th>
              <th
                onClick={() => requestSort("totalViews")}
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Views
              </th>
              <th
                onClick={() => requestSort("completionRate")}
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Completion %
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayed.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-indigo-600 hover:underline truncate">
                  <NavLink to={`/reports/${r.id}`}>{r.name}</NavLink>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{r.createdAt}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{r.totalViews}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{r.completionRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
