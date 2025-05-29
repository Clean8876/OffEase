// src/pages/ForgotPassword/ForgotPassword.styles.js

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background:#f1f1f1;
`;

export const Box = styled.div`
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
  color: rgb(173, 28, 137);
  font-size: 1.8rem;

`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 1rem 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color:rgb(235, 126, 208);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color:rgb(243, 116, 211);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: 0.3s;

  &:hover {
    background-color:rgb(247, 76, 204);
  }
`;

export const BackLink = styled(Link)`
  display: block;
  margin-top: 1rem;
  color:rgb(235, 126, 208);
  font-size: 0.95rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
