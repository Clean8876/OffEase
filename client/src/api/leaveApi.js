import axios from "axios";

const API_BASE = "http://localhost:5000/api/leave"; // Change as needed

// Auth token helper
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Assumes token is stored in localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchLeaveTypes = async () => {
  try {
    const res = await axios.get(`${API_BASE}/types`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error("Failed to fetch leave types", err);
    return [];
  }
};
export const submitLeaveRequest = async (payload) => {
  try {
    const res = await axios.post(`${API_BASE}/request`, payload, getAuthHeaders());
    return { success: true, data: res.data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Error submitting request",
    };
  }
};

