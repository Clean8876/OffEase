import axiosConfig from "../Config/AxiosConfig";

export const getAllBalances = async () => {
    try {
        const res = await axiosConfig.get("api/balance/get-all-leaves", {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("Fetched Balances:", res.data); // Debugging line to check fetched balances
        return res.data;
    }
    catch (error) {
        throw error.response?.data || error;
    }
}

export const getLeaveBalances = async (employeeId) => {
  const response = await axiosConfig.get(`/api/balance/get-balance/${employeeId}`);
  console.log("Fetched Leave Balances:", response.data);
  return response.data?.data; 
};
