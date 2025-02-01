import api from './api';

export const userService = {
    // Create new admin user
    registerAdmin: async (userData) => {
        try {
            const response = await api.post('/Account', userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'حدث خطأ في إنشاء الحساب');
        }
    },

    // Get all admin users
    getAllUsers: async () => {
        try {
            const response = await api.get('/Account/users');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'حدث خطأ في جلب المستخدمين');
        }
    },

    // Update user
    updateUser: async (userId, userData) => {
        try {
            const response = await api.put(`/Account/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'حدث خطأ في تحديث المستخدم');
        }
    },

    // Delete user
    deleteUser: async (userId) => {
        try {
            await api.delete(`/Account/${userId}`);
        } catch (error) {
            throw new Error(error.response?.data || 'حدث خطأ في حذف المستخدم');
        }
    }
};