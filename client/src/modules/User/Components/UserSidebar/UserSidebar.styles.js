import styled from "styled-components";

export const SideBarwrapper = styled.div`
  width: ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")};
  height: 100vh;
  position: fixed;
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  background: #2290AC;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  align-items: center;
  padding-top: 20px;
  padding: 10px;

  @media (max-width: 1360px){
    width: ${({ isCollapsed }) => (isCollapsed ? "60px" : "200px")};
  }

    .sidebar-toggle{
    margin-top: 10px;

  .sidebar-logo {
    width: ${({ isCollapsed }) => (isCollapsed ? "40px" : "80px")};
    transition: width 0.3s ease-in-out;
    border-radius: 50%;

    @media (max-width: 1360px) {
      width: ${({ isCollapsed }) => (isCollapsed ? "40px" : "60px")};
    }
  }

  }

  // .logo {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   padding: 20px;
  //   color: #1f2937;
  //   font-size: ${({ isCollapsed }) => (isCollapsed ? "18px" : "24px")};
  //   transition: font-size 0.3s ease-in-out;
  //   font-weight: bold;
  // }

  .menu {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    font-family: "Montserrat", sans-serif;
    width: 100%;
  }

  .menu-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-family: "Montserrat", sans-serif;
  }

  .menu-item {
    width: 100%;

    @media (max-width: 1360px) {
      width: ${({ isCollapsed }) => (isCollapsed ? "80%" : "100%")};
      margin: 0 auto;
    }
  }

  .menu-link {
    display: flex;
    align-items: center;
    justify-content: ${({ isCollapsed }) => (isCollapsed ? "center" : "flex-start")};
    padding: 12px;
    color: #1f2937; /* Default text color */
    text-decoration: none;
    font-size: ${({ isCollapsed }) => (isCollapsed ? "16px" : "18px")};
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    white-space: nowrap;
    overflow: hidden;
    font-family: "Montserrat", sans-serif;

    &:hover {
      background:rgba(165, 170, 179, 0.71);
      color: #1f2937;
    }

    &.active {
      background:rgba(229, 231, 235, 0.94); 
      color: white;
      font-weight: bold;

      /* Ensure icon turns white when active */
      .menu-link-icon {
        color: white;
      }
    }
      @media (max-width: 1360px) {
        font-size: 14px;
        padding: ${({ isCollapsed }) => (isCollapsed ? "8px" : "8px")};
      }
  }

  .menu-link-icon {
    font-size: 20px;
    min-width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white; 
    transition: color 0.3s ease-in-out;

    @media (max-width: 1360px) {
      font-size: 18px;
    }
  }

  .menu-link.active .menu-link-icon {
    color: black !important; 
  }

  .menu-link-text {
    display: ${({ isCollapsed }) => (isCollapsed ? "none" : "inline")};
    color: white;
  }

   .menu-link.active .menu-link-text {
    color: black !important; 
  }


  /* Channels Section */
  .menu-section {
    font-size: 14px;
    text-transform: uppercase;
    color: #9ca3af;
    margin: 10px 0 5px 20px;
    font-weight: bold;
  }

  /* Dropdown Menu */
  .submenu {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    padding-left: ${({ isCollapsed }) => (isCollapsed ? "0px" : "20px")};
  }
`;