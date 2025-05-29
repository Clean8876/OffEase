import React, { useState, useEffect } from 'react';
import {
  StatsContainer,
  StatBox,
  StatTitle,
  StatValue,
  StatIconWrapper,
  AddButtonWrapper,
  AddButton,
  StatsContent,
  Wrapper
} from './Stats.styles';
import Register from '../Register/Register';
import { AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai';
import { getAllUsers } from '../../../../api/AuthApi';
import { getAllLeaves } from '../../../../api/LeaveRequestApi';

const Stats = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [todaysLeaveCount, setTodaysLeaveCount] = useState(0);

  useEffect(() => {
    getAllUsers().then((res) => {
      if (res && Array.isArray(res)) {
        setUsers(res);
      } else {
        console.error("Unexpected response from getAllUsers:", res);
      }
    });

    getAllLeaves().then((res) => {
      if (res && Array.isArray(res)) {
        const today = new Date().toISOString().split('T')[0];
        const todaysLeaves = res.filter((leave) => {
          const leaveDate = new Date(leave.createdAt).toISOString().split('T')[0];
          return leaveDate === today;
        });
        setTodaysLeaveCount(todaysLeaves.length);
      } else {
        console.error("Unexpected response from getAllLeaves:", res);
      }
    });
  }, []);

  return (
    <>
      <StatsContainer>
        <Wrapper>
        <StatBox>
          <StatIconWrapper>
            <AiOutlineUser size={32} />
          </StatIconWrapper>
          <StatsContent>
            <StatTitle>No. of Users</StatTitle>
            <StatValue>{users.length}</StatValue>
          </StatsContent>
        </StatBox>

        <StatBox>
          <StatIconWrapper>
            <AiOutlineCalendar size={32} />
          </StatIconWrapper>
          <StatsContent>
            <StatTitle>Today's Leaves</StatTitle>
            <StatValue>{todaysLeaveCount}</StatValue>
          </StatsContent>
        </StatBox>
        </Wrapper>

        <AddButtonWrapper>
          <AddButton onClick={() => setModalOpen(true)}>+ Add Employee</AddButton>
        </AddButtonWrapper>
      </StatsContainer>

      <Register open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Stats;
