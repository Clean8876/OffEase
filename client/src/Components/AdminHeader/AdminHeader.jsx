import React from "react";
import {
  HeaderContainer,
  Title,
  UserInfoWrapper,
  UserDetails,
  UserName,
  UserEmail,
  LogoutIconWrapper
} from "./AdminHeader.styles";
import { FiLogOut } from "react-icons/fi"; // logout icon
import { useNavigate } from "react-router-dom";
import {logout} from '../../api/AuthApi'

const AdminHeader = () => {
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    const response = await logout(); // response is { message: 'Logout successful' }
    console.log(response.message); // ✅ correct usage

    localStorage.clear(); 
    alert("Logged out successfully");
    navigate("/"); 
  } catch (err) {
    console.error("Logout failed:", err.message || err);
  }
};


  return (
    <HeaderContainer>
      <Title></Title>
      <UserInfoWrapper>
        <UserDetails>
          <UserName>Admin</UserName>
          <UserEmail>Admin@mail.com</UserEmail>
        </UserDetails>
        <LogoutIconWrapper onClick={handleLogout} title="Logout">
          <FiLogOut size={24} />
        </LogoutIconWrapper>
      </UserInfoWrapper>
    </HeaderContainer>
  );
};

export default AdminHeader;
