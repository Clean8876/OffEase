import React from "react";
import {
HeaderContainer,

    Title,
    UserInfoWrapper,
    UserDetails,
    UserName,
    UserEmail
} from "./AdminHeader.styles";


const AdminHeader = () => {
  return (
    <HeaderContainer>
      <Title>Dashboard</Title>
      <UserInfoWrapper>
        <UserDetails>
          <UserName>Admin </UserName>
          <UserEmail>Admin@mail.com</UserEmail>
        </UserDetails>
      </UserInfoWrapper>
    </HeaderContainer>
  );
};

export default AdminHeader;
