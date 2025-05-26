import styled from 'styled-components';

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns:1fr 1fr 1fr;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

export const StatBox = styled.div`
  flex: 1 1 200px;
  padding: 1.5rem;
  background-color:rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  display: flex;
  // flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

`;

export const StatsContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1rem;
  gap: 1rem;
`;

export const StatTitle = styled.h4`
  margin: 0;
  color: #666;
`;

export const StatValue = styled.h2`
  margin: 0;
  color: #333;
`;

export const StatIconWrapper = styled.div`
  margin-bottom: 0.5rem;
  background-color:rgb(238, 211, 236);
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
`;

export const AddButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AddButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 2rem;
  // background-color: #3e64ff;
  // color: white;
  border: 4px dashed rgb(238, 211, 236);
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
    flex: 1 1 200px;
  padding: 3rem;
  background-color:rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: rgb(238, 211, 236);
  }
`;
