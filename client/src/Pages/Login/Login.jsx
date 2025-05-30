// import React, { useState } from 'react';
// import {
//   Container, Wrapper, Left, Right, Title, Form, Input,
//   Button, LinkText, Icon, Light, Circle, SubCircle
// } from './Login.styles';
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
// import LoginImage from '../../assets/Login.gif';
// import { Link, useNavigate } from 'react-router-dom';
// import { login } from '../../api/AuthApi';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const validateEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error('Please enter both email and password');
//       return;
//     }

//     if (!validateEmail(email)) {
//       toast.error('Please enter a valid email address');
//       return;
//     }

//     if (password.length < 2) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }

// try {
//   const response = await login({ email, password });
//   toast.success('Login Successful');

//   localStorage.setItem('role', response.role);

//   setTimeout(() => {
//     if (response.user?.role === 'admin') {
//       navigate('/admin');
//     } else if (response.user?.role === 'employee') {
//       navigate('/user');
//     } else {
//       toast.warning('Unknown role. Cannot redirect.');
//     }
//   }, 2000);
// } catch (error) {
//   console.error('Login error:', error);

//   // Check for API response message
//   const message =
//     error.response?.data?.message || error.message || 'Invalid credentials';

//   if (message.toLowerCase().includes('not found')) {
//     toast.error('Account not found');
//   } else {
//     toast.error(message);
//   }
// }

//   };

//   return (
//     <Container>
//       <ToastContainer position="top-center" autoClose={3000} />
//       <Wrapper>
//         <Left>
//           <img src={LoginImage} alt="login" className="login-image" />
//         </Left>

//         <Circle />

//         <Right>
//           <Light>
//             <Title>Login</Title>
//             <Form onSubmit={handleSubmit}>
//               <Icon>
//                 <FaEnvelope style={{ marginRight: '0.75rem', color: '#666' }} />
//                 <Input
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </Icon>

//               <Icon>
//                 <FaLock style={{ marginRight: '0.75rem', color: '#666' }} />
//                 <Input
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 {showPassword ? (
//                   <FaEye
//                     style={{ marginLeft: '0.75rem', cursor: 'pointer', color: '#666' }}
//                     onClick={() => setShowPassword(false)}
//                   />
//                 ) : (
//                   <FaEyeSlash
//                     style={{ marginLeft: '0.75rem', cursor: 'pointer', color: '#666' }}
//                     onClick={() => setShowPassword(true)}
//                   />
//                 )}
//               </Icon>

//               <LinkText>
//                 <Link to="/forgot-password" className="forgot-password-link">
//                   Forgot Password?
//                 </Link>
//               </LinkText>

//               <Button type="submit">LOGIN</Button>
//             </Form>
//           </Light>
//         </Right>

//         <SubCircle />
//       </Wrapper>
//     </Container>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { login } from '../../api/AuthApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
  const response = await login({ email, password });
  // toast.success('Login Successful');

  localStorage.setItem('role', response.role);

  setTimeout(() => {
    if (response.user?.role === 'admin') {
      navigate('/admin');
    } else if (response.user?.role === 'employee') {
      navigate('/user');
    } else {
      toast.warning('Unknown role. Cannot redirect.');
    }
  }, 2000);
  } catch (error) {
    console.error('Login error:', error);

    // Check for API response message
    const message =
      error.response?.data?.message || error.message || 'Invalid credentials';
}
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-10">
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#5F259F' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold ml-3" style={{ color: '#5F259F' }}>SecureAccess</h1>
            </div>
            <h2 className="text-3xl font-bold mt-4">Welcome back</h2>
            <p className="text-gray-500 mt-2">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent transition"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm font-medium hover:underline" style={{ color: '#5F259F' }}>
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent transition"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center mb-6">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 focus:ring-0"
                style={{ color: '#5F259F' }}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-medium text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
              style={{ backgroundColor: '#159AFF' }}
            >
              Sign in
            </button>
          </form>

          
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-700 p-10 flex flex-col justify-center items-center text-white">
          <div className="max-w-xs">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 mx-auto mb-8" />
            <h3 className="text-2xl font-bold mb-3">Enterprise-grade security</h3>
            <p className="text-indigo-100">
              Our platform uses military-grade encryption and multi-factor authentication to keep your data safe and secure at all times.
            </p>
          </div>
          
          <div className="flex mt-12 space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
              <span className="text-sm">256-bit encryption</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
              <span className="text-sm">2FA ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
