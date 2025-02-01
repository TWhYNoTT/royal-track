import React from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

const OtpModal = ({ otp, onConfirm, onClose, isConfirming }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gold mb-4">تأكيد الطلب</h3>
            <p className="text-gray-300 mb-4">
                رمز التأكيد الخاص بالطلب:
            </p>
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
                <p className="text-2xl font-bold text-center text-gold tracking-widest">
                    {otp}
                </p>
            </div>
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

export default OtpModal;