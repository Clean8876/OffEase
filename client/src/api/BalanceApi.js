import axiosConfig from "../Config/AxiosConfig";

export const getAllBalances = async () => {
    const token = localStorage.getItem("token");
    try {
        const res = await axiosConfig.get("api/leave/Allbalance", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log("Fetched Balances:", res.data); // Debugging line to check fetched balances
        return res.data;
    }
    catch (error) {
        throw error.response?.data || error;
    }
}


export const getBalanceById = async () => {
    const token = localStorage.getItem("token");
    try {
        const res = await axiosConfig.get(`api/leave/balance`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log("Fetched Balance by ID:", res.data); // Debugging line to check fetched balance by ID
        return res.data;
    }
    catch (error) {
        throw error.response?.data || error;
    }
}