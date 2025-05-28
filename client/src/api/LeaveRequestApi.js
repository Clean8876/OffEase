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

  ////////////////////////////////////////////////

export const submitLeaveRequest = async (formData) => {
  const token = localStorage.getItem("token");

  const payload = {
    leaveTypeName: formData.leaveType, 
    startDate: formData.startDate,
    endDate: formData.endDate,
    reason: formData.reason,
    description: formData.description
  };

  const response = await axiosConfig.post("/api/leave/request", payload, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  return response.data;
};



 
 
export const getLeaveBalances = async () => {
  const response = await axiosConfig.get("/api/leave/balances");
  return response.data;
};

 
export const getLeaveRequests = async () => {
 
const token = localStorage.getItem("token");
 try{
  const response = await axiosConfig.get("/api/leave/requests", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  console.log(response.data);
  return response.data;
 } catch (error) {
  throw error.response?.data || error;
 }
};