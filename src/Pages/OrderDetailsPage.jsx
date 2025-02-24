import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle, Loader2, Printer } from 'lucide-react';
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
    }, [id, setOrder, setError, setIsLoading]);

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

    const handlePrint = useCallback(() => {
        const printWindow = window.open('', '_blank');
        const printContent = document.getElementById('print-area').innerHTML;

        printWindow.document.write(`
            <html dir="rtl">
                <head>
                    <title>طباعة الفاتورة - ${id}</title>
                    <style>
                        @page {
                            size: A4;
                            margin: 0.5cm;
                        }
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            direction: rtl;
                        }
                        .print-container {
                            width: 100%;
                            max-width: 21cm;
                            margin: 0 auto;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        table, th, td {
                            border: 1px solid #000;
                        }
                        th, td {
                            padding: 5px;
                            text-align: right;
                        }
                        .header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 10px;
                        }
                        .header-right {
                            text-align: right;
                        }
                        .header-left {
                            text-align: left;
                        }
                        .header-center {
                            text-align: center;
                            border: 1px solid #000;
                            padding: 5px 15px;
                            font-weight: bold;
                        }
                        .info-box {
                            border: 1px solid #000;
                            padding: 5px;
                            margin-bottom: 10px;
                        }
                        .info-item {
                            display: flex;
                        }
                        .info-label {
                            font-weight: bold;
                            margin-left: 5px;
                        }
                        .info-value {
                            flex-grow: 1;
                        }
                        .disclaimer {
                            font-size: 8pt;
                            margin-top: 10px;
                        }
                        .disclaimer ol {
                            margin: 0;
                            padding-right: 20px;
                        }
                        .disclaimer li {
                            margin-bottom: 2px;
                        }
                        .empty-row {
                            height: 20px;
                        }
                        .bill-number {
                            color: #d35400;
                            font-weight: bold;
                            font-size: 16pt;
                        }
                        .footer-section {
                            display: flex;
                            justify-content: space-between;
                            margin-top: 10px;
                        }
                        .footer-item {
                            width: 24%;
                            text-align: center;
                        }
                        .footer-label {
                            font-weight: bold;
                            margin-bottom: 5px;
                        }
                        .footer-value {
                            border-bottom: 1px solid #000;
                            height: 25px;
                        }
                    </style>
                </head>
                <body>
                    <div class="print-container">${printContent}</div>
                    <script>
                        window.onload = function() {
                            setTimeout(function() {
                                window.print();
                                window.close();
                            }, 500);
                        };
                    </script>
                </body>
            </html>
        `);

        printWindow.document.close();
    }, [id]);

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

    const formatDate = () => {
        const date = new Date();
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

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
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 ml-4"
                >
                    <Printer className="w-5 h-5" />
                    <span>طباعة الفاتورة</span>
                </button>
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

            {/* Printable Bill Area (hidden until print) */}
            <div id="print-area" style={{ display: 'none' }}>
                {/* Header */}
                <div className="header">
                    <div className="header-right" style={{ width: '33%' }}>
                        <div style={{ marginBottom: '5px' }}>
                            <div><strong>Ashqar</strong></div>
                            <div><strong>Maritime Transport Services</strong></div>
                        </div>
                        <div>
                            <div>Kingdom of Saudi Arabia</div>
                            <div>Mob: 0561497070</div>
                            <div>Mob: 0566252760</div>
                        </div>
                    </div>

                    <div className="header-center" style={{ width: '33%' }}>
                        <div>بوليصة شحن</div>
                        <div>جـــــــــدة</div>
                    </div>

                    <div className="header-left" style={{ width: '33%', textAlign: 'right' }}>
                        <div>
                            <div><strong>خدمات النقل البحري</strong></div>
                        </div>
                        <div>
                            <div>المملكة العربية السعودية &nbsp; جمهورية مصر العربية</div>
                            <div>جوال : ٠٥٦١٤٩٧٠٧٠ &nbsp; جوال : ٠١٠٨٠٠٣٠٠٨٩</div>
                            <div>جوال : ٠٥٦٦٢٥٢٧٦٠ &nbsp; جوال : ٠١٠٢٢٨٦٦٦٦٠</div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flexGrow: 1 }}></div>
                    <div style={{ textAlign: 'center' }}>
                        <span className="bill-number">{order.Id || id || '5400'}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        التاريخ: {formatDate()}
                    </div>
                </div>

                {/* Sender Info */}
                <div className="info-box">
                    <div className="info-item">
                        <span className="info-label">المرسل:</span>
                        <span className="info-value">{order.SenderName}</span>
                        <span className="info-label">المدينة:</span>
                        <span className="info-value">{order.SenderCity}</span>
                        <span className="info-label">الهاتف:</span>
                        <span className="info-value">{order.SenderPhone}</span>
                        <span className="info-label">رقم الإثبات:</span>
                        <span className="info-value">{order.SenderResidenceNumber || ''}</span>
                    </div>
                </div>

                {/* Receiver Info */}
                <div className="info-box">
                    <div className="info-item">
                        <span className="info-label">المستلم:</span>
                        <span className="info-value">{order.ReciverName}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">المحافظة:</span>
                        <span className="info-value">{order.ReciverRegion}</span>
                        <span className="info-label">المدينة:</span>
                        <span className="info-value">{order.ReciverCity}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">الشارع:</span>
                        <span className="info-value">{order.ReciverStreet}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">تليفون:</span>
                        <span className="info-value">{order.ReciverPhone} - {order.ReciverPhone}</span>
                    </div>
                </div>

                {/* Items Table */}
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>#</th>
                            <th style={{ width: '40%' }}>البيـــــــــــــان</th>
                            <th style={{ width: '10%' }}>العدد</th>
                            <th style={{ width: '10%' }}>الوزن</th>
                            <th style={{ width: '10%' }}>قيمة الوزن</th>
                            <th style={{ width: '15%' }}>الإجمالي</th>
                            <th style={{ width: '10%' }}>ملاحظات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.Items && order.Items.map((item, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                <td>{item.ItemName}</td>
                                <td style={{ textAlign: 'center' }}>{item.NumberItem || 1}</td>
                                <td style={{ textAlign: 'center' }}>{item.Wieght || ''}</td>
                                <td style={{ textAlign: 'center' }}>{item.CostOfWieght || ''}</td>
                                <td style={{ textAlign: 'center' }}>{item.CostOfWieght || ''}</td>
                                <td style={{ textAlign: 'center' }}>{item.ItemName || ''}</td>
                            </tr>
                        ))}
                        {/* Fill empty rows to match the form in the image */}
                        {Array.from({ length: Math.max(0, 15 - (order.Items?.length || 0)) }).map((_, index) => (
                            <tr key={`empty-${index}`} className="empty-row">
                                <td style={{ textAlign: 'center' }}>{(order.Items?.length || 0) + index + 1}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Footer with payment info */}
                <div className="footer-section">
                    <div className="footer-item">
                        <div className="footer-label">المدفوع</div>
                        <div className="footer-value">
                            {order.PaidAmount || ''}
                        </div>
                    </div>
                    <div className="footer-item">
                        <div className="footer-label">المتبقي</div>
                        <div className="footer-value">
                            {(order.Items?.reduce((sum, item) => sum + (parseFloat(item.Price) || 0), 0) || 0) - (order.PaidAmount || 0)}
                        </div>
                    </div>
                    <div className="footer-item">
                        <div className="footer-label">المستلم</div>
                        <div className="footer-value"></div>
                    </div>
                    <div className="footer-item">
                        <div className="footer-label">المسؤول</div>
                        <div className="footer-value"></div>
                    </div>
                </div>

                {/* Terms and conditions */}
                <div className="disclaimer">
                    <div><strong>شروط النقل:</strong></div>
                    <ol>
                        <li>الشركة غير مسؤولة عن محتويات أي ممنوعات أو مخدرات نظامية أو غير نظامية والمسؤولية تقع على عاتق المرسل.</li>
                        <li>الشركة غير مسؤولة عن الأشياء الثمينة إلا في حال الإبلاغ عنها وتأمينها إن تم ذلك.</li>
                        <li>الشركة غير مسؤولة عن الأشياء القابلة للكسر إلا في حال تغليفها بشكل جيد من قبل العميل.</li>
                        <li>الشركة غير مسؤولة في حالة الأجهزة الكهربائية عن أي كسر أو عطل داخلي إلا بعد فتح وفحص الجهاز للتأمين.</li>
                        <li>الشركة غير مسؤولة عن أي تأخير يحدث لأي سبب خارج عن إرادتها.</li>
                        <li>يتم تخزين الشحنة حتى 15 يوم بدون رسوم إضافية.</li>
                        <li>لا يحق للعميل المطالبة بالشحنة بعد مرور 30 يوم من تاريخ الإعلام.</li>
                        <li>يتم تسليم الشحنة خلال 15 يوم من تاريخ استلام الشحنة.</li>
                    </ol>
                </div>
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