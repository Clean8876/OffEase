// LeaveDoughnutChart.jsx
import React from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Styled Components
const ChartWrapper = styled.div`
  width: 350px;
  height: 400px;
  margin: 2rem;
  padding: 2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const ChartTitle = styled.h3`
  color: #333;
  margin-bottom: 1.5rem;
`;

const LeaveDoughnutChart = () => {
  // Input: actual usage
  const leaveData = {
    casual: { used: 1 }, // default total is 4
    sick: { used: 1},   // default total is 2
  };

  // Calculate remaining leaves
  const casualUnused = 4 - leaveData.casual.used;
  const sickUnused = 2 - leaveData.sick.used;

  const data = {
    labels: ["Casual - Used", "Casual - Unused", "Sick - Used", "Sick - Unused"],
    datasets: [
      {
        label: "Leave Usage",
        data: [leaveData.casual.used, casualUnused, leaveData.sick.used, sickUnused],
        backgroundColor: ["#c8e6c9", "#4caf50", "#bbdefb", "#2196f3"],
        // backgroundColor: ["#4caf50", "#c8e6c9", "#2196f3", "#bbdefb"],
        borderWidth: 5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#555",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <ChartWrapper>
      <ChartTitle>Quarterly Leave Distribution</ChartTitle>
      <Doughnut data={data} options={options} />
    </ChartWrapper>
  );
};

export default LeaveDoughnutChart;
