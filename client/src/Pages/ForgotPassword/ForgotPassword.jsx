// src/pages/ForgotPassword/ForgotPassword.jsx

import React, { useState } from 'react';
import { forgotPassword } from '../../api/AuthApi'; // adjust the path
import {
  Container,
  Box,
  Title,
  Input,
  Button,
  BackLink
} from './ForgotPasword.styles';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await forgotPassword({ email });
      console.log('Reset request sent:', res);
      alert('Reset link sent to your email if it exists in our system.');
      navigate('/');

    } catch (error) {
      console.error('Forgot password error:', error);
      alert('Failed to send reset link.');
    }
  };

  return (
    <Container>
      <Box>
        <Title>Forgot Password</Title>
        <form onSubmit={handleForgotPassword}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Send Reset Link</Button>
        </form>
        <BackLink to="/">← Back to Login</BackLink>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
