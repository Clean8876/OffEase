import styled from 'styled-components';

export const ChartWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 16px;

  @media (max-width: 480px) {
    padding: 0px;
    width: 350px;
    border-radius: 8px;
    box-shadow: none;
  }
`;

export const ChartTitle = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #1f2937;
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
`;
