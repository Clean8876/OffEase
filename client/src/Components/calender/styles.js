import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  max-width: 420px;
  margin: 2rem auto;
  font-family: Arial, sans-serif;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f8f8;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DayLabel = styled.div`
  text-align: center;
  font-weight: bold;
  padding: 0.5rem;
  background: #f0f0f0;
`;

export const DayCell = styled.div`
  height: 60px;
  border: 1px solid #eee;
  padding: 4px;
  position: relative;
  background: ${({ isToday }) => (isToday ? '#e0f7fa' : 'white')};

  .date {
    text-align: right;
    font-size: 12px;
  }

  .dot {
    width: 6px;
    height: 6px;
    background: #1976d2;
    border-radius: 50%;
    position: absolute;
    bottom: 4px;
    left: 4px;
  }
`;
