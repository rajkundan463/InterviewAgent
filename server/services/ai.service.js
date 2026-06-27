import axios from "axios";

const aiClient = axios.create({
    baseURL: process.env.AI_SERVICE_URL,
    timeout: 30000,
});


aiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(
            "AI Service Error:",
            error.response?.data || error.message
        );
        return Promise.reject(error);
    }
);

export default aiClient;