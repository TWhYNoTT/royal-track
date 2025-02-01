import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Search,
    Eye,
    Edit2,
    Trash2,
    CheckCircle,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { orderService } from '../services/orderService';

const OrdersListPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await orderService.getAllOrders();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
            try {
                await orderService.deleteOrder(id);
                setOrders(orders.filter(order => order.Id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const filteredOrders = orders.filter(order =>
        (order.SenderName?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        (order.ReciverName?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        (order.SenderPhone?.includes(searchQuery) || false) ||
        (order.ReciverPhone?.includes(searchQuery) || false)
    );

    return (
        <div className="container mx-auto py-6" dir="rtl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gold">إدارة الطلبات</h1>
                <button
                    onClick={() => navigate('/orders/new')}
                    className="flex items-center gap-2 bg-gold text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>طلب جديد</span>
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="بحث عن طلب..."
                    className="w-full pl-4 pr-10 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {error && (
                <div className="bg-red-600 text-white p-3 rounded-lg mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 text-gold animate-spin" />
                </div>
            ) : (
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        المرسل
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        المستلم
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        المدينة
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        الحالة
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredOrders.map((order) => (
                                    <tr key={order.Id} className="hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-white">{order.SenderName}</div>
                                                <div className="text-sm text-gray-400">{order.SenderPhone}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-white">{order.ReciverName}</div>
                                                <div className="text-sm text-gray-400">{order.ReciverPhone}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-white">{order.ReciverCity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${order.Status === 'Confirmed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {order.Status === 'Confirmed' ? (
                                                    <>
                                                        <CheckCircle className="w-3 h-3" />
                                                        تم التأكيد
                                                    </>
                                                ) : (
                                                    'قيد الانتظار'
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => navigate(`/orders/${order.Id}`)}
                                                    className="text-blue-400 hover:text-blue-300"
                                                    title="عرض التفاصيل"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/orders/edit/${order.Id}`)}
                                                    className="text-yellow-400 hover:text-yellow-300"
                                                    title="تعديل"
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(order.Id)}
                                                    className="text-red-400 hover:text-red-300"
                                                    title="حذف"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersListPage;