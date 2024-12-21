import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/action/userAppStorage";
import Modal from "../components/Modal/Modal";
import Loader from "../components/loader";
import cv1 from "../assets/cv1.jpg";
import cv2 from "../assets/cv2.webp";
import cv3 from "../assets/cv3.jpg";
import cv4 from "../assets/cv4.jpg";
import cv5 from "../assets/cv5.jpg";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button'



const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isErrorInfo, setIsErrorInfo] = useState("");
  let { user } = useSelector((state) => state.userAuth);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);
  // Update the templates to use imported images
  const templates = [
    { src: cv1, alt: "CV Template 1", id: "template1" },
    { src: cv2, alt: "CV Template 2", id: "template2" },
    { src: cv3, alt: "CV Template 3", id: "template3" },
    { src: cv4, alt: "CV Template 4", id: "template4" },
    { src: cv5, alt: "CV Template 5", id: "template5" },
  ];

  const totalPages = Math.ceil(templates.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages - 1 ? prevPage + 1 : totalPages - 1
    );
  };

  const navigateHandler = (id) => {
    navigate(`/form/${id}`);
  };

  let dashboardUrl = "";

  return (
    <>
      {isLoading && <Loader />}
      {isError && (
        <Modal content={isErrorInfo} closeModal={() => setIsError(false)} />
      )}
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

          <section className="templates-section p-6 bg-gray-50 mt-32">
            <p className="intro-text text-lg md:text-xl text-gray-700 font-medium text-center mb-6">
              A great job application leads to a good interview. An amazing resume is what makes it all possible. Here are the Best Templates for you to choose from.
            </p>
            <div className="pagination flex justify-center gap-4 mb-6">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 0}
                className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition`}
              >
                Next
              </button>
            </div>
            <div className="templates-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates
                .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                .map((template) => (
                  <div
                    key={template.id}
                    className="template-card bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
                    onClick={() => navigateHandler(template.id)}
                  >
                    <img
                      src={template.src}
                      alt={template.alt}
                      className="template-img w-full h-48 object-cover"
                    />
                    <h5 className="text-center text-gray-800 text-lg font-semibold py-4">
                      {template.alt}
                    </h5>
                  </div>
                ))}
            </div>
          </section>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
