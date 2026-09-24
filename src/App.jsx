import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";

import Restaurants from "./pages/Restaurants";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorites from "./pages/Favorites";
import Address from "./pages/Address";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import RestaurantDetails from "./pages/RestaurantDetails";
import RestaurantAdminLogin from "./pages/RestaurantAdminLogin";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import RestaurantOrders from "./pages/RestaurantOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/signup" replace />} />

        {/* Authentication Pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Main App Pages */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/restaurants"
          element={
            <Layout>
              <Restaurants />
            </Layout>
          }
        />

        <Route
          path="/orders"
          element={
            <Layout>
              <Orders />
            </Layout>
          }
        />

        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />

        <Route
          path="/checkout"
          element={
            <Layout>
              <Checkout />
            </Layout>
          }
        />

        <Route
          path="/favorites"
          element={
            <Layout>
              <Favorites />
            </Layout>
          }
        />

        <Route
          path="/addresses"
          element={
            <Layout>
              <Address />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
   <Route
  path="/restaurant-admin-login"
  element={<RestaurantAdminLogin />}
/>

<Route
  path="/restaurant-dashboard"
  element={<RestaurantDashboard />}
/>

<Route
  path="/restaurant-orders"
  element={<RestaurantOrders />}
/>
        <Route
  path="/restaurant-details"
  element={
    <Layout>
      <RestaurantDetails />
    </Layout>
  }
/>

        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;