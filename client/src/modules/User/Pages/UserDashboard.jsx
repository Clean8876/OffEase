import React from "react";
import {
  DashboardContainer,
  CardContainer,
  StatCard,
  IconWrapper,
  StatContent,
  StatValue,
  StatLabel,
  GraphContainer
} from "./UserDashboard.styles";
import { FaDollarSign, FaMoneyBillAlt, FaCube, FaShoppingCart } from "react-icons/fa";
import BarGraph from "../Components/BarGraph/BarGraph";
import LeavesChart from "../Components/LeavesChart/LeavesChart";
// import { Card } from "antd";
// import LineGraph from "./Linegraph/Linegraph";
// import BarGraph from "./Linegraph/Bargraph";
// import OrderStatusgraph from "./Linegraph/OrderStatusgraph";
const UserDashboard = () => {
  return (
    <DashboardContainer>

    <CardContainer>
      <StatCard>
        <IconWrapper style={{backgroundColor: "#f36c6c"}}>
          <FaDollarSign />
        </IconWrapper>
        <StatContent>
          <StatValue>0</StatValue>
          <StatLabel>No. of Projects</StatLabel>
        </StatContent>
      </StatCard>

      <StatCard>
        <IconWrapper style={{backgroundColor: "#1ba9cc"}}>
          <FaMoneyBillAlt />
        </IconWrapper>
        <StatContent>
          <StatValue>Avg </StatValue>
          <StatLabel>Performance</StatLabel>
        </StatContent>
      </StatCard>

      <StatCard>
        <IconWrapper style={{backgroundColor: "#f9cd38"}}>
          <FaCube />
        </IconWrapper>
        <StatContent>
          <StatValue>25 days</StatValue>
          <StatLabel>Monthly Attendence</StatLabel>
        </StatContent>
      </StatCard>

    </CardContainer>

    <GraphContainer>

      <BarGraph/>
      <LeavesChart/>
    </GraphContainer>

    </DashboardContainer>
  );
};

export default UserDashboard;
