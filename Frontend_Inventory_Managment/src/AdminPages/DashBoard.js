import React, { useState, useEffect } from "react";
import { useUser } from "../Login _signup_pages/UserContext";  // Assuming you are using context for user data
import homeImage from "../images/homeimage.png";  // Image path for the home image
import "../AdminPages_css/DashBoard.css";  // Dashboard CSS (assumed)

const Dashboard = () => {
  const { userData } = useUser(); // Assuming you have user context for authentication
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    lowStock: 0,
    recentOrders: 0,
    topSelling: 0,
  });

  // Fetch data for the dashboard
  useEffect(() => {
    // Fetch counts from backend API
    fetch("/api/counts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch counts");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dashboard Data:", data);  // Log the data for debugging
        setDashboardData({
          totalOrders: data.orders,
          totalProducts: data.products,
          totalCustomers: data.users, // Assuming the API returns user count as 'users'
          lowStock: 0, // You can modify this if you have an endpoint for low stock
          recentOrders: 0, // Modify if there's an endpoint to fetch recent orders count
          topSelling: 0, // Modify if there's an endpoint to fetch top-selling products count
        });
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setDashboardData({
          totalOrders: 0,
          totalProducts: 0,
          totalCustomers: 0,
          lowStock: 0,
          recentOrders: 0,
          topSelling: 0,
        });  // Set default zero values if there’s an error
      });
  }, []);

  // Handle loading or user data not available
  if (!userData) {
    return <p>No user data available.</p>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">INVENTORY MANAGEMENT SYSTEM</h1>
      </header>

      <main className="dashboard-welcome">
        <div className="welcome-text">
          <h1>
            <span>Welcome {userData.name}</span> to your <b>Inventory Management Dashboard!</b>
          </h1>
        </div>
        <div className="welcome-image">
          <img src={homeImage} alt="Dashboard illustration" />
        </div>
      </main>

      <section className="dashboard-cards">
        <div className="dashboard-card">
          <i className="fas fa-shopping-cart card-icon"></i>
          <h3 className="card-title">Total Orders</h3>
          <p className="card-number">{dashboardData.totalOrders}</p>
        </div>

        <div className="dashboard-card">
          <i className="fas fa-boxes card-icon"></i>
          <h3 className="card-title">Total Products</h3>
          <p className="card-number">{dashboardData.totalProducts}</p>
        </div>

        <div className="dashboard-card">
          <i className="fas fa-exclamation-triangle card-icon"></i>
          <h3 className="card-title">Low Stock</h3>
          <p className="card-number">{dashboardData.lowStock}</p>
        </div>

        <div className="dashboard-card">
          <i className="fas fa-clock card-icon"></i>
          <h3 className="card-title">Recent Orders</h3>
          <p className="card-number">{dashboardData.recentOrders}</p>
        </div>

        <div className="dashboard-card">
          <i className="fas fa-users card-icon"></i>
          <h3 className="card-title">Total Customers</h3>
          <p className="card-number">{dashboardData.totalCustomers}</p>
        </div>

        <div className="dashboard-card">
          <i className="fas fa-medal card-icon"></i>
          <h3 className="card-title">Top Selling</h3>
          <p className="card-number">{dashboardData.topSelling}</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
