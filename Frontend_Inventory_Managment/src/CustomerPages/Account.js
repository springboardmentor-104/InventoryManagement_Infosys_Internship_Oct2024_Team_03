import React, { useState } from 'react';
import { useOrder } from '../ContextApi/OrderContext';
import '../CustomerPages_css/Account.css';

const Account = () => {
    const { orderData } = useOrder();
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    const handleOrderStatusClick = () => {
        if (orderData) {
            setShowOrderDetails(true);
        } else {
            alert('No order found. Please place an order first.');
        }
    };

    const statusStages = ['Order Placed', 'Shipped', 'Out for Delivery', 'Delivered'];
    const getStatusIndex = (status) => statusStages.indexOf(status);

    return (
        <div className="account-page">
            <h1>Account</h1>
            <button onClick={handleOrderStatusClick}>Order Status</button>

            {showOrderDetails && orderData && (
                <div className="order-summary">
                    <h2>Your Last Order:</h2>
                    <div className="order-item">
                        <div className="order-item-image">
                            {orderData.imageUrls && orderData.imageUrls.length > 0 ? (
                                <img src={orderData.imageUrls[0]} alt={orderData.name} className="order-item-img" />
                            ) : (
                                <p>No image available</p>
                            )}
                        </div>
                        <div className="order-item-details">
                            <h3>{orderData.name}</h3>
                            <p>Quantity: {orderData.orderQuantity}</p>
                            <p>Price per item: ₹{orderData.price}</p>
                            <p>Total Price: ₹{orderData.totalPrice}</p>
                        </div>
                    </div>

                    <div className="order-address">
                        <h4>Shipping Address:</h4>
                        <p>{orderData.address?.street}, {orderData.address?.city}, {orderData.address?.state}, {orderData.address?.postalCode}, {orderData.address?.country}</p>
                        <p>Phone Number: {orderData.phoneNumber}</p>
                    </div>

                    {/* Vertical Progress Bar */}
                    <div className="progress-bar-wrapper">
                        <div className="progress-bar">
                            {statusStages.map((stage, index) => (
                                <div
                                    key={stage}
                                    className={`progress-step ${index <= getStatusIndex(orderData.status) ? 'active' : ''}`}
                                >
                                    <span className="progress-label">{stage}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Account;
