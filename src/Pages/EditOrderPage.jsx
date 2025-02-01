import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Upload, Loader2, AlertCircle } from 'lucide-react';
import { orderService } from '../services/orderService';

const EditOrderPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        senderName: '',
        senderCity: '',
        senderPhone: '',
        senderResidenceNumber: '',
        reciverName: '',
        reciverRegion: '',
        reciverCity: '',
        reciverStreet: '',
        reciverPhone: '',
        productIamge: null
    });

    useEffect(() => {
        fetchOrderDetails();
    }, [id]);

    const fetchOrderDetails = async () => {
        try {
            const data = await orderService.getOrderById(id);
            setFormData({
                senderName: data.SenderName,
                senderCity: data.SenderCity,
                senderPhone: data.SenderPhone,
                senderResidenceNumber: data.SenderResidenceNumber,
                reciverName: data.ReciverName,
                reciverRegion: data.ReciverRegion,
                reciverCity: data.ReciverCity,
                reciverStreet: data.ReciverStreet,
                reciverPhone: data.ReciverPhone
            });
            setImagePreview(data.ProducImage);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                productIamge: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');

        try {
            await orderService.updateOrder(id, formData);
            navigate(`/orders/${id}`);
        } catch (err) {
            setError(err.message);
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-gold animate-spin" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6 px-4" dir="rtl">
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={() => navigate(`/orders/${id}`)}
                    className="text-gold hover:text-yellow-500"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold text-gold">تعديل الطلب #{id}</h1>
            </div>

            {error && (
                <div className="bg-red-600 text-white p-3 rounded-lg mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-4xl">
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gold mb-4">بيانات المرسل</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                اسم المرسل
                            </label>
                            <input
                                type="text"
                                name="senderName"
                                required
                                value={formData.senderName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                رقم الهاتف
                            </label>
                            <input
                                type="tel"
                                name="senderPhone"
                                required
                                value={formData.senderPhone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                المدينة
                            </label>
                            <input
                                type="text"
                                name="senderCity"
                                required
                                value={formData.senderCity}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                رقم السكن
                            </label>
                            <input
                                type="text"
                                name="senderResidenceNumber"
                                required
                                value={formData.senderResidenceNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gold mb-4">بيانات المستلم</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                اسم المستلم
                            </label>
                            <input
                                type="text"
                                name="reciverName"
                                required
                                value={formData.reciverName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                رقم الهاتف
                            </label>
                            <input
                                type="tel"
                                name="reciverPhone"
                                required
                                value={formData.reciverPhone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                المدينة
                            </label>
                            <input
                                type="text"
                                name="reciverCity"
                                required
                                value={formData.reciverCity}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                المنطقة
                            </label>
                            <input
                                type="text"
                                name="reciverRegion"
                                required
                                value={formData.reciverRegion}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                الشارع
                            </label>
                            <input
                                type="text"
                                name="reciverStreet"
                                value={formData.reciverStreet}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gold mb-4">صورة المنتج</h2>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6">
                        <input
                            type="file"
                            id="productImage"
                            name="productIamge"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        {imagePreview ? (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Product preview"
                                    className="max-w-xs rounded-lg mb-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setFormData(prev => ({ ...prev, productIamge: null }));
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                    ×
                                </button>
                            </div>
                        ) : (
                            <label
                                htmlFor="productImage"
                                className="flex flex-col items-center cursor-pointer"
                            >
                                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                                <span className="text-gray-400">تحديث صورة المنتج</span>
                                <span className="text-gray-500 text-sm">
                                    (PNG, JPG حتى 10MB)
                                </span>
                            </label>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(`/orders/${id}`)}
                        className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700"
                    >
                        إلغاء
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-gold text-black px-6 py-2 rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                جاري الحفظ...
                            </>
                        ) : (
                            'حفظ التغييرات'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditOrderPage;