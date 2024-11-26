import React, { useState, useEffect } from "react";
import { useOrder } from "../ContextApi/OrderContext";
import "../AdminPages_css/Order.css";

const Order = () => {
    const { orderData, storeOrder } = useOrder();

    const statusStages = [
        "Order Placed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
    ];

    const [currentStatus, setCurrentStatus] = useState("Order Placed");

    // Synchronize `currentStatus` with the `orderData` status
    useEffect(() => {
        if (orderData?.status) {
            setCurrentStatus(orderData.status);
        }
    }, [orderData]);

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setCurrentStatus(newStatus);

        // Update the order status in the OrderContext
        if (orderData) {
            const updatedOrder = { ...orderData, status: newStatus };
            storeOrder(updatedOrder);
        }
    };

    if (!orderData) {
        return <p>Loading order details...</p>;
    }

    return (
        <div className="order-page">
            <h1>Order Details</h1>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price per Item</th>
                        <th>Total Price</th>
                        <th>Shipping Address</th>
                        <th>Phone Number</th>
                        <th>Order Status</th>
                        <th>Progress</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderData.id || "N/A"}</td>
                        <td>{orderData.name || "N/A"}</td>
                        <td>{orderData.orderQuantity || "N/A"}</td>
                        <td>₹{orderData.price || "N/A"}</td>
                        <td>₹{orderData.totalPrice || "N/A"}</td>
                        <td>
                            {orderData.address
                                ? `${orderData.address.street}, ${orderData.address.city}, ${orderData.address.state}, ${orderData.address.postalCode}, ${orderData.address.country}`
                                : "N/A"}
                        </td>
                        <td>{orderData.phoneNumber || "N/A"}</td>
                        <td>
                            <select
                                value={currentStatus}
                                onChange={handleStatusChange}
                                className="status-dropdown"
                            >
                                {statusStages.map((stage) => (
                                    <option key={stage} value={stage}>
                                        {stage}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <div className="progress-bar">
                                {statusStages.map((stage, index) => {
                                    const currentIndex = statusStages.indexOf(currentStatus);
                                    const stepClass =
                                        index < currentIndex
                                            ? "completed"
                                            : index === currentIndex
                                            ? "current"
                                            : "upcoming";

                                    return (
                                        <div
                                            key={stage}
                                            className={`progress-step ${stepClass} progress-step-${index}`}
                                        >
                                            <div className={`progress-circle progress-circle-${index}`}>
                                                {index + 1}
                                            </div>
                                            <span
                                                className={`progress-label progress-label-${index}`}
                                            >
                                                {stage}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Order;
