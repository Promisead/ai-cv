import Header from '@/components/custom/Header'
//import { UserButton, useUser } from '@clerk/clerk-react'
import { AtomIcon, Edit, Share2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

function Home() {
 // const { isSignedIn } = useUser();
  const dashboardUrl = import.meta.env.VITE_BASE_URL2;

  const dispatch = useDispatch();
  const navigate = useNavigate();
 // const dispatch = useDispatch();
  let { user } = useSelector(state => state.userAuth);

  /* useEffect(() => {
    if (!user) {
      navigate('/Login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await dispatch( logout())
    navigate('/login')
  }; */

  return (
    <div className='mt-20'>
     
      <div className="flex justify-center  items-center py-16 px-4 w-full">
        <section className="max-w-2xl w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Build <span className="text-primary">With AI</span>
          </h1>
          <p className="mb-8 text-lg text-gray-500 lg:text-xl dark:text-gray-400">
            Craft a Standout CV with Our AI-Powered Builder
          </p>

    
        

<div className="flex flex-col lg:flex-row justify-center gap-4">
  <a onClick={() => {
                window.location.href = {dashboardUrl};
              }}

    className="inline-flex items-center cursor-pointer justify-center px-5 py-3 text-base font-medium text-gray-900 bg-white border border-[#3A60D0] rounded-lg shadow-md hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
  >
   <svg className="mr-2 -ml-1 w-5 h-5 transform scale-x-[-1]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" > <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" ></path> </svg>
    Back
  </a>
  <Link  to='/dashboard' 

    className="inline-flex items-center  justify-center px-5 py-3 text-base font-medium text-white bg-primary rounded-lg shadow-md hover:bg-primary-dark focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
  >
    Edit With AI
    <Edit className="ml-2 w-6 h-6" />
  </Link>
</div>

        </section>
      </div>
    </div>
  );
}

export default Home;
