import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from './pages/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/Home';
import PageNotFound from './components/PageNotFound';
import AdminDashboard from "./pages/AdminDashboard";
import AdminViewAllPatients from "./components/AdminViewAllPatients";
import UserManagement from './components/UserManagement';
import PatientDetails from './components/PatientDetails';
import SystemAnalytics from './components/SystemAnalytics';
import Reports from "./components/Reports";  // Import Reports page
import ResetPassword from "./components/ResetPassword";
import AdminDashboard1 from './components/AdminDashboard1';
import Testimonials from './component/UI/pages/Testimonials'
import HowItWorks from "./component/UI/pages/how";
import HealthWellness from "./component/UI/pages/health";
import Contact from "./component/UI/pages/contact";
import How from './components/log-pages/how';
import Health from './components/log-pages/health';
import Contact1 from './components/log-pages/contact';
import ViewHistoryfull from './components/viewhistoryfull';
import ForgotPassword1 from './components/ForgotPassword1';
import FeedbackDashboard1 from './components/FeedbackDashboard1';
import FeedbackDashboard from './components/FeedbackDashboard';
import AddPatient from './components/AddPatient';


// import GetStarted from "./component/UI/pages/log";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Testimonials/> */}
          <Route path="/" element={<Testimonials />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/health-wellness" element={<HealthWellness />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/viewhistoryfull" element={<ViewHistoryfull/>} />


{/* After the log in */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/how-it-works-log" element={<How/>} />
        <Route path="/health-wellness-log" element={<Health/>} />
        <Route path="/contact-log" element={<Contact1/>} />
        <Route path="/forgot-password" element={<ForgotPassword1 />} />
      



    
          P
          {/* 🟢 Admin Dashboard Routes */}
          <Route path="/AdminDashboards" element={<AdminDashboard />} />  {/* Fixed Typo */}
          
          {/* <Route path="/admin/dashboard1" element={  <AdminDashboard1/>} /> */}
          

         <Route path="./components/FeedbackDashboard" element={<FeedbackDashboard1/>} />

          <Route path="/admin/dashboard1" element={<AdminDashboard1 />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/getAllPatientsForAdmin" element={<AdminViewAllPatients />} />
          <Route path="/admin/analytics" element={<SystemAnalytics />} />
          <Route path="/admin/reports" element={<Reports />} /> 
           <Route path="/admin/FeedbackDashboard1" element={<FeedbackDashboard1/>} /> 
           <Route path="/admin/FeedbackDashboard" element={ <FeedbackDashboard/>} />
           <Route path="/add-patient" element={<AddPatient />} />
           {/* New Reports Page */}


          {/* 🟢 Authentication Routes */}
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* 🟢 Patient Routes */}
          <Route path="/patient/:patientId" element={<PatientDetails />} />

          <Route path="/login" element={<LoginPage />} />  {/* Removed Duplicate Login Route */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
