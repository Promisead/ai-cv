import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaFileAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCv, logout, openCv } from '../store/action/userAppStorage';
import { Button } from '../components/ui/button'


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('myCVs');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userCVs, setUserCVs] = useState([]);
  const [isErrorInfo, setIsErrorInfo] = useState('');

  let { user } = useSelector(state => state.userAuth);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
      if (!user) {
        console.log(user);
        navigate('/login');
      }
      setIsLoading(false);
    }, 100000);
  }, [user, navigate]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const fetchHandler = async () => {
    try {
      let response = await dispatch(fetchCv(user._id));
      if (!response.bool) {
        throw new Error(response.message);
      }
      setUserCVs(response.message);
    } catch (error) {
      setIsError(true);
      setIsErrorInfo(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateHandler =(cv) => {
    dispatch(openCv(cv));
    navigate(`/preview/${cv.cvTemplateType}`);
   
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const renderCVs = () => {
    if (isError) {
      return (
        <div className="container mt-10 text-center">
          <h2 className="text-2xl font-semibold text-red-600">Error Loading CVs</h2>
          <p className="text-gray-700">{isErrorInfo}</p>
          <p className="text-gray-500 mt-4">Please try refreshing the page or contact support if the issue persists.</p>
        </div>
      );
    }

    if (userCVs.length === 0) {
      return (
        <div className="container mt-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">No CVs Available</h2>
          <p className="text-gray-600 mt-4">It looks like you haven't uploaded any CVs yet.</p>
          <p className="text-gray-500 mt-4">Get started by adding your CV today!</p>
        </div>
      );
    }

    return userCVs.map((cv) => (
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-6" key={cv._id}>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden transition transform hover:scale-105">
          <div className="p-6">
            <FaFileAlt size={40} className="text-primary mb-3" />
            <h5 className="font-semibold text-xl mb-3 text-gray-900">{cv.title}</h5>
            <p className="text-gray-600 text-sm mb-3"><small>Created on: {cv.createdAt}</small></p>
            <button onClick={() => navigateHandler(cv)} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
              View CV
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Modal content={isErrorInfo} closeModal={() => setIsError(false)} />}
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
            <div className=" flex shadow-lg justify-between items-center space-x-6 w-full px-4 py-4 mb-4">
              <FaUserCircle size={35} className="text-white" />
              <h6
                onClick={handleLogout}
                className="  text-white py-2 px-6 rounded-lg  transition duration-200"
              >
                {user.username}
              </h6>
            </div>
            <button
              onClick={() => {
                setActiveTab("myCVs");
                navigate("/cvs");
              }}
              className={`text-white  py-3 px-4 rounded-md ${
                activeTab === "myCVs" ? "bg-blue-700" : "hover:bg-blue-700"
              } mb-2`}
            >
              My CVs
            </button>
            <button
              onClick={() => {
                setActiveTab("ai");
                navigate("/ai");
              }}
              className={`text-white py-3 px-4 rounded-md ${
                activeTab === "ai" ? "bg-blue-700" : "hover:bg-blue-700"
              } mb-2`}
            >
              Crea8 with AI
            </button>

            <button
              onClick={() => {
                setActiveTab("templates");
                navigate("/template");
              }}
              className={`text-white py-3 px-4 rounded-md ${
                activeTab === "templates" ? "bg-blue-700" : "hover:bg-blue-700"
              } mb-2`}
            >
              Templates
            </button>
            <button
              onClick={() => {
                setActiveTab("profileSettings");
                navigate("/profilesetting");
              }}
              className={`text-white py-3 px-4 rounded-md ${
                activeTab === "profileSettings"
                  ? "bg-blue-700"
                  : "hover:bg-blue-700"
              } mb-2`}
            >
              Profile Settings
            </button>
            <button
              onClick={() => {
                setActiveTab("pricing");
                navigate("/pricing");
              }}
              className={`text-white py-3 px-4 rounded-md ${
                activeTab === "pricing" ? "bg-blue-700" : "hover:bg-blue-700"
              } mb-2`}
            >
              Pricing Plans
            </button>
            <button
              onClick={handleLogout}
              className="text-white py-3 px-4 rounded-md hover:bg-blue-700 mb-2"
            >
              Logout
            </button>
          </nav>
        </div>
        {/* Main Content */}
        {/* Header */}

        <div className="flex-1 p-3 pt-0" >
                    <div className="flex justify-between items-center mb-6 bg-white shadow-lg p-4">
                        <div className="flex items-center justify-between space-x-6 w-full px-4">
                        <Link to={"/cvs"} >
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
            <div className="content  ">
              <h2 className="pt-5 p-3 text-2xl font-semibold py-8 text-gray-800 mb-6">Created CVs</h2>
              <div className="flex flex-wrap gap-6">{renderCVs()}</div>
            </div>
         
        </div>

      </div>
    </>
  );
};

export default Dashboard;







