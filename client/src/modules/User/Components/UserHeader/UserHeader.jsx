import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import {
  HeaderContainer,
  HeaderWrapper,
  HeaderTitle,
  ProfileContainer,
  ProfileIcon,
  DropdownMenu,
  HamburgerIcon,
  MobileMenu
} from "./UserHeader.styles";

import { getUserById, logout } from "../../../../api/AuthApi";

const SidebarItem = [
  { id: 1, name: "Dashboard", path: "/user" },
  { id: 2, name: "Apply Leave", path: "/user/applyleave" },
  { id: 3, name: "Calender", path: "/user/calander" },
  { id: 4, name: "Profile", path: "/user/profile" },
];

const UserHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [Title, setTitle] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log(response.message);
      localStorage.clear();
      alert("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err.message || err);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserById();
        const fullName = `${response.data.Firstname || ""}`.trim();
        setTitle(fullName);
      } catch (error) {
        console.error("Failed to fetch user name", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        {/* Hamburger Icon for small screens */}
        <HamburgerIcon onClick={toggleMobileMenu}>
          <div></div>
          <div></div>
          <div></div>
        </HamburgerIcon>

        {/* Menu List for large screens */}
        <ul className="menu-list">
          {SidebarItem.map((item) => (
            <li className="menu-item" key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
                onClick={() =>
                  localStorage.setItem("title", JSON.stringify(item.name))
                }
                end
              >
                <span className="menu-link-text">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Profile Section */}
        <ProfileContainer ref={dropdownRef}>
          <span>Welcome, {Title || "User"}!</span>
          <ProfileIcon onClick={toggleDropdown}>
            <FaUserCircle size={24} />
          </ProfileIcon>
          {dropdownOpen && (
            <DropdownMenu>
              <button onClick={handleLogout}>Logout</button>
            </DropdownMenu>
          )}
        </ProfileContainer>
      </HeaderWrapper>

      {/* Mobile Menu */}
      <MobileMenu className={mobileMenuOpen ? "open" : ""}>
        {SidebarItem.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
              onClick={() => {
                setMobileMenuOpen(false);
                localStorage.setItem("title", JSON.stringify(item.name));
              }}
              end
            >
              <span className="menu-link-text">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </MobileMenu>
    </HeaderContainer>
  );
};

export default UserHeader;
