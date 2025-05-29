import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import {
  HeaderContainer,
  HeaderWrapper,
  HeaderTitle,
  ProfileContainer,
  ProfileIcon,
  DropdownMenu
} from "./UserHeader.styles";

import { getUserById, logout } from "../../../../api/AuthApi"; // Adjust path if needed

const SidebarItem = [
  { id: 1, name: "Dashboard", path: "/user" },
  { id: 2, name: "Apply Leave", path: "/user/applyleave" },
  { id: 3, name: "Calender", path: "/user/calander" },
  { id: 4, name: "Profile", path: "/user/profile" },
];

const UserHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [Title, setTitle] = useState(""); // Store user full name
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

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

  // Fetch user name on component mount
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
        <ul className="menu-list">
          {SidebarItem.map((item) => (
            <li className="menu-item" key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
                onClick={() => {
                  localStorage.setItem("title", JSON.stringify(item.name));
                }}
                end
              >
                {/* <span className="menu-link-icon">{item.icon}</span> */}
                <span className="menu-link-text">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

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
    </HeaderContainer>
  );
};

export default UserHeader;
