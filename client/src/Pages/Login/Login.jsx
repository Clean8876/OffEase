import React, { useState } from 'react';
import {
  Container,
  Wrapper,
  Left,
  Right,
  Title,
  Form,
  Input,
  Button,
  LinkText,
  Icon,
  Light,
  Circle,
  SubCircle
} from './Login.styles';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import LoginImage from '../../assets/Login.gif';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/AuthApi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password });

    try {
      const response = await login({ email, password });

      console.log('Login Success:', response);

      // Optional: Save role if needed elsewhere
      localStorage.setItem('role', response.role);

      alert('Login Success');

      // ✅ Redirect based on role
      if (response.user?.role === 'admin') {
        navigate('/admin');
      } else if (response.user?.role === 'employee') {
        navigate('/user');
      } else {
        alert('Unknown role. Cannot redirect.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login Failed: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <Container>
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
