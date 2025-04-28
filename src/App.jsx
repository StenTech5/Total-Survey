import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import AdminDashboard from "./pages/AdminDashboard";
import Notifications, { initialNotifications } from "./pages/Notifications";
import Reports from "./pages/Reports";
import ReportDetail from "./pages/ReportDetail";

export default function App() {
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Notifications badge state
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Mobile-open helper
  const handleOpenSidebar = () => {
    setSidebarCollapsed(false);
    setSidebarOpen(true);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          onToggleCollapse={() =>
            setSidebarCollapsed((prev) => !prev)
          }
          notificationsCount={unreadCount}
        />

        <div className="flex-1 flex flex-col">
          <Header
            onOpenSidebar={handleOpenSidebar}
            isCollapsed={sidebarCollapsed}
          />

          <main className="flex-1 overflow-auto p-6">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route
                path="/notifications"
                element={
                  <Notifications
                    notifications={notifications}
                    setNotifications={setNotifications}
                  />
                }
              />
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/:id" element={<ReportDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
