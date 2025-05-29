import axiosConfig from "../Config/AxiosConfig";

// REGISTER
export const register = async (data) => {
  try {
    // Get the token from localStorage instead of hardcoding
    const token = localStorage.getItem("token");

    const res = await axiosConfig.post("/api/user/register", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// LOGIN
export const login = async (data) => {

  try {
    const res = await axiosConfig.post("/api/user/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Login Response:", res.data);

    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
      console.log("Token stored in localStorage:", res.data.token);

    }

    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axiosConfig.get("/api/user/users", {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
  
}

export const getUserById = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axiosConfig.get("api/user/user-id", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("userrrrr", res.data)
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export const forgotPassword = async (data) => {
  try {
    const res = await axiosConfig.post("/api/user/forgot-password", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logout = async () => {
  try {
    const res = await axiosConfig.get("/api/user/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // include this if using cookies
    });
    return res.data; // returns { message: 'Logout successful' }
  } catch (error) {
    throw error.response?.data || error;
  }
};

