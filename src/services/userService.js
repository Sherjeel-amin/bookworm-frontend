import instance from "./axiosInstance";

const signUp = async (formData) => {
    try {
        const response = await instance.post('/signup', new URLSearchParams(formData).toString());
        return response;
    } catch (error) {
        throw error;
    }
};

const login = async (formData) => {
    try {
        const response = await instance.post('/login', new URLSearchParams(formData).toString());
        return response;
    } catch (error) {
        throw error;
    }
};
export { signUp, login };