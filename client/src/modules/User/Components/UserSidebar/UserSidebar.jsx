import React from "react";
import { SideBarwrapper,  } from "./UserSidebar.styles";
import { NavLink } from "react-router-dom";
// import logo from "../../assets/Companylogo.png"; 

const UserSidebar = ({ setTitle, isCollapsed, setIsCollapsed }) => {
  const SidebarItem = [
    { id: 1, name: "Dashboard", path: "/employee"},
    { id: 2, name: "Apply Leave", path: "/" },
    { id: 3, name: "Balance Sheet", path: "/" },
    { id: 4, name: "Calender", path: "/"  },
    { id: 5, name: "Suggestion Box", path: "/"},
    { id: 6, name: "Feedback", path: "/"},
    // { id: 5, name: "", path: "/", icon: <GiWaterGallon /> },
  ];

  return (
    <SideBarwrapper
      isCollapsed={isCollapsed}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
    {/* <div className="sidebar-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
      <img src={logo} alt="Logo" className="sidebar-logo"/>
    </div> */}

      <div className="menu">
        <ul className="menu-list">
          {SidebarItem.map((item) => (
            <li className="menu-item" key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "menu-link active" : "menu-link")}
                onClick={() => {
                  setTitle(item.name); // Update Header Title immediately
                  localStorage.setItem("title", JSON.stringify(item.name)); // Store in Local Storage
                }}
                end
              >
                <span className="menu-link-icon">{item.icon}</span>
                {!isCollapsed && <span className="menu-link-text">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </SideBarwrapper>
  );
};

export default UserSidebar;