import styled from 'styled-components';

export const EventsContainer = styled.div`
display: flex;
flex-direction: row;
  margin-top: 2rem;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  width: 100%;
`;

export const EventsTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

export const EventItem = styled.div`
  background-color: #f5f5f5;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
`;

export const GraphContainer = styled.div`
width: 50%;
  margin-top: 2rem;

  h3 {
    margin-bottom: 1rem;
    color: #333;
    margin-left: 30px;
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

export const EventStat = styled.div`
display: flex;
flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  width: 50%;
`;
