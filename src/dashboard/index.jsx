import React, { useEffect, useState, useCallback } from "react";
import AddResume from "./components/AddResume";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { logout } from "../store/action/userAppStorage";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("ai");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resumeList, setResumeList] = useState([]);
  const { user } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await GlobalApi.GetUserResumes(user?.email);
      setResumeList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) GetResumesList();
  }, [user, GetResumesList]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex mt-0 min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`w-64 min-h-screen bg-blue-800 text-white ${
          sidebarOpen ? "block" : "hidden"
        } sm:block`}
      >
        <div className="flex justify-between items-center p-6 border-b border-blue-900">
          <button
            className="text-white sm:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>
        <nav className="flex flex-col px-4">
          <div className="flex shadow-lg justify-between items-center space-x-6 w-full px-4 py-4 mb-4">
            <FaUserCircle size={35} className="text-white" />
            <h6
              onClick={handleLogout}
              className="text-white py-2 px-6 rounded-lg transition duration-200"
            >
              {user.username}
            </h6>
          </div>
          <button
            onClick={() => {
              setActiveTab("myCVs");
              navigate("/cvs");
            }}
            className={`text-white py-3 px-4 rounded-md ${
              activeTab === "myCVs" ? "bg-blue-700" : "hover:bg-blue-700"
            } mb-2`}
          >
            My CVs
          </button>
          {/* Additional Sidebar Buttons */}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 pt-0">
        <div className="flex justify-between items-center mb-6 bg-white shadow-lg p-4">
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

        <div className="content">
          <div className="mt-20 p-10 md:px-20 lg:px-32">
            <h2 className="text-center font-bold text-3xl">Generate CVs with AI</h2>
            <p className="text-center">
              Start Creating AI resume to land your next Job role
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-10">
              <AddResume />
              {isLoading ? (
                [1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
                  ></div>
                ))
              ) : resumeList.length > 0 ? (
                resumeList.map((resume, index) => (
                  <ResumeCardItem
                    resume={resume}
                    key={index}
                    refreshData={GetResumesList}
                  />
                ))
              ) : (
                <p className="text-center col-span-full">No CVs found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
