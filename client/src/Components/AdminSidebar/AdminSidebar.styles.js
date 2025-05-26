import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

// Container
export const SidebarContainer = styled.div`
  width: 250px;
  height: 95vh;
  background-color:rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  padding: 16px;
  z-index: 999;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.3s ease-in-out;
    height: 100vh;
  }

  @media (max-width: 990px) {
    width: 200px;
  }

  @media (min-width: 769px) {
    position: fixed;
    top: 0;
    left: 0;
  }
`;

export const SidebarTitle = styled.h2`
  font-family: "Segoe UI", sans-serif;
  color: rgb(212, 31, 200);
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 16px;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  scrollbar-width: none;
  height: 90vh;
`;

export const MenuItem = styled.li`
  font-size: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  color: #333;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    color: #fff;
    background: linear-gradient(to right, rgb(192, 126, 188),rgb(192, 126, 188));
  }

  &.active {
    color: #fff;
    background: linear-gradient(to right, rgb(192, 126, 188),rgb(192, 126, 188));
    border-radius: 6px;
  }
`;

export const IndentedItem = styled(MenuItem)`
  margin-left: 24px;
  font-size: 0.9em;
`;

export const StyledNavLink = styled(NavLink).attrs(() => ({
  activeClassName: "active",
}))`
  text-decoration: none;
  color: inherit;

  & > li {
    list-style: none;
  }

  display: block;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 12px;
  color: #333;
  transition: background-color 0.2s, color 0.2s;

  ${({ $indented }) =>
    $indented &&
    css`
      margin-left: 24px;
      font-size: 0.9em;
    `}

  ${({ $isDropdownChild }) =>
    $isDropdownChild
      ? css`
          &.active {
            color: #007bff;
            background: transparent;
          }
        `
      : css`
          &.active {
            color: #fff;
            background: linear-gradient(to right,  rgb(192, 126, 188),rgb(192, 126, 188));
            border-radius: 6px;
          }
        `}

  &:hover {
    color: #fff;
    background: rgba(192, 126, 188, 0.78);
  }
`;

export const HamburgerIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 26px;
    left: 16px;
    z-index: 998;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const Backdrop = styled.div`
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 998;
  }
`;

export const DropdownIcon = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;

  svg {
    font-size: 14px;
  }
`;
