import instance from "./axiosInstance";

const addOrder = async (orderData) => {
    try {
        const response = await instance.post('/order', {
            userId: orderData.userId,
            addressData: orderData.addressData,
            cartItems: orderData.cartItems,
            totalAmount: orderData.totalAmount,
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const getOrder = async () => {
    try {
        const userId = localStorage.getItem('userId');
        const response = await instance.get(`/order?userId=${userId}`)
        return response;
    } catch (error) {
        throw error;
    }
};

export { addOrder , getOrder};

