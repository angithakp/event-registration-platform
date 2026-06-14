import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import EventList from "./pages/EventList";
import EventDetail from "./pages/EventDetail";
import MyRegistrations from "./pages/MyRegistrations";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

     <Routes>

  <Route path="/login" element={<Login />} />

  <Route path="/register" element={<Register />} />

  <Route
    path="/events"
    element={
      <ProtectedRoute>
        <EventList />
      </ProtectedRoute>
    }
  />

  <Route
    path="/events/:id"
    element={
      <ProtectedRoute>
        <EventDetail />
      </ProtectedRoute>
    }
  />

  <Route
    path="/my-registrations"
    element={
      <ProtectedRoute>
        <MyRegistrations />
      </ProtectedRoute>
    }
  />

  <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

</Routes>
    </>
  );
}

export default App;