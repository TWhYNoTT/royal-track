import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { orderService } from '../services/orderService';
import { SenderInfo, ReceiverInfo } from '../components/order/OrderInfoSection';
import OrderItemsList from '../components/order/OrderItemsList';
import OrderItemForm from '../components/order/OrderItemForm';
import {
    OtpConfirmationModal,
    OrderConfirmationButton,
    OrderImageSection
} from '../components/order/OrderConfirmationFlow';

const OrderDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddItem, setShowAddItem] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [otp, setOtp] = useState('');
    const [isAddingItem, setIsAddingItem] = useState(false);

    const fetchOrderDetails = useCallback(async () => {
        try {
            const data = await orderService.getOrderById(id);
            setOrder(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [id, setOrder, setError, setIsLoading]);  // Include all dependencies

    useEffect(() => {
        fetchOrderDetails();
    }, [fetchOrderDetails]);

    const handleAddItem = async (itemData) => {
        setIsAddingItem(true);
        try {
            await orderService.addOrderItem(id, itemData);
            setShowAddItem(false);
            await fetchOrderDetails(); // Refresh order details to show new item
        } catch (err) {
            setError(err.message);
        } finally {
            setIsAddingItem(false);
        }
    };

    const handleGenerateOtp = async () => {
        try {
            const response = await orderService.generateOtp(id);
            setOtp(response.OTP);
            setShowOtpModal(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleConfirmOrder = async () => {
        setIsConfirming(true);
        try {
            await orderService.confirmOrder({
                OrderId: id,
                Code: otp
            });
            setShowOtpModal(false);
            await fetchOrderDetails();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsConfirming(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-gold animate-spin" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="container mx-auto py-6 px-4">
                <div className="text-center text-red-500">لم يتم العثور على الطلب</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6 px-4" dir="rtl">
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={() => navigate('/orders')}
                    className="text-gold hover:text-yellow-500"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold text-gold">تفاصيل الطلب #{id}</h1>
                <div className="flex-grow" />
                <OrderConfirmationButton
                    status={order.Status}
                    onGenerateOtp={handleGenerateOtp}
                />
            </div>

            {error && (
                <div className="bg-red-600 text-white p-3 rounded-lg mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Order Info */}
                <div className="space-y-6">
                    <OrderImageSection
                        imageUrl={order.ProducImage}
                        status={order.Status}
                    />
                    <SenderInfo sender={order} />
                    <ReceiverInfo receiver={order} />
                </div>

                {/* Items List */}
                <OrderItemsList
                    items={order.Items}
                    status={order.Status}
                    onAddItem={() => setShowAddItem(true)}
                />
            </div>

            {/* Modals */}
            {showAddItem && (
                <OrderItemForm
                    onSubmit={handleAddItem}
                    onCancel={() => setShowAddItem(false)}
                    isLoading={isAddingItem}
                />
            )}

            {showOtpModal && (
                <OtpConfirmationModal
                    otp={otp}
                    onConfirm={handleConfirmOrder}
                    onClose={() => setShowOtpModal(false)}
                    isConfirming={isConfirming}
                />
            )}
        </div>
    );
};

export default OrderDetailsPage;