import api from './api';

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/Account/Login', credentials);
            return response.data;
        } catch (error) {
            if (error.response) {
                // The server responded with a status code outside the 2xx range
                if (error.response.status === 401) {
                    throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
                }
                throw new Error(error.response.data || 'حدث خطأ في تسجيل الدخول');
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error('لا يمكن الاتصال بالخادم');
            } else {
                // Something happened in setting up the request
                throw new Error('حدث خطأ غير متوقع');
            }
        }
    }
};