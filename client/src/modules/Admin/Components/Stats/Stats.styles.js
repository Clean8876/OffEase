import styled from 'styled-components';

export const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 2rem;
  background-color: #f9fafe;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
`;

export const StatBox = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 1.5rem;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
`;

export const StatTitle = styled.div`
  font-size: 1rem;
  color: #6c757d;
`;

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

export const AddButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AddButton = styled.button`
  height: 60px;
  padding: 0 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
