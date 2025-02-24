import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, Package, Users, Menu, X, ChevronRight } from 'lucide-react';
import { logout } from '../store/authSlice';
import LoginPage from '../Pages/LoginPage';
import CreateOrderPage from '../Pages/CreateOrderPage';
import OrdersListPage from '../Pages/OrdersListPage';
import OrderDetailsPage from '../Pages/OrderDetailsPage';
import EditOrderPage from '../Pages/EditOrderPage';
import UsersListPage from '../Pages/UsersListPage';

const AppLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, userRole } = useSelector((state) => state.auth);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const menuItems = [
        {
            title: 'الطلبات',
            icon: <Package className="w-5 h-5" />,
            path: '/orders',
            roles: ['SuperAdmin', 'Admin']
        },
        {
            title: 'المستخدمين',
            icon: <Users className="w-5 h-5" />,
            path: '/users',
            roles: ['SuperAdmin']
        }
    ];

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="min-h-screen bg-dark">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:z-0 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside
                    className={`
                        fixed  w-64 h-full bg-gray-800 text-white 
                        transform transition-transform duration-300 ease-in-out z-50
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}
                >
                    <div className="flex flex-col h-full p-4">
                        {/* Close button */}
                        <button
                            className="absolute left-4 top-4 text-gray-400 hover:text-white"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Toggle sidebar button for larger screens */}
                        <button
                            className="absolute right-4 top-4 text-gray-400 hover:text-white"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Logo */}
                        <div className="flex justify-center mb-8 mt-8">
                            <img src="/logo.png" alt="Logo" className="h-12" />
                        </div>

                        {/* Navigation */}
                        <nav className="flex-grow space-y-2 mt-4">
                            {menuItems.map((item) => (
                                item.roles.includes(userRole) && (
                                    <button
                                        key={item.path}
                                        onClick={() => {
                                            navigate(item.path);
                                            setIsSidebarOpen(false);
                                        }}
                                        className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </button>
                                )
                            ))}
                        </nav>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 text-red-400 hover:bg-gray-700 rounded-lg transition-colors mt-auto"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>تسجيل الخروج</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Top Bar */}
                    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-gold hover:text-yellow-500 transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Conditionally render logo in header when sidebar is collapsed */}
                        <div className="flex items-center">
                            {!isSidebarOpen && (
                                <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
                            )}
                            <h1 className="text-xl font-bold text-gold">المسار الملكي للشحن</h1>
                        </div>

                        <div className="w-6"></div> {/* Spacer for centering */}
                    </header>

                    {/* Content Area */}
                    <main className="flex-1 overflow-auto">
                        <div className="container mx-auto p-6">
                            <Routes>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/" element={<Navigate to="/orders" />} />
                                <Route path="/orders" element={<OrdersListPage />} />
                                <Route path="/orders/new" element={<CreateOrderPage />} />
                                <Route path="/orders/:id" element={<OrderDetailsPage />} />
                                <Route path="/orders/edit/:id" element={<EditOrderPage />} />
                                <Route path="/users" element={<UsersListPage />} />
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AppLayout;