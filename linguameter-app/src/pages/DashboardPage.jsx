import React, { useEffect, useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import LogCard from "../components/LogCard";
// import LogSubmissionForm from "../components/LogSubmissionForm";
import pb from "../lib/pocketbase";

export default function DashboardPage() {
  const { user, logout } = UserAuth();
  const [userLogs, setUserLogs] = useState([]);

  console.log(user.id);

  const getUserLogs = async () => {
    try {
      const records = await pb.collection("logs").getFullList({
        filter: `created_by="${user.id}"`,
        sort: "-created",
        expand: "created_by",
      });
      setUserLogs(records);
      console.log(records);
    } catch (error) {
      console.error("Errors fetching logs:", error);
    }
  };

  useEffect(() => {
    getUserLogs();
    console.log("yuh");
  }, []);

  return (
    // <div className="h-screen flex items-center justify-center flex-col bg-gray-bg">
    //   <h1>{`Welcome, ${user.name}`}</h1>
    //   <LogCard />
    //   {userLogs.map((log) => {
    //     return (
    //       <div key={log.id} className="card w-96 shadow-xl bg-green-500">
    //         <div className="card-body">
    //           <div className="flex flex-row justify-around">
    //             <h2 className="card-title">@{log.expand.created_by.username}</h2>
    //             <span>{log.date.slice(0, 10)}</span>
    //           </div>
    //           <div className="card w-full bg-white">
    //             <div className="card-body">
    //               <h2 className="card-title">{log.activity}</h2>
    //               <span>{log.duration}</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   })}
    //   <button className="btn" onClick={logout}>
    //     Sign Out
    //   </button>
    //   <LogSubmissionForm />
    // </div>
    <div className="body-container h-lvh bg-gray-bg">
      <div className="navbar-container h-lvh w-[16rem] top-0 left-0 bg-white fixed flex flex-col items-center">
        <div className="navbar-top-container">
          <img src="#" alt="Linguameter Logo" />
          <h3>Linguameter</h3>
        </div>
        <div className="nav-options-container flex flex-col items-center">
          <ul>
            <li>Home</li>
            <li>Community</li>
            <li>Progress</li>
            <li>Lists</li>
            <li>Add Log</li>
          </ul>
        </div>
        <div className="daily-goal-container">
          <div className="daily-goal-top">
            <h3>Daily goal</h3>
            <span>Language</span>
            <span>160m / 200m</span>
          </div>
          <div className="daily-goal-bottom">
            <span>Graph</span>
          </div>
        </div>
        <div className="navbar-bottom-container">
          <span>Profile</span>
        </div>
      </div>
      <div className="column-container flex flex-wrap flex-1">
        <div className="navbar-padding w-[16rem]">
          <span>Navbar padding</span>
        </div>
        <div className="column-1-2-container flex flex-wrap flex-1 space-x-8 mx-8 h-lvh">
          <div className="column-1-container bg-white flex-1 rounded-[1rem]">
            <div className="stats-container flex items-center flex-col">
              <span>column 1</span>
              <LogCard />
            </div>
          </div>
          <div className="column-2-container bg-white flex-1 rounded-[1rem]">
            <div className="posts-container flex items-center flex-col">
              <span>column 2</span>
              {userLogs.map((log) => {
                return (
                  <div
                    key={log.id}
                    className="card w-96 shadow-xl bg-green-primary mb-6"
                  >
                    <div className="card-body">
                      <div className="flex flex-row justify-around items-center">
                        <div className="flex flex-row">
                          <div className="w-[2.688rem] h-[2.688rem] rounded-full">
                            <img
                              className="rounded-full"
                              src={`http://127.0.0.1:8090/api/files/users/${log.expand.created_by.id}/${log.expand.created_by.avatar}`}
                              alt="Profile Picture"
                            />
                          </div>
                          <h2 className="card-title">
                            @{log.expand.created_by.username}
                          </h2>
                        </div>
                        <span>{log.date.slice(0, 10)}</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
