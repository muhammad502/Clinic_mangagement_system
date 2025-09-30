import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../conmponents/ProtectedRoute";

// auth pages
import Register from "../pages/authPages/Register";
import Login from "../pages/authPages/Login";
import ForgotPassword from "../pages/authPages/ForgotPassword";
import ResetPassword from "../pages/authPages/ResetPassword";
import NotFound from "../pages/NotFound";

// patient pages
import PatientLayout from "../layouts/PatientLayout";
import PatientHome from "../pages/patient/PatientHome";
import MyAppointments from "../pages/patient/MyAppointments";
import Profile from "../pages/patient/Profile";
import Billing from "../pages/patient/Billing";

// super-addmin pages
import SuperAdminLayout from "../conmponents/ProtectedRoute";
import SuperAdminHome from "../pages/superAdmin/SuperAdminHome";
import ManageUsers from "../pages/superAdmin/ManageUsers";
import Reports from "../pages/superAdmin/Reports";
import Settings from "../pages/superAdmin/Settings";

// doctor pages
import DoctorLayout from "../layouts/DoctorLayout";
import DoctorHome from "../pages/doctor/DoctorHome";
import DAppointments from "../pages/doctor/Appointments";
import MyPatients from "../pages/doctor/MyPatients";
import DProfile from "../pages/doctor/Profile";

// receptionist pages

import ReceptionistLayout from "../layouts/ReceptionistLayout";
import ReceptionistHome from "../pages/receptionist/ReceptionistHome";
import RAppointments from "../pages/receptionist/Appointments";
import RPatients from "../pages/receptionist/Patients";
import RBilling from "../pages/receptionist/Billing";

const AppRoutes = () => {
  return (
    <Routes>
  {/* Root path = Login */}
  <Route path="/" element={<Login />} />

  {/* Auth routes */}
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/forgetPassword" element={<ForgotPassword />} />
  <Route path="/resetPassword" element={<ResetPassword />} />

  {/* Patient routes */}
  <Route
    path="/patient"
    element={
      <ProtectedRoute allowedRoles={["patient"]}>
        <PatientLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<PatientHome />} />
    <Route path="appointments" element={<MyAppointments />} />
    <Route path="profile" element={<Profile />} />
    <Route path="billing" element={<Billing />} />
  </Route>

  {/* Super Admin routes */}
  <Route
    path="/super-admin"
    element={
      <ProtectedRoute allowedRoles={["super-admin"]}>
        <SuperAdminLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<SuperAdminHome />} />
    <Route path="users" element={<ManageUsers />} />
    <Route path="reports" element={<Reports />} />
    <Route path="settings" element={<Settings />} />
  </Route>

  {/* Doctor routes */}
  <Route
    path="/doctor"
    element={
      <ProtectedRoute allowedRoles={["doctor"]}>
        <DoctorLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<DoctorHome />} />
    <Route path="appointments" element={<DAppointments />} />
    <Route path="patients" element={<MyPatients />} />
    <Route path="profile" element={<DProfile />} />
  </Route>

  {/* Receptionist routes */}
  <Route
    path="/receptionist"
    element={
      <ProtectedRoute allowedRoles={["receptionist"]}>
        <ReceptionistLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<ReceptionistHome />} />
    <Route path="appointments" element={<RAppointments />} />
    <Route path="patients" element={<RPatients />} />
    <Route path="billing" element={<RBilling />} />
  </Route>

  {/* 404 - catch all */}
  <Route path="*" element={<NotFound />} />
</Routes>

  );
};

export default AppRoutes;
