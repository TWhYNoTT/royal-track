import React from 'react';
import { User, Phone, MapPin, Home, Package } from 'lucide-react';

export const SenderInfo = ({ sender }) => (
    <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gold flex items-center gap-2 mb-4">
            <User className="w-5 h-5" />
            بيانات المرسل
        </h2>
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-300">
                <User className="w-4 h-4" />
                <span>الاسم: {sender?.SenderName}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>الهاتف: {sender?.SenderPhone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>المدينة: {sender?.SenderCity}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
                <Home className="w-4 h-4" />
                <span>رقم السكن: {sender?.SenderResidenceNumber}</span>
            </div>
        </div>
    </div>
);

export const ReceiverInfo = ({ receiver }) => (
    <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gold flex items-center gap-2 mb-4">
            <User className="w-5 h-5" />
            بيانات المستلم
        </h2>
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-300">
                <User className="w-4 h-4" />
                <span>الاسم: {receiver?.ReciverName}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>الهاتف: {receiver?.ReciverPhone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>المدينة: {receiver?.ReciverCity}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>المنطقة: {receiver?.ReciverRegion}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>الشارع: {receiver?.ReciverStreet}</span>
            </div>
        </div>
    </div>
);

export const OrderImageSection = ({ imageUrl, status }) => (
    <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gold flex items-center gap-2 mb-4">
            <Package className="w-5 h-5" />
            صورة المنتج
        </h2>
        {imageUrl ? (
            <img
                src={imageUrl}
                alt="Product"
                className="w-full rounded-lg"
            />
        ) : (
            <div className="text-gray-400 text-center py-4">
                لا توجد صورة للمنتج
            </div>
        )}
    </div>
);