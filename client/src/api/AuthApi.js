import axiosConfig from "../Config/AxiosConfig";

// REGISTER
export const register = async (data) => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkFkbWluQG1haWwuY29tIiwiaWQiOiI2ODMwMzc3MzRjYzZiNTU1NDI2NjkxMmQiLCJyb2xlIjoiYWRtaW4iLCJkZXBhcnRtZW50IjoiaHIiLCJpYXQiOjE3NDgxNTU3MzEsImV4cCI6MTc1MDc0NzczMX0.cd2nbps_e_6--urA568Wpbt5lGac-ouVWFseX6htowE"; // ← Your token here
  
      const res = await axiosConfig.post('/api/user/register', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // ← Send token here
        },
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };
  
// LOGIN
// login API (login function must take an object)

// LOGIN
export const login = async (data) => {
    try {
      const res = await axiosConfig.post('http://localhost:5000/api/user/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log("Login Response:", res.data);
  
      // Store token in localStorage and log it properly
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        console.log("Token:", res.data.token); // ✅ Correct
      }
  
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };
  
  