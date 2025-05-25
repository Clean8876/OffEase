import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import {
  SidebarContainer,
  SidebarTitle,
  MenuList,
  StyledNavLink,
  HamburgerIcon,
  Backdrop,
} from "./AdminSidebar.styles";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Flat list of all menu items combined
  const menuItems = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/leave-management", label: "Leave Management" },
  ];

  return (
    <>
      <HamburgerIcon onClick={toggleSidebar}>
        <FaBars size={24} />
      </HamburgerIcon>

      <Backdrop isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <SidebarContainer isOpen={isOpen}>
        <SidebarTitle>OffEase</SidebarTitle>
        <MenuList>
          {menuItems.map(({ path, label }, index) => (
            <StyledNavLink
              to={path}
              key={index}
              onClick={() => setIsOpen(false)}
              end={path === "/admin"}
              $isDropdownChild={false}
            >
              {label}
            </StyledNavLink>
          ))}
        </MenuList>
      </SidebarContainer>
    </>
  );
};

export default AdminSidebar;
