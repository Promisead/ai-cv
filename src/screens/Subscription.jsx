import React, { useState, useEffect } from 'react';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { VerifySubscription, initiatePlan } from '@/store/action/userAppStorage';
import { FaUserCircle } from 'react-icons/fa';
import { Button } from '../components/ui/button'


const CreatePlan = () => {
  const [name, setName] = useState('');
  const [interval, setInterval] = useState('monthly');
  const [amount, setAmount] = useState('1000');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorInfo, setIsErrorInfo] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isReference, setIsReference] = useState('')
  const [activeTab, setActiveTab] = useState('pricing');
  const { user } = useSelector(state => state.userAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reference = localStorage.getItem('payment_reference');

  const checkUserIsBack = async () => {
    setIsLoading(true);
    let response = await dispatch(VerifySubscription(reference));

    if (!response.bool) {
      setIsLoading(false);
      setIsError(true);
      setIsErrorInfo(response.message);
      return localStorage.removeItem('payment_reference');
    }
    setIsLoading(false);
    setIsError(true);
    setIsErrorInfo(response.message);
    localStorage.removeItem('payment_reference');

    // Navigate to plan page after 5 seconds
    setTimeout(() => {
      navigate('/pricing');
    }, 5000);
  };

  useEffect(() => {
    if (reference) {
      checkUserIsBack();
    }
  }, []);

  const { id } = useParams();
  useEffect(() => {
    if (!user) {
      return navigate('/login'); // Redirect to login page if user is not found
    }
    setName(id);
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let response = await dispatch(initiatePlan({
      email: 'arierhiprecious@gmail.com',
      plan: 'PLN_eoadawpomssgue7',
      amount: amount,
      subscriptionType: name
    }));

    if (!response.bool) {
      setIsLoading(false);
      setIsError(true);
      setIsErrorInfo(response.message);
      return;
    }
  };

  const handleLogout = async () => {
    await dispatch(logout())
    navigate('/login')
  };


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
        {/* Header */}

        <div className="flex-1 p-3 pt-0">
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

          <div className="content">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full">
              <div className="mb-4">
                <label htmlFor="name" className="text-sm font-semibold text-gray-600">Plan Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter the plan name"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="amount" className="text-sm font-semibold text-gray-600">Amount to Charge</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter the amount"
                  required
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Create Plan
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default CreatePlan;



