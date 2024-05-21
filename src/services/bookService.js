import instance from "./axiosInstance";

const booksData = async () => {
    try {
        const response = await instance.get('/books');
        return response;
    } catch (error) {
        throw error;
    }
};

export {booksData};