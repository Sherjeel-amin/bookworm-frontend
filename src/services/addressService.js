import instance from "./axiosInstance";

const addAddress = async (formData) => {
    try {
        const response = await instance.post('/address', formData);
        return response;
    } catch (error) {
        throw error;
    }
};

const getAddress = async () => {
    const userId = localStorage.getItem('userId');
    try {
        const response = await instance.get(`/address?userId=${userId}`);
        return response;
    } catch (error) {
        throw error;
    }
};


const editAddress = async (formData) => {
    try {
        const response = await instance.put('/address', formData, { headers: { 'Content-Type': 'application/json' } });
        return response;
    } catch (error) {
        throw error;
    }
};


const deleteAddress = async (addressId) => {
    try {
        const response = await instance.delete('/address', 
        {
            data: { addressId },
            headers: { 'Content-Type': 'application/json' }
          });
        return response;
    } catch (error) {
        throw error;
    }
};

export { addAddress, getAddress , editAddress , deleteAddress};