import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e6f4f1;
  padding: 20px;
`;

export const Image = styled.img`
  width: 120px;
  height: 120px;
`;

export const Message = styled.h2`
  margin-top: 20px;
  font-size: 1.6rem;
  color: #1c5c2e;
  text-align: center;
`;

export const Button = styled.button`
  margin-top: 30px;
  padding: 12px 24px;
  background-color: #0d6efd;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #084298;
  }
`;
