import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiDownload, FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Detailed time-series data for each report
const detailsData = {
  1: [
    { date: "2025-04-01", value: 200 },
    { date: "2025-04-02", value: 400 },
    { date: "2025-04-03", value: 600 },
    { date: "2025-04-04", value: 800 },
    { date: "2025-04-05", value: 1200 },
  ],
  2: [
    { date: "2025-04-01", value: 150 },
    { date: "2025-04-02", value: 300 },
    { date: "2025-04-03", value: 450 },
    { date: "2025-04-04", value: 600 },
    { date: "2025-04-05", value: 950 },
  ],
  3: [
    { date: "2025-04-01", value: 100 },
    { date: "2025-04-02", value: 200 },
    { date: "2025-04-03", value: 300 },
    { date: "2025-04-04", value: 400 },
    { date: "2025-04-05", value: 600 },
  ],
  // ...add for other report IDs
};

export default function ReportDetail() {
  const { id } = useParams();
  const reportIds = useMemo(() => Object.keys(detailsData).map(Number).sort((a,b)=>a-b), []);
  const currentIndex = reportIds.indexOf(Number(id));
  const prevId = currentIndex > 0 ? reportIds[currentIndex - 1] : null;
  const nextId = currentIndex < reportIds.length - 1 ? reportIds[currentIndex + 1] : null;

  const rawData = detailsData[id] || [];

  // derive date range for filter inputs
  const dates = rawData.map(d => new Date(d.date));
  const minDate = dates.length ? new Date(Math.min(...dates)) : new Date();
  const maxDate = dates.length ? new Date(Math.max(...dates)) : new Date();

  const [startDate, setStartDate] = useState(minDate.toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(maxDate.toISOString().slice(0, 10));

  // filter data by selected date range
  const data = useMemo(
    () =>
      rawData.filter(d => {
        const date = new Date(d.date);
        return date >= new Date(startDate) && date <= new Date(endDate);
      }),
    [rawData, startDate, endDate]
  );

  // summary metrics
  const { total, average, count, max, min } = useMemo(() => {
    const count = data.length;
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const average = count ? (total / count).toFixed(1) : 0;
    const values = data.map(d => d.value);
    const max = values.length ? Math.max(...values) : 0;
    const min = values.length ? Math.min(...values) : 0;
    return { total, average, count, max, min };
  }, [data]);

  // export CSV
  const exportCSV = () => {
    const header = "date,value\n";
    const rows = data.map(d => `${d.date},${d.value}`).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `report_${id}_data.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // print for PDF
  const exportPDF = () => window.print();

  return (
    <div className="space-y-6">
      {/* Navigation between reports */}
      <div className="flex justify-between items-center">
        {prevId ? (
          <Link to={`/reports/${prevId}`} className="flex items-center text-indigo-600 hover:underline">
            <FiChevronLeft /> <span className="ml-1">Report {prevId}</span>
          </Link>
        ) : <div />}
        {nextId ? (
          <Link to={`/reports/${nextId}`} className="flex items-center text-indigo-600 hover:underline">
            <span className="mr-1">Report {nextId}</span> <FiChevronRight />
          </Link>
        ) : <div />}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800">
        Report Detail — ID {id}
      </h2>

      {/* Controls: Date range & exports */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <FiCalendar className="text-gray-500" />
          <input
            type="date"
            value={startDate}
            max={endDate}
            onChange={e => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-indigo-300"
          />
          <span>to</span>
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={e => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-indigo-300"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={exportCSV}
            className="flex items-center space-x-1 bg-white hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <FiDownload />
            <span>Export CSV</span>
          </button>
          <button
            onClick={exportPDF}
            className="flex items-center space-x-1 bg-white hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <FiDownload />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow flex flex-col">
          <span className="text-sm font-medium text-gray-500">Total Views</span>
          <span className="mt-2 text-3xl font-bold text-indigo-600">{total}</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex flex-col">
          <span className="text-sm font-medium text-gray-500">Average per Day</span>
          <span className="mt-2 text-3xl font-bold text-green-600">{average}</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex flex-col">
          <span className="text-sm font-medium text-gray-500">Data Points</span>
          <span className="mt-2 text-3xl font-bold text-blue-600">{count}</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex flex-col">
          <span className="text-sm font-medium text-gray-500">Range (Min–Max)</span>
          <span className="mt-2 text-3xl font-bold text-purple-600">{min}–{max}</span>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Trend Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table of Data Points */}
      <div className="bg-white p-4 rounded-lg shadow overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((d) => (
              <tr key={d.date} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{d.date}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
