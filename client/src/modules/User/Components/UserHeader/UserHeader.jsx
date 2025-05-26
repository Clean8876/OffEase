import React, { useState, useRef } from "react";
import { 
    HeaderContainer, 
    HeaderWrapper, 
    HeaderTitle, 
    ProfileContainer, 
    ProfileIcon, 
    DropdownMenu 
} from "./UserHeader.styles";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const SidebarItem = [
    { id: 1, name: "Dashboard", path: "/employee"},
    { id: 2, name: "Apply Leave", path: "/user/applyleave" },
    { id: 3, name: "Balance Sheet", path: "/" },
    { id: 4, name: "Calender", path: "/user/calander"  },
    {id:5, name:"Profile", path:"/user/profile"},
    // { id: 5, name: "", path: "/", icon: <GiWaterGallon /> },
  ];

const UserHeader = ( ) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [Title, setTitle] = useState(null); // <-- Add userData state
    const dropdownRef = useRef(null);


    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleLogout = () => {
        // localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <HeaderContainer>
            <HeaderWrapper>
                 <ul className="menu-list">
          {SidebarItem.map((item) => (
            <li className="menu-item" key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "menu-link active" : "menu-link")}
                onClick={() => {
                  setTitle(item.name);
                  localStorage.setItem("title", JSON.stringify(item.name)); // Store in Local Storage
                }}
                end
              >
                <span className="menu-link-icon">{item.icon}</span>
               <span className="menu-link-text">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

                <ProfileContainer ref={dropdownRef}>
                  <span>Welcome, !</span>
                    
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
