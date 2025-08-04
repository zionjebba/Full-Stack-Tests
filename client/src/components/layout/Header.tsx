import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Navigation from "./Navigation";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    return user.role === "farmer" ? "/farmer/dashboard" : "/";
  };

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-bold text-white">🌾 FarmDirect</h1>
            </Link>
            <Navigation />
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()}>
                  <Button
                    variant="ghost"
                    className="text-white/90 hover:text-white hover:bg-white/10"
                  >
                    {user?.role === "farmer" ? "Dashboard" : "Home"}
                  </Button>
                </Link>
                <span className="text-white/70 text-sm">{user?.name}</span>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-white/90 hover:text-white hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button
                    variant="ghost"
                    className="text-white/90 hover:text-white hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-green-500 hover:bg-green-600 text-black font-medium">
                    <span className="hidden sm:inline">Join as Farmer</span>
                    <span className="sm:hidden">Join</span>
                    <ArrowRight className="ml-1 sm:ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
