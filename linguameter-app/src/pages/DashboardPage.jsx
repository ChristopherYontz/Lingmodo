import React, { useEffect, useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import LogCard from "../components/LogCard";
import LogSubmissionForm from "../components/LogSubmissionForm";
import pb from "../lib/pocketbase";

export default function DashboardPage() {
  const { user, logout } = UserAuth();
  const [userLogs, setUserLogs] = useState([]);

  console.log(user.id);

  const getUserLogs = async () => {
    try {
      const records = await pb
        .collection("logs")
        .getFullList({
          filter: `created_by="${user.id}"`,
          sort: "-created",
        });
      setUserLogs(records);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    getUserLogs();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1>{`Welcome, ${user.name}`}</h1>
      {/* <LogCard /> */}
      {userLogs.map((log) => {
        return (
          <div key={log.id} className="card w-96 shadow-xl bg-green-500">
            <div className="card-body">
              <div className="flex flex-row justify-around">
                <h2 className="card-title">@{log.activity}</h2>
                <span>{log.date}</span>
              </div>
              <div className="card w-full bg-white">
                <div className="card-body">
                  <h2 className="card-title">{log.activity}</h2>
                  <span>{log.duration}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <button className="btn" onClick={logout}>
        Sign Out
      </button>
      <LogSubmissionForm />
    </div>
  );
}
