import api from './api';

export const orderService = {
    getAllOrders: async () => {
        try {
            const response = await api.get('/Order');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'حدث خطأ في جلب الطلبات');
        }
    },

    createOrder: async (orderData) => {
        try {
            const formData = new FormData();
            // Append all order fields to FormData
            Object.keys(orderData).forEach(key => {
                formData.append(key, orderData[key]);
            });

            const response = await api.post('/Order', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'حدث خطأ في إنشاء الطلب');
        }
    },

    getOrderById: async (id) => {
        try {
            const response = await api.get(`/Order/ById?id=${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'حدث خطأ في جلب بيانات الطلب');
        }
    },

    updateOrder: async (id, orderData) => {
        try {
            const formData = new FormData();
            Object.keys(orderData).forEach(key => {
                formData.append(key, orderData[key]);
            });

            const response = await api.put(`/Order?id=${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'حدث خطأ في تحديث الطلب');
        }
    },

    deleteOrder: async (id) => {
        try {
            await api.delete(`/Order?id=${id}`);
        } catch (error) {
            throw new Error(error.response?.data || 'حدث خطأ في حذف الطلب');
        }
    },

    addOrderItem: async (orderId, itemData) => {
        try {
            const formData = new FormData();
            Object.keys(itemData).forEach(key => {
                formData.append(key, itemData[key]);
            });

            const response = await api.post(`/Order/AddItem${orderId}`, formData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'حدث خطأ في إضافة المنتج للطلب');
        }
    },

    generateOtp: async (orderId) => {
        try {
            const response = await api.post(`/Order/GenerateOtp${orderId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'حدث خطأ في إنشاء رمز التحقق');
        }
    },

    confirmOrder: async (confirmData) => {
        try {
            const formData = new FormData();
            formData.append('OrderId', confirmData.OrderId);
            formData.append('Code', confirmData.Code);

            const response = await api.post('/Order/ConfirmOrder', formData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'حدث خطأ في تأكيد الطلب');
        }
    }
};