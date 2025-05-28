import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
//   height: 50px; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color:rgb(255, 255, 255); /* Formerly theme.colors.secondary */
  padding: 20px 20px;
  border-radius: 10px;
  border-bottom: 1px solid #e0e0e0;
  z-index: 990;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    box-sizing: border-box;
    height: 90px;
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  margin: 0;
  color: #333;

  @media (max-width: 768px) {
    margin-left: 40px;
  }
`;

export const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  border-radius: 10px;
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f0f2f5; /* Formerly theme.colors.backgrounGrey */
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const UserDetails = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const UserName = styled.div`
  color: #000000; /* Formerly theme.colors.black */
  border-radius: 50px;
  padding: 6px 12px;
  font-weight: 550;
  font-size: 16px;
  white-space: nowrap;
`;

export const UserEmail = styled.div`
  font-size: 14px;
  color: #555; /* Formerly theme.colors.test */
  margin-top: 4px;
`;

export const LogoutIconWrapper = styled.div`
  cursor: pointer;
  color: #666;
  transition: color 0.2s ease;
  margin-left: 20px;

  &:hover {
    color: #e53935;
  }
`;
