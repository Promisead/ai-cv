import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Modal from '../components/Modal/Modal'; // Ensure correct import path
import Loader from "../components/loader"; // Ensure correct import path
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/action/userAppStorage';
import { FaUserCircle } from 'react-icons/fa';
import { Button } from '../components/ui/button'






const PricingPlan = () => {
    const [activeTab, setActiveTab] = useState('pricing');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const navigate = useNavigate();
    const { user } = useSelector(state => state.userAuth);
    let dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            navigate('/login'); // Redirect to login page if user is not found
        }
        if (user.paymentPlan) {
            setIsError(true)
            setIsErrorInfo(`your current plan is ${user.paymentPlan}`)
        }
    }, [user, navigate]);

    const handleLogout = async () => {
        await dispatch(logout())
        navigate('/login')
    };



    const handleTabChange = (tab, path) => {
        setActiveTab(tab);
        navigate(path);
    };

    const navigateHandler = (id) => {
        navigate(`/subscription/${id}`)
    }


    const renderContent = () => (
        <main className="bg-gray-100 p-8 rounded-lg">
            <h2 className="mb-8  text-2xl font-extrabold text-blue-600">Choose Your Plan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { title: 'Basic', price: '$10/month', description: 'Perfect for individuals starting out.', btnColor: 'bg-blue-500 hover:bg-blue-700' },
                    { title: 'Standard', price: '$20/month', description: 'Ideal for small teams with extra features.', btnColor: 'bg-green-500 hover:bg-green-700' },
                    { title: 'Premium', price: '$30/month', description: 'Best for larger organizations.', btnColor: 'bg-yellow-500 hover:bg-yellow-700' },
                ].map((plan, index) => (
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center" key={index} style={{ backgroundColor: 'rgb(244,244,244)' }}>
                        <h5 className="text-2xl font-semibold text-gray-800 mb-4">{plan.title}</h5>
                        <h6 className="text-lg text-gray-500 mb-4 font-semibold">{plan.price}</h6>
                        <p className="text-gray-600 mb-6">{plan.description}</p>
                        <button className={`bg-blue-700 text-white px-6 py-3 rounded-full font-semibold`} onClick={() => navigateHandler(plan.title)}>
                            Choose Plan
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );


    return (
        <>
            {isLoading && <Loader />} {/* Loader Component */}
            {isError && <Modal content={isErrorInfo} closeModal={() => setIsError(false)} />} {/* Modal for Error */}
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

                    <div className="content">
                        {renderContent()}
                    </div>
                </div>
            </div>

        </>
    );
};

export default PricingPlan;
