import styled from 'styled-components';

export const HeaderContainer = styled.div`
    // height: 80px;
    // background-color: rgb(247, 245, 245);
    color: #1d1d1d;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 100;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

export const HeaderWrapper = styled.div`
    width: 100%;
    height: 80px;
    background-color:rgb(247, 215, 236);
    color: #1d1d1d;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    padding-right: 20px;
    
font-family: "Montserrat", sans-serif;

@media (max-width: 1360px) {
height: 50px;
    padding-right: 10px;
    font-size: 16px;
}

  .menu-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    gap: 30px;
    margin-left: 50px;
    font-family: "Montserrat", sans-serif;
  }

  .menu-item {
    width: 100%;
    color: #1d1d1d;
    gap: 10px;

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

    // &:hover {
    //   background:rgba(165, 170, 179, 0.71);
    //   color: #1f2937;
    // }

    &.active {
      background:rgba(206, 55, 186, 0.28); 
      color: white;
      font-weight: bold;
      padding: 12px 20px;

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
    color: white; 
  }

  .menu-link-text {
    display: ${({ isCollapsed }) => (isCollapsed ? "none" : "inline")};
    // color: white;
  }

   .menu-link.active .menu-link-text {
    color: white;
  }
`;

export const HeaderTitle = styled.h1`
display: flex;
align-items: center;
flex-direction: row;
justify-content: center;
font-size: 24px;
font-weight: bold;
margin-right:200px;
font-family: "Montserrat", sans-serif;
`;

export const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
`;

export const ProfileIcon = styled.div`
    margin-left: 10px;
    font-size: 24px;
    color: #333;
    cursor: pointer;

    @media (max-width: 1360px) {
        font-size: 20px;
        margin-left: 5px;
    }
`;

export const DropdownMenu = styled.div`
    position: absolute;
    right: 0;
    top: 40px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    padding: 5px 0;
    z-index: 10;

    button {
        background: none;
        border: none;
        padding: 10px 20px;
        width: 100%;
        text-align: left;
        cursor: pointer;
        font-size: 14px;

        &:hover {
            background: #f0f0f0;
        }

        @media (max-width: 1360px) {
            font-size: 12px;
            padding: 8px 15px;
        }
    }
        @media (max-width: 1360px) {
            padding: 0px;
            top: 30px;
}
`;
