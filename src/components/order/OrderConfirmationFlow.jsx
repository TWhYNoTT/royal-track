import React from 'react';
import { CheckCircle, Loader2, Camera, Send, AlertCircle } from 'lucide-react';

// Enhanced OTP Modal with business process explanation
export const OtpConfirmationModal = ({ otp, onConfirm, onClose, isConfirming }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gold mb-4">تأكيد استلام الطلب</h3>

            {/* Process Explanation */}
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-gold mt-1" />
                    <p className="text-gray-300 text-sm">
                        يرجى اتباع الخطوات التالية:
                    </p>
                </div>
                <ol className="text-gray-300 text-sm space-y-2 mr-6 list-decimal">
                    <li>سيتم إرسال رسالة واتساب للعميل تحتوي على صورة الطلب ورمز التأكيد</li>
                    <li>اطلب من العميل التحقق من صورة الطلب</li>
                    <li>اطلب من العميل رمز التأكيد للتأكد من صحة الطلب</li>
                </ol>
            </div>

            {/* WhatsApp Status - For future implementation */}
            <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-3 mb-6">
                <div className="flex items-center gap-2 text-blue-400">
                    <Send className="w-4 h-4" />
                    <span className="text-sm">سيتم إرسال رسالة واتساب للعميل...</span>
                </div>
            </div>

            {/* OTP Display */}
            <div className="text-center mb-6">
                <p className="text-gray-300 mb-2">رمز التأكيد الخاص بالطلب:</p>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-3xl font-bold text-gold tracking-widest">{otp}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
                <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    إغلاق
                </button>
                <button
                    onClick={onConfirm}
                    disabled={isConfirming}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                    {isConfirming ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            جاري التأكيد...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="w-5 h-5" />
                            تأكيد
                        </>
                    )}
                </button>
            </div>
        </div>
    </div>
);

// Enhanced Confirmation Button with clear purpose
export const OrderConfirmationButton = ({ status, onGenerateOtp }) => {
    if (status === 'Confirmed') {
        return (
            <div className="flex items-center gap-2 text-green-500">
                <CheckCircle className="w-5 h-5" />
                <span>تم تأكيد الطلب</span>
            </div>
        );
    }

    return (
        <button
            onClick={onGenerateOtp}
            className="flex items-center gap-2 bg-gold text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
        >
            <Camera className="w-5 h-5" />
            <span>تأكيد استلام الطلب</span>
        </button>
    );
};

// Enhanced Order Image Section
export const OrderImageSection = ({ imageUrl, status }) => (
    <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gold flex items-center gap-2">
                <Camera className="w-5 h-5" />
                صورة الطلب
            </h2>
            {status === 'Confirmed' && (
                <span className="text-sm text-green-500 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    تم التحقق من قبل العميل
                </span>
            )}
        </div>
        <div className="relative">
            <img
                src={imageUrl}
                alt="Order"
                className="w-full rounded-lg"
            />
            {status !== 'Confirmed' && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 px-4 py-2 rounded-lg text-sm text-gray-300">
                        في انتظار تأكيد العميل
                    </div>
                </div>
            )}
        </div>
        <p className="mt-2 text-sm text-gray-400">
            {status === 'Confirmed'
                ? 'تم التحقق من صحة الطلب من قبل العميل'
                : 'سيتم إرسال الصورة للعميل للتحقق'}
        </p>
    </div>
);