// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from "@nivo/line";
// import pb from "../../lib/pocketbase";
// import { UserAuth } from "../../contexts/AuthContext";
// import React, { useEffect, useState } from "react";
import React from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({graphData}) => {
  // const { user } = UserAuth();
  // const [data, setData] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const sevenDaysAgo = new Date();
  //     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  //     const dates = sevenDaysAgo.toISOString().slice(0, 10) + " 12:00:00.000Z";
  //     console.log("here is 7 days ago:", dates);

  //     const records = await pb.collection("logs").getFullList({
  //       filter: `created_by="${user.id}"`,
  //       expand: "created_by",
  //     });
  //     console.log("here is the graph data:", records);
  //     setData(records);
  //   } catch (error) {
  //     console.error("Error fetching graph data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  console.log("loading graph");
  return (
    <ResponsiveLine
      colors={() => "#0090FF"}
      areaOpacity={0.2}
      data={[
        {
          id: "ThisWeek",
          // color: "#61cdbb",
          data: graphData,
        },
      ]}
      // data={data}
      margin={{ top: 10, right: 30, bottom: 50, left: 50 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Date",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Minutes",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={true}
      enableTouchCrosshair={true}
      useMesh={true}
    />
  );
};

export default MyResponsiveLine;
