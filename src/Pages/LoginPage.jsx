import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { setCredentials } from '../store/authSlice';
import { authService } from '../services/authService';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [credentials, setCredentials0] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials0(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError('');
    };

    const handleLogin = async () => {
        if (isLoading || !credentials.email || !credentials.password) return;

        setIsLoading(true);
        setError('');

        try {
            const response = await authService.login(credentials);

            if (response?.token) {
                dispatch(setCredentials({
                    token: response.token,
                    role: response.role
                }));
                navigate('/orders');
            }
        } catch (err) {
            setError(err.message || 'حدث خطأ في تسجيل الدخول');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark p-6" dir="rtl">
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-700 text-gold transition-all hover:scale-105">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="/logo.png" alt="Logo" className="h-16 animate-fade-in" />
                </div>

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gold mb-2">تسجيل الدخول</h2>
                    <p className="text-gray-400">أدخل بياناتك للوصول إلى النظام</p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="bg-red-600 text-white p-3 rounded-lg mt-4 flex items-center gap-2 justify-center animate-shake">
                        <AlertCircle className="h-5 w-5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Login Fields */}
                <div className="mt-6 space-y-6">
                    {/* Email Field */}
                    <div>
                        <label className="block text-gold text-sm font-bold mb-2" htmlFor="email">
                            البريد الإلكتروني
                        </label>
                        <div className="relative">
                            <Mail className="absolute right-3 top-3 h-5 w-5 text-gold" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                disabled={isLoading}
                                value={credentials.email}
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                                className="pr-10 w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent disabled:opacity-50"
                                placeholder="your@email.com"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-gold text-sm font-bold mb-2" htmlFor="password">
                            كلمة المرور
                        </label>
                        <div className="relative">
                            <Lock className="absolute right-3 top-3 h-5 w-5 text-gold" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                disabled={isLoading}
                                value={credentials.password}
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                                className="pr-10 w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent disabled:opacity-50"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        disabled={isLoading || !credentials.email || !credentials.password}
                        className="w-full flex justify-center items-center gap-2 bg-gold text-black py-3 px-4 rounded-xl shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <LogIn className="h-5 w-5" />
                                <span>تسجيل الدخول</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;