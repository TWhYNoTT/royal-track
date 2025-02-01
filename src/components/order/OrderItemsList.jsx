import React from 'react';
import { Plus, ListPlus, CheckCircle, Loader2 } from 'lucide-react';

const OrderItemsList = ({
    items = [],
    status,
    onAddItem,
    onGenerateOtp,
    isConfirming
}) => (
    <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gold flex items-center gap-2">
                <ListPlus className="w-5 h-5" />
                المنتجات
            </h2>
            <button
                onClick={onAddItem}
                className="flex items-center gap-2 bg-gold text-black px-3 py-1 rounded-lg hover:bg-yellow-500 transition-colors"
            >
                <Plus className="w-4 h-4" />
                إضافة منتج
            </button>
        </div>

        {items.length === 0 ? (
            <p className="text-gray-400 text-center py-8">لا توجد منتجات مضافة</p>
        ) : (
            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.Id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-white">{item.ItemName}</h3>
                            <span className="text-sm text-gray-400">الكمية: {item.NumberItem}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-300">
                            <p>الوزن: {item.Wieght} كجم</p>
                            <p>تكلفة الوزن: {item.CostOfWieght} ريال</p>
                            {item.Note && <p>ملاحظات: {item.Note}</p>}
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Status and Actions */}
        <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-gray-300">حالة الطلب:</span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status === 'Confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {status === 'Confirmed' ? (
                            <>
                                <CheckCircle className="w-3 h-3" />
                                تم التأكيد
                            </>
                        ) : 'قيد الانتظار'}
                    </span>
                </div>
                {status !== 'Confirmed' && (
                    <button
                        onClick={onGenerateOtp}
                        disabled={isConfirming}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                        {isConfirming ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                جاري التأكيد...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                تأكيد الطلب
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    </div>
);

export default OrderItemsList;