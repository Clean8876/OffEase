import React from 'react';
import {
  StatsContainer,
  StatBox,
  StatTitle,
  StatValue,
  AddButtonWrapper,
  AddButton,
} from './Stats.styles';

const Stats = ({ usersCount, todaysLeaveCount, onAddEmployee }) => {
  return (
    <StatsContainer>
      <StatBox>
        <StatTitle>No. of Users</StatTitle>
        <StatValue>{usersCount}</StatValue>
      </StatBox>

      <StatBox>
        <StatTitle>Today's Leaves</StatTitle>
        <StatValue>{todaysLeaveCount}</StatValue>
      </StatBox>

      <AddButtonWrapper>
        <AddButton onClick={onAddEmployee}>+ Add Employee</AddButton>
      </AddButtonWrapper>
    </StatsContainer>
  );
};

export default Stats;
