import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminDashboard } from "@/components/AdminDashboard";
import { RootState, AppDispatch } from "@/redux/store/store";
import { loginUser, logoutUser } from "@/redux/slices/authSlice";
import { Toaster, toast } from "sonner";
import { LogOut } from 'lucide-react';

const Admin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, error, user } = useSelector((state: RootState) => state.auth);

  const handleLogin = (credentials: { email: string; password: string }) => {
    dispatch(loginUser(credentials));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (error) {
      toast.error((error as any)?.message || "Invalid credentials provided.");
    }
    if (isAuthenticated && user) {
      toast.success(`Welcome back, ${(user as any)?.name}!`);
      navigate("/admin");
    }
  }, [error, isAuthenticated, user, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Toaster richColors position="top-right" />
        <AdminLogin onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Toaster richColors position="top-right" />

      {/* Enhanced Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-red-400/20"
      >
        <LogOut className="h-4 w-4" />
        <span className="font-medium">Logout</span>
      </button>

      <AdminDashboard />
    </div>
  );
};

export default Admin;
