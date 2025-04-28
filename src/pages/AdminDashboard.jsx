import React from "react";
import StatsGrid from "../components/StatsGrid";
import {
  AiOutlinePlusCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { FaQuestionCircle, FaUsers } from "react-icons/fa";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Assessments Created",
      value: 4,
      icon: (
        <AiOutlinePlusCircle className="text-3xl text-indigo-500" />
      ),
    },
    {
      title: "Active Assessments",
      value: 4,
      icon: (
        <AiOutlineCheckCircle className="text-3xl text-green-500" />
      ),
    },
    {
      title: "Inactive Assessments",
      value: 0,
      icon: (
        <AiOutlineCloseCircle className="text-3xl text-red-500" />
      ),
    },
    {
      title: "Tasks Uploaded",
      value: 9,
      icon: <BiTask className="text-3xl text-blue-500" />,
    },
    {
      title: "Questions Uploaded",
      value: 20,
      icon: (
        <FaQuestionCircle className="text-3xl text-yellow-500" />
      ),
    },
    {
      title: "Users Uploaded",
      value: 5,
      icon: <FaUsers className="text-3xl text-purple-500" />,
    },
  ];

  return <StatsGrid stats={stats} />;
}
