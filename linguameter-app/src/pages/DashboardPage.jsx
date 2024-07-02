import React, { useEffect, useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import pb from "../lib/pocketbase";
import Modal from "../components/Modal";
import LogCard from "../components/LogCard";
import MyResponsiveLine from "../components/charts/LineChart";
import DashboardStats from "../components/DashboardStats"

export default function DashboardPage() {
  const { user, logout } = UserAuth();
  const [userLogs, setUserLogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [graphData, setGraphData] = useState([]);

  // Get logs for the logged-in user
  const getUserLogs = async () => {
    try {
      const records = await pb.collection("logs").getFullList({
        filter: `created_by="${user.id}"`,
        sort: "-created",
        expand: "created_by",
      });
      setUserLogs(records);
      console.log("here are the initial logs:", records);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  // Function for getting a group member's logs
  const getLogs = async (userID) => {
    try {
      const records = await pb.collection("logs").getFullList({
        filter: `created_by="${userID}"`,
        sort: "-created",
        expand: "created_by",
      });
      console.log("here are the stupid records:", records);
      return records;
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
    return [];
  };

  // Show Logs for All Groups the user is in
  const getGroupLogs = async () => {
    try {
      const groups = (
        await pb.collection("group_members").getFullList({
          filter: `member="${user.id}"`,
          expand: "member",
          sort: "-created",
        })
      ).map((group) => group.group_joined);

      console.log("here are the group ids:", groups);

      let newLogs = [];

      let allMembers = [];

      for (const groupID of groups) {
        const groupMembers = (
          await pb.collection("group_members").getFullList({
            filter: `group_joined="${groupID}"`,
            expand: "group_joined",
          })
        ).map((member) => member.member);
        for (const member of groupMembers) {
          if (!allMembers.includes(member)) {
            allMembers.push(member);
          }
        }

        console.log("here are the members:", groupMembers);
      }

      for (const member of allMembers) {
        const memberLogs = await getLogs(member);
        newLogs = [...newLogs, ...memberLogs];
      }
      setUserLogs(newLogs);
      console.log("here are all members:", allMembers);
      console.log("here are the user logs", userLogs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  // Filter logs from the past seven days for week graph
  const fetchData = async () => {
    try {
      // Get dates for the past week
      const getDates = () => {
        const currentDate = new Date();
        let pastWeekDates = [];

        for (let i = 0; i < 7; i++) {
          const pastDate = new Date(currentDate);
          pastDate.setDate(currentDate.getDate() - i);
          pastWeekDates.push(pastDate.toLocaleDateString('en-CA'));
        }

        return pastWeekDates;
      };

      // Set date order for graph
      const graphDates = getDates().reverse();

      const createDateObject = (datesArray) => {
        const dateObject = {};

        datesArray.forEach((dateString) => {
          dateObject[dateString] = 0;
        });

        return dateObject;
      };

      let dateObject = createDateObject(graphDates);

      // Set query date
      const queryDate = new Date();
      queryDate.setDate(queryDate.getDate() - 6);
      const formattedQueryDate = queryDate.toLocaleDateString('en-CA');
      console.log('formattedQueryDate:', formattedQueryDate)

      const records = userLogs.filter((log) => log.date >= formattedQueryDate);

      // Sum time for each day
      records.forEach((log) => {
        const date = log.date.slice(0, 10);
        if (dateObject[date] !== undefined) {
          dateObject[date] += log.duration;
        } else {
          console.log("No matching date found in dateObject for:", date);
        }
      });

      // Convert sums to graph format
      const convertedData = Object.entries(dateObject).map(
        ([date, duration]) => ({
          x: date,
          y: duration,
        })
      );

      setGraphData(convertedData);
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  };

  useEffect(() => {
    getUserLogs();
  }, []);

  useEffect(() => {
    fetchData();
    console.log("here is the use effect data", graphData);
  }, [userLogs]);

  useEffect(() => {
    console.log("here is the use effect data", graphData);
  }, [graphData]);

  const refreshUserLogs = () => {
    getUserLogs();
  };

  return (
    // NEW NEW LAYOUT
    <div id="wrapper" className="inter-regular">
      <div id="navbar-wrapper">
        <div id="navbar">
          <div id="navbar-top" className="inter-bold">
            <img src="/temp-logo.png" alt="Temp Logo" />
            <h3>Lingmodo</h3>
          </div>
          <div id="navbar-middle">
            <ul id="navbar-options" className="inter-semi-bold">
              <li>
                <div className="navbar-option">
                  <img src="/home-green.svg" alt="Home Icon" />
                  <h3 id="selected-page">Home</h3>
                </div>
              </li>
              <li>
                <div className="navbar-option">
                  <img src="/community-gray.svg" alt="Community Icon" />
                  <h3>Community</h3>
                </div>
              </li>
              <li>
                <div className="navbar-option">
                  <img src="/progress-gray.svg" alt="Progress Icon" />
                  <h3>Progress</h3>
                </div>
              </li>
              <li>
                <div className="navbar-option">
                  <img src="/lists-gray.svg" alt="Lists Icon" />
                  <h3>Lists</h3>
                </div>
              </li>
              <li>
                <div className="navbar-option">
                  <img src="/add-log.svg" alt="Add Log Icon" />
                  <button
                    className="openModalBtn"
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    Add Entry
                  </button>
                </div>
              </li>
              <li>
                <div className="navbar-option">
                  <button
                    className=""
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </li>
            </ul>
            <div id="navbar-goal">
              <div id="navbar-goal-top">
                <h4>Daily goal</h4>
                <span>Spanish</span>
                <span>160m / 200m</span>
              </div>
              <div id="navbar-goal-bottom">
                <img src="" alt="placeholder" />
              </div>
            </div>
          </div>
          <div id="navbar-bottom" className="inter-semi-bold">
            <img src="/profile.svg" alt="User Icon" />
            <h3>Profile</h3>
            <img id="profile-arrow" src="/chevron-right.svg" alt="Arrow Icon" />
          </div>
        </div>
      </div>
      <div id="main-wrapper">
        {modalOpen && (
          <Modal
            setOpenModal={setModalOpen}
            userID={user.id}
            pb={pb}
            refreshUserLogs={refreshUserLogs}
          />
        )}

        <div id="navbar-spacer"></div>
        <div id="content-wrapper">
          <div id="content">
            <div id="top-bar-wrapper">
              <div id="top-bar"></div>
            </div>
            <div id="column-wrapper">
              <div id="columns">
                <div id="left-column-wrapper">
                  <div id="left-column">
                    <MyResponsiveLine graphData={graphData} />
                    <h3>Your Progress Today</h3>
                    <DashboardStats userLogs={userLogs} graphData={graphData}/>
                  </div>
                </div>
                <div id="right-column-wrapper">
                  <div id="right-column">
                    <div id="filter-wrapper">
                      <div id="filter">
                        <div id="filter-options-top">
                          <button>All Logs</button>
                          <button
                            onClick={() => {
                              getGroupLogs();
                            }}
                          >
                            My Groups
                          </button>
                        </div>
                        <div id="filter-options-bottom"></div>
                      </div>
                    </div>
                    <div id="logs-wrapper">
                      <LogCard userLogs={userLogs} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
