import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Heart, Home, LogIn, LogOut, User } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
          Recipe<span className="text-orange-500">Finder</span>
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-orange-500 font-medium transition">
            <Home size={20} /> <span className="hidden sm:inline">Home</span>
          </Link>
          <Link to="/favorites" className="flex items-center gap-1 text-gray-600 hover:text-red-500 font-medium transition">
            <Heart size={20} /> <span className="hidden sm:inline">Favorites</span>
          </Link>

          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 border border-orange-200">
                  <User size={18} />
                </div>
                <span className="text-sm font-semibold text-gray-700 hidden md:block">
                  {user.email.split("@")[0]}
                </span>
              </div>
              <button onClick={handleLogout} className="text-gray-500 hover:text-red-600" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition shadow-md">
               <LogIn size={18} /> <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;