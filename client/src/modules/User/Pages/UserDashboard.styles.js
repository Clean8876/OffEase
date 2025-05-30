import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;

export const CardContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;
  // margin-left: 40px;
  background-color: #f4f6f9;
  justify-content: space-around;

   @media (max-width: 480px) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: 0px;
}
`;

export const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  display: flex;
  width: 300px;
  height: 80px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 1360px) {
    width: 250px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 50px;
  }
`;

export const IconWrapper = styled.div`
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  background-color: ${({ bgColor }) => bgColor || "#eee"};
  color: white;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  @media (max-width: 1360px) {
    width: 60px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    width: 40px;
    font-size: 12px;
  }
`;

export const StatContent = styled.div`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1360px) {
    padding: 8px 10px;
  }

  @media (max-width: 480px) {
    padding: 6px 8px;
  }
`;

export const StatValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #2a2a2a;

  @media (max-width: 1360px) {
    font-size: 14px;
  }
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const GraphContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  border-radius: 8px;
  margin-left: 50px;

  @media (max-width: 768px) {
  display: flex;
  flex-direction: column;
    margin-left: 0px;
  }

  @media (max-width: 480px) {
    display: grid;
    grid-template-columns: 1fr;
    margin-left: 0px;
  }
`;

