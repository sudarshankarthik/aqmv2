import React, { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Paper } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

const Chart = ({ data }) => {
  const preparedData = [];

  data.forEach((row) => {
    preparedData.push({
      ...row,
      timestamp: row.timestamp.seconds,
    });
  });

  console.log(preparedData);
  const [displayData, setDisplayData] = useState("air_quality");

  const buttons = [
    <Button key="one" onClick={() => setDisplayData("temperature")}>
      Temperature
    </Button>,
    <Button key="two" onClick={() => setDisplayData("humidity")}>
      Humidity
    </Button>,
    <Button key="three" onClick={() => setDisplayData("air_quality")}>
      Air Quality
    </Button>,
  ];

  function secondsToDateTimeString(sec) {
    const dateObj = new Date(sec * 1000); // Convert seconds to milliseconds
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");

    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const seconds = dateObj.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }



  return (
    <>
      <Paper>
        <Box>
          <Box
            width={"100vw"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ButtonGroup size="large" aria-label="Large button group">
              {buttons}
            </ButtonGroup>
          </Box>

          <LineChart
            xAxis={[
              {
                dataKey: "timestamp",
                valueFormatter: (value) => secondsToDateTimeString(value),
                min: preparedData[preparedData.length -1].timestamp,
                max: preparedData[0].timestamp,
              },
            ]}
            series={[
              {
                dataKey: displayData,
                label: "humidity",
              },
            ]}
            dataset={preparedData}
            height={500}
          />
        </Box>
      </Paper>
    </>
  );
};

export default Chart;
