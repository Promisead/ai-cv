import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
// import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/action/userAppStorage";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userAuth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    if (!user) {
      navigate('/Login'); // Redirect to login page if user is not found
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/Login");
  };

  return (
    <div className="flex-1 sm:px-4">

<div className=" flex  justify-between items-center mb-6 bg-white shadow-lg p-4">
            <div className="flex items-center justify-between space-x-6 w-full px-4">
              <Link to={"/cvs"}>
                <Button className="text-white bg-[#3A60D0]">Dashboard</Button>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Logout
              </button>
            </div>

            <button
              className="sm:hidden text-white bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
          </div>
    
 
</div>

  );
}

export default Header;



