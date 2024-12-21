import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Home from "./screens/Home.jsx";
import Dashboard from "./dashboard/index.jsx";
import EditResume from "./dashboard/resume/[resumeId]/edit/index.jsx";
import ViewResume from "./my-resume/[resumeId]/view/index.jsx";
import ProfileSettings from "./screens/ProfileSetting.jsx";
import Cvs from "./screens/CVS";
import PricingPlan from "./screens/Pricing.jsx";
import EditCV from "./screens/EditCv.jsx";
import Preview from "./screens/Preview.jsx";
import Template from "./screens/Template.jsx";
import Form from "./screens/CvForm.jsx";
import LoginPage from "./screens/Login.jsx";
import SignupPage from "./screens/Signup.jsx";
import SubscriptionPlan from "./screens/Subscription.jsx";

// Redux store setup
import { thunk } from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider, useDispatch } from "react-redux";
import { userAuthReducer } from "./store/reducer/userAppStorage";
import { fetchUserData } from "./store/actions/userActions";

const rootReducer = combineReducers({
  userAuth: userAuthReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <App />,
    children: [
      { path: "/ai", element: <Dashboard /> },
      { path: "/dashboard/resume/:resumeId/edit", element: <EditResume /> },
      { path: "/cvs", element: <Cvs /> },
      { path: "/editcv/:id", element: <EditCV /> },
      { path: "/form/:id", element: <Form /> },
      { path: "/preview/:id", element: <Preview /> },
      { path: "/preview/:id/:cv", element: <Preview /> },
      { path: "/profilesetting", element: <ProfileSettings /> },
      { path: "/subscription/:id", element: <SubscriptionPlan /> },
      { path: "/pricing", element: <PricingPlan /> },
      { path: "/template", element: <Template /> },
    ],
  },
  { path: "/Login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/my-resume/:resumeId/view", element: <ViewResume /> },
]);

// Custom wrapper to handle dispatch on initialization
const AppWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Call action to fetch user data
    dispatch(fetchUserData());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);
