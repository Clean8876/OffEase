import React from 'react';
import { useNavigate } from 'react-router-dom';
import tickImage from '../assets/tick.png';
import {
  Container,
  Image,
  Message,
  Button
} from './SuccessPage.styles';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard'); // Adjust to your actual dashboard route
  };

  return (
    <Container>
      <Image src={tickImage} alt="Success" />
      <Message>Registration Successful! An email has been sent to User inbox.</Message>
      <Button onClick={handleGoHome}>Go to Home Dashboard</Button>
    </Container>
  );
};

export default SuccessPage;
