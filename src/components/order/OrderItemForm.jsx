import React from 'react';
import { Loader2 } from 'lucide-react';

const OrderItemForm = ({ item, onSubmit, onCancel, isLoading }) => {
    const [formData, setFormData] = React.useState({
        itemName: '',
        numberItem: 1,
        wieght: 0,
        costOfWieght: 0,
        note: '',
        ...item
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? (name === 'numberItem' ? parseInt(value) : parseFloat(value)) : value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold text-gold mb-4">إضافة منتج جديد</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            اسم المنتج
                        </label>
                        <input
                            type="text"
                            name="itemName"
                            required
                            value={formData.itemName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            الكمية
                        </label>
                        <input
                            type="number"
                            name="numberItem"
                            required
                            min="1"
                            value={formData.numberItem}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            الوزن (كجم)
                        </label>
                        <input
                            type="number"
                            name="wieght"
                            required
                            step="0.1"
                            value={formData.wieght}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            تكلفة الوزن
                        </label>
                        <input
                            type="number"
                            name="costOfWieght"
                            required
                            step="0.1"
                            value={formData.costOfWieght}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            ملاحظات
                        </label>
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 px-4 py-2 bg-gold text-black rounded-lg hover:bg-yellow-500 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    جاري الإضافة...
                                </>
                            ) : (
                                'إضافة'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderItemForm;