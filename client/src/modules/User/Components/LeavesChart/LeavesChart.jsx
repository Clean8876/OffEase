import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { getBalanceById } from "../../../../api/BalanceApi";

// Custom hook
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

const OrderStatusContainer = styled.div`
  padding: 10px;
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  width: 90%;
  margin: 40px 20px 10px 20px;
  height: 400px;

  @media (max-width: 1360px) {
    margin: 20px 10px 10px 10px;
    height: 250px;
  }

  @media (max-width: 480px) {
    margin: 0;
    height: 300px;
    width: 100%;
    box-shadow: none;
  }

  .recharts-default-legend {
    display: flex !important;
    justify-content: center !important;
    gap: 10px !important;

    @media (max-width: 540px) {
      gap: 0 40px  !important;
      flex-wrap: wrap !important;
      // justify-content: space-between !important;
    }
  }

  .recharts-legend-item-text {
    font-weight: 500;
    font-size: 20px;
    color: #444 !important;

    @media (max-width: 1360px) {
      font-size: 12px;
    }
  }
`;

const Title = styled.h2`
  font-size: 20px;
  margin-top: 5px;
  text-align: center;
  color: #333;

  @media (max-width: 1360px) {
    font-size: 14px;
    margin: 0px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin: 10px;
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;

  @media (max-width: 1360px) {
    height: 200px;
  }

  @media (max-width: 480px) {
    height: 190px;
  }
`;

const LeavesChart = () => {
  const width = useWindowWidth();
  const [data, setData] = useState([]);

  const CASUAL_TOTAL = 4;
  const SICK_TOTAL = 2;

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalanceById();
        const balance = response?.data || response;

        const casualUsed = balance.leaveDetails.casual?.remainingDays || 0;
        const sickUsed = balance.leaveDetails.sick?.remainingDays || 0;

        const casualUnused = CASUAL_TOTAL - casualUsed;
        const sickUnused = SICK_TOTAL - sickUsed;

        const chartData = [
          { name: "Casual - Used", value: casualUsed },
          { name: "Casual - Unused", value: casualUnused },
          { name: "Sick - Used", value: sickUsed },
          { name: "Sick - Unused", value: sickUnused }
        ];

        setData(chartData);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  const COLORS = ["#c8e6c9", "#4caf50", "#bbdefb", "#2196f3"];

  const getRadius = () => {
    if (width <= 480) {
      return { innerRadius: "50%", outerRadius: "75%", cy: "40%" };
    } else if (width <= 1360) {
      return { innerRadius: "40%", outerRadius: "65%", cy: "45%" };
    } else {
      return { innerRadius: "50%", outerRadius: "75%", cy: "50%" };
    }
  };

  const { innerRadius, outerRadius, cy } = getRadius();

  return (
    <OrderStatusContainer>
      <Title>Leave Usage</Title>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ width: "100%", textAlign: "center" }} />
            <Legend verticalAlign="bottom" height={10} />
          </PieChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </OrderStatusContainer>
  );
};

export default LeavesChart;
