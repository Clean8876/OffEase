import axiosConfig from "../Config/AxiosConfig";

export const getAllEvents = async () => {
    try{
        const token = localStorage.getItem("token");

        const res = await axiosConfig.get("/api/event/get-event" , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        console.log("getAllEvents Response:", res.data);
        return res.data;
    }
    catch(error){
        throw error.response?.data || error;
    }
}