import React, { useEffect, useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import pb from "../lib/pocketbase";
import Modal from "../components/Modal";
import MyResponsiveLine from "../components/charts/LineChart";

export default function DashboardPage() {
  const { user, logout } = UserAuth();
  const [userLogs, setUserLogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // console.log(user.id);

  const getUserLogs = async () => {
    try {
      const records = await pb.collection("logs").getFullList({
        filter: `created_by="${user.id}"`,
        sort: "-date",
        expand: "created_by",
      });
      setUserLogs(records);
      console.log("here are the initial logs:", records);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const getLogs = async (userID) => {
    try {
      const records = await pb.collection("logs").getFullList({
        filter: `created_by="${userID}"`,
        sort: "-created",
        expand: "created_by",
      });
      console.log('here are the stupid records:', records);
      return records;
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
    return [];
  };

  // const getGroupLogs = async () => {
  //   try {
  //     const groups = (await pb.collection("group_members").getFullList({
  //       filter: `member="${user.id}"`,
  //       expand: 'member',
  //       sort: "-created",
  //     })).map(group => group.group_joined)

  //     // const group_IDs = groups.map(group => group.group_joined)
  //     console.log('here are the group IDs:', groups)

  //     const group_members = (await pb.collection("group_members").getFullList({
  //       filter: groups.map(id => `group_joined="${id}"`).join('||'),
  //       expand: 'group_joined',
  //     })).map(member => member.member)
  //     console.log(group_members)

  //     group_members.forEach(member => {
  //       const memberLogs = getLogs(member)
  //       console.log(memberLogs)
  //       // setUserLogs(prevLogs => [...prevLogs, memberLogs])
  //     })

  //     // console.log(userLogs)
  //   } catch (error) {
  //     console.error("Error fetching logs:", error)
  //   }
  // }

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


  useEffect(() => {
    getUserLogs();
  }, []);

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
                    {/* <div className="test-space"></div> */}
                    <MyResponsiveLine />
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
                      <div id="logs">
                        {/* <div className="test-space"></div> */}
                        {userLogs.length > 0 ? (
                          userLogs.map((log) => {
                            return (
                              <div key={log.id} className="card-tile">
                                <div className="card-tile-head bg-primary-color-1">
                                  <div className="profile">
                                    <img
                                      className="rounded-full"
                                      src={`http://127.0.0.1:8090/api/files/users/${log.expand.created_by.id}/${log.expand.created_by.avatar}`}
                                      alt="Profile Picture"
                                    />
                                  </div>
                                  <div>
                                    <h4 className="text-utility-color-1 text-top inter-medium">
                                      @{log.expand.created_by.username}
                                    </h4>
                                  </div>
                                  <div className="spacer"></div>
                                  <div className="text-utility-color-1">
                                    {log.date.slice(0, 10)}
                                  </div>
                                </div>

                                <div className="card-tile-body bg-white">
                                  <h2 className="card-title text-utility-color-2 inter-bold mb-1">
                                    {log.activity}
                                  </h2>
                                  <div className="grid grid-cols-3 justify-bewteen text-utility-color-3 font-semibold">
                                    <div className="flex flex-row gap-x-1 justify-start">
                                      <img className="w-5" src="/clock.svg" />
                                      <span>{log.duration} minutes</span>
                                    </div>
                                    <div className="flex flex-row gap-x-1 justify-center">
                                      <img
                                        className="w-5"
                                        src="/volume-1.svg"
                                      />
                                      <span>{log.activity_type}</span>
                                    </div>
                                    <div className="flex flex-row gap-x-1 justify-end">
                                      <img className="w-5" src="/clock.svg" />
                                      <span>{log.language}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <h1>No logs found.</h1>
                        )}
                      </div>
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
