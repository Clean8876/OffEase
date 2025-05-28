import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getBalanceById } from "../../../../api/BalanceApi";

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
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalanceById();
        const data = response?.data || response;
        setBalance(data);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  // Default leave quotas
  const CASUAL_TOTAL = 4;
  const SICK_TOTAL = 2;

  if (!balance || !balance.leaveDetails) {
    return (
      <ChartWrapper>
        <ChartTitle>Quarterly Leave Distribution</ChartTitle>
        <p>Loading leave data...</p>
      </ChartWrapper>
    );
  }

  const casualUsed = balance.leaveDetails.casual?.remainingDays || 0;
  const sickUsed = balance.leaveDetails.sick?.remainingDays || 0;

  const casualUnused = CASUAL_TOTAL - casualUsed;
  const sickUnused = SICK_TOTAL - sickUsed;

  const data = {
    labels: ["Casual - Used", "Casual - Unused", "Sick - Used", "Sick - Unused"],
    datasets: [
      {
        label: "Leave Usage",
        data: [casualUsed, casualUnused, sickUsed, sickUnused],
        backgroundColor: ["#c8e6c9", "#4caf50", "#bbdefb", "#2196f3"],
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
