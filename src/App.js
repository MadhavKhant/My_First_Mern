import "./App.css";
import {Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Error from "./components/common/Error";
import Aboutus from './pages/Aboutus'
import Contactus from "./pages/Contactus";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from './components/core/Dashboard/SettingSection/Settings'
import userEvent from "@testing-library/user-event";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";



function App() {
  
  const {user} = useSelector((state) => state.profile);
  

  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

    <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

      <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />  

    <Route
          path="/about"
          element={
            <OpenRoute>
              <Aboutus/>
            </OpenRoute>
          }
        />  

      <Route
          path="/contact"
          element={
            <OpenRoute>
              <Contactus/>
            </OpenRoute>
          }
        /> 

      <Route
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
      >
        <Route path="dashboard/my-profile" element={<MyProfile/>} />
        <Route path="dashboard/settings" element={<Settings/>} />

        {
          user?.AccountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse/>} />
              <Route path="dashboard/my-courses" element={<MyCourses/>} />
              <Route path="dashboard/UpdateCourse/:CourseId" element={<EditCourse />} />
            </>
          )
        }

      </Route>

      <Route path="*" element={<Error/>} />
    </Routes>

   </div>
  );
}

export default App;
