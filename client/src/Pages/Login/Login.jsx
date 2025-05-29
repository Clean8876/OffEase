import React, { useState } from 'react';
import {
  Container, Wrapper, Left, Right, Title, Form, Input,
  Button, LinkText, Icon, Light, Circle, SubCircle
} from './Login.styles';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import LoginImage from '../../assets/Login.gif';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/AuthApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (password.length < 2) {
      toast.error('Password must be at least 6 characters');
      return;
    }

try {
  const response = await login({ email, password });
  toast.success('Login Successful');

  localStorage.setItem('role', response.role);

  setTimeout(() => {
    if (response.user?.role === 'admin') {
      navigate('/admin');
    } else if (response.user?.role === 'employee') {
      navigate('/user');
    } else {
      toast.warning('Unknown role. Cannot redirect.');
    }
  }, 5000); // 2 seconds delay
} catch (error) {
  console.error('Login error:', error);
  toast.error(error.message || 'Invalid credentials');
}
  };

  return (
    <Container>
      <ToastContainer position="top-center" autoClose={3000} />
      <Wrapper>
        <Left>
          <img src={LoginImage} alt="login" className="login-image" />
        </Left>

        <Circle />

        <Right>
          <Light>
            <Title>Login</Title>
            <Form onSubmit={handleSubmit}>
              <Icon>
                <FaEnvelope style={{ marginRight: '0.75rem', color: '#666' }} />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Icon>

              <Icon>
                <FaLock style={{ marginRight: '0.75rem', color: '#666' }} />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <FaEye
                    style={{ marginLeft: '0.75rem', cursor: 'pointer', color: '#666' }}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEyeSlash
                    style={{ marginLeft: '0.75rem', cursor: 'pointer', color: '#666' }}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </Icon>

              <LinkText>
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </LinkText>

              <Button type="submit">LOGIN</Button>
            </Form>
          </Light>
        </Right>

        <SubCircle />
      </Wrapper>
    </Container>
  );
};

export default Login;
