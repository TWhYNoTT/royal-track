import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './Pages/LoginPage';
import AppLayout from './components/AppLayout';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {isAuthenticated ? (
        <Route path="/*" element={<AppLayout />} />
      ) : (
        <Route path="/*" element={<LoginPage />} />
      )}
    </Routes>
  );
}

export default App;