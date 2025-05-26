import axiosConfig from "../Config/AxiosConfig";

const token = localStorage.getItem("token");

export const getAllLeaves = async () => {
    try {
      const res = await axiosConfig.get("/api/leave?status=all", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };
  
  export const updateStatus = async (statusPayload) => {
    try {
      const res = await axiosConfig.patch("/api/leave/requests/status", statusPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };