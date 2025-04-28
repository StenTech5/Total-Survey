import React, { useState } from "react";
import { FiBell, FiCheckCircle, FiCheckSquare, FiSearch } from "react-icons/fi";

// initial batch of notifications
export const initialNotifications = [
  {
    id: 1,
    title: "New User Registered",
    message: "John Doe just signed up.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Server Maintenance",
    message: "Maintenance tonight at 11 PM.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Report Ready",
    message: "Your April report is available.",
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    title: "New Comment",
    message: "Alice commented on your post.",
    time: "2 days ago",
    read: false,
  },
  {
    id: 5,
    title: "Password Changed",
    message: "Your password was updated.",
    time: "3 days ago",
    read: true,
  },
];

// next batch loaded on “Load More”
const moreNotifications = [
  {
    id: 6,
    title: "New Like",
    message: "Bob liked your photo.",
    time: "4 days ago",
    read: false,
  },
  {
    id: 7,
    title: "Subscription Expiring",
    message: "Your plan expires in 3 days.",
    time: "5 days ago",
    read: false,
  },
  {
    id: 8,
    title: "System Alert",
    message: "High memory usage detected.",
    time: "6 days ago",
    read: false,
  },
  {
    id: 9,
    title: "New Follower",
    message: "Charlie started following you.",
    time: "1 week ago",
    read: true,
  },
  {
    id: 10,
    title: "Backup Complete",
    message: "Database backup finished.",
    time: "1 week ago",
    read: true,
  },
];

export default function Notifications({
  notifications,
  setNotifications,
}) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // mark one or all as read
  const markAsRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  // load more items
  const handleLoadMore = () =>
    setNotifications((prev) => [...prev, ...moreNotifications]);

  // apply filter & search
  const filtered = notifications.filter((n) => {
    if (filter === "unread" && n.read) return false;
    if (filter === "read" && !n.read) return false;
    if (
      search &&
      !n.title.toLowerCase().includes(search.toLowerCase()) &&
      !n.message.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const allLoaded =
    notifications.length >=
    initialNotifications.length + moreNotifications.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Notifications
        </h2>
        <button
          onClick={markAllAsRead}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <FiCheckSquare size={20} />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-4">
        <div className="relative flex-1 max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-indigo-300"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="pl-2 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-indigo-300 cursor-pointer"
        >
          <option value="all">All</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
      </div>

      {/* List */}
      <ul className="space-y-4">
        {filtered.length === 0 && (
          <li className="text-center text-gray-500">
            No notifications found.
          </li>
        )}
        {filtered.map((n) => (
          <NotificationItem
            key={n.id}
            {...n}
            onMark={() => markAsRead(n.id)}
          />
        ))}
      </ul>

      {/* Load More */}
      {!allLoaded && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

function NotificationItem({ title, message, time, read, onMark }) {
  return (
    <li
      className={`
        flex items-start bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow
        border-l-4 ${read ? "border-gray-300" : "border-indigo-500"}
      `}
    >
      <FiBell
        className={`text-2xl mt-1 flex-shrink-0 ${
          read ? "text-gray-400" : "text-indigo-500"
        }`}
      />
      <div className="ml-4 flex-1">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-gray-600">{message}</p>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
      {!read && (
        <button
          onClick={onMark}
          className="ml-4 text-gray-400 hover:text-indigo-500 cursor-pointer transition-colors"
        >
          <FiCheckCircle size={20} />
        </button>
      )}
    </li>
  );
}
