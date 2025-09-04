import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Public Pages
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

// Member Pages
import Dashboard from './pages/Dashboard';
import AvailablePlans from './pages/AvailablePlans'; // ✅ Imported here

// Admin Layout
import AdminDashboard from './pages/admin/AdminDashboard';

// Admin Nested Routes
import AdminHome from './pages/admin/AdminHome';
import Members from './pages/admin/Members';
import ViewMembers from './pages/admin/ViewMembers';
import AdminSettings from './pages/admin/AdminSettings';
import Coaches from './pages/admin/Coaches';
 import Plans from "./pages/admin/AdminPlans";
import Payments from './pages/admin/Payments';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute';
import SupplementStore from './pages/admin/SupplementStore';
import DietDetails from './pages/admin/DietPlans';
import Notifications from './pages/admin/NotificationAssign';
import MemberNotifications from "./pages/member/Notifications";
import MemberBills from "./pages/member/MemberBills";
import SupplementsPage from './pages/SupplementsPage';
import DietsPage from './pages/DietsPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/supplements" element={<SupplementsPage />} />
           <Route path="/diets" element={<DietsPage/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Member Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['member']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ✅ Member Plans Page Route */}
          <Route
            path="/plans"
            element={
              <ProtectedRoute allowedRoles={['member']}>
                <AvailablePlans />
              </ProtectedRoute>
            }
          />


<Route
  path="/member/bills"
  element={
    <ProtectedRoute allowedRoles={['member']}>
      <MemberBills />
    </ProtectedRoute>
  }
/>


          {/* Admin Dashboard with Nested Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
         >
  <Route index element={<AdminHome />} />
  <Route path="members" element={<Members />} />
  <Route path="members/view" element={<ViewMembers />} />
  <Route path="coaches" element={<Coaches />} />
  <Route path="plans" element={<Plans />} />
  <Route path="payments" element={<Payments />} />
  <Route path="settings" element={<AdminSettings />} />
  <Route path="supplements" element={<SupplementStore />} />
  <Route path="notifications" element={<Notifications />} />
  <Route path="diet-details" element={<DietDetails />} />
</Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-center" autoClose={3000} pauseOnHover theme="dark" />
    </>
  );
}

export default App;
