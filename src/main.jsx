import React, { useEffect, Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import App from "./App.jsx";
import { RingLoader } from "react-spinners";
//import ViewResume from "./my-resume/[resumeId]/view";

// Lazy load components
const Home = lazy(() => import("./screens/Home.jsx"));
const Dashboard = lazy(() => import("./dashboard/index.jsx"));
const EditResume = lazy(() => import("./dashboard/resume/[resumeId]/edit/index.jsx"));
const ViewResume = lazy(() => import("./my-resume/[resumeId]/view/index.jsx"));
const ProfileSettings = lazy(() => import("./screens/ProfileSetting.jsx"));
const Cvs = lazy(() => import("./screens/CVS"));
const PricingPlan = lazy(() => import("./screens/Pricing.jsx"));
const EditCV = lazy(() => import("./screens/EditCv.jsx"));
const Preview = lazy(() => import("./screens/Preview.jsx"));
const Template = lazy(() => import("./screens/Template.jsx"));
const LoginPage = lazy(() => import("./screens/Login.jsx"));
const SignupPage = lazy(() => import("./screens/Signup.jsx"));
const SubscriptionPlan = lazy(() => import("./screens/Subscription.jsx"));
const Form = lazy(() => import("./screens/CvForm.jsx"));

// Redux Reducers and Actions
import { autoLogin } from "./store/action/userAppStorage"; // Adjust import based on your file structure
import { userAuthReducer } from "./store/reducer/userAppStorage";

// Configure Redux Store
const rootReducer = combineReducers({
  userAuth: userAuthReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const AppWrapper = () => {
  let { user } = useSelector((state) => state.userAuth);
  let dispatch = useDispatch();

  useEffect(() => {
    const checkAutoLogin = async () => {
      await dispatch(autoLogin());
    };
    checkAutoLogin();
  }, [dispatch]);


  let TestComponent = ()=>{
    return <div>hello testing</div>
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/cvs",
      element: user ? <Cvs /> : <LoginPage />,
    },
    {
      path: "/dashboard/resume/:resumeId/edit",
      element: user ? <EditResume /> : <LoginPage />,
    },
    {
      path: "/editcv/:id",
      element: user ? <EditCV /> : <LoginPage />,
    },
    {
      path: "/form/:id",
      element: user ? <Form /> : <LoginPage />,
    },
    {
      path: "/preview/:id",
      element: user ? <Preview />: <LoginPage />,
    },
    {
      path: "/preview/:id/:cv",
      element: <Preview />,
    },
    {
      path: "/profilesetting",
      element: user ? <ProfileSettings /> : <LoginPage />,
    },
    {
      path: "/subscription/:id",
      element: user ? <SubscriptionPlan /> : <LoginPage />,
    },
   
    {
      path: "/pricing",
      element: user ? <PricingPlan /> : <LoginPage />,
    },
    {
      path: "/template",
      element: user ? <Template /> : <LoginPage />,
    },
    {
      element: <App />,
      children: [
        {
          path: "/ai",
          element: user ? <Dashboard /> : <LoginPage />,
        },
        
      ],
    },
    {
      path: "/Login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/help",
      element: <div>Help</div>, // Replace with actual Help component
    },
    {
      path: "/my-resume/:resumeId/view",
      element: user ? <ViewResume /> : <LoginPage />,
    },
  ]);

  return (
    <Suspense
      fallback={
        <div className="spinner-wrapper">
          <RingLoader size={50} color="rgb(37, 99, 235)" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);
