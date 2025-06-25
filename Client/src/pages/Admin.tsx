import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminDashboard } from "@/components/AdminDashboard";
import { RootState, AppDispatch } from "@/redux/store/store";
import { loginUser, logoutUser } from "@/redux/slices/authSlice";
import { Toaster, toast } from "sonner";

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
      <>
        <Toaster richColors />
        <AdminLogin onLogin={handleLogin} />
      </>
    );
  }

  return (
    <div>
      <Toaster richColors />
      <AdminDashboard />
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Admin;
