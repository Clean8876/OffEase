import axiosConfig from "../Config/AxiosConfig";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkFkbWluQG1haWwuY29tIiwiaWQiOiI2ODMwMzc3MzRjYzZiNTU1NDI2NjkxMmQiLCJyb2xlIjoiYWRtaW4iLCJkZXBhcnRtZW50IjoiaHIiLCJpYXQiOjE3NDgxNTU3MzEsImV4cCI6MTc1MDc0NzczMX0.cd2nbps_e_6--urA568Wpbt5lGac-ouVWFseX6htowE"; // ← Your token here


//  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…wNTh9.eJQjhcEHLzPSl0dHfuZ3sLWa99dNfrT-tl-qJdl4ZUA',



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