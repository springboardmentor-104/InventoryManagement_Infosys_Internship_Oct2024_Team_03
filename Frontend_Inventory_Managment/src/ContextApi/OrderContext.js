import React, { createContext, useState, useContext, useEffect } from "react";

const OrderContext = createContext();

export const useOrder = () => {
    return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
    const [orderData, setOrderData] = useState(null); // Store order data globally

    // Load order data from localStorage when the provider is initialized
    useEffect(() => {
        const storedOrder = localStorage.getItem("orderData");
        if (storedOrder) {
            setOrderData(JSON.parse(storedOrder));
        }
    }, []);

    // Function to store order data
    const storeOrder = (order) => {
        setOrderData(order);

        // Save the order to localStorage
        try {
            localStorage.setItem("orderData", JSON.stringify(order));
        } catch (error) {
            console.error("Error saving order data to localStorage:", error);
        }
    };

    // Function to fetch updated order data (simulating server fetch)
    const fetchOrderData = async () => {
        try {
            // Simulate an API call to get the latest order data
            const response = await fetch("/api/orders/latest"); // Update the endpoint as needed
            if (response.ok) {
                const latestOrder = await response.json();
                setOrderData(latestOrder);

                // Save to localStorage for persistence
                localStorage.setItem("orderData", JSON.stringify(latestOrder));
            } else {
                console.error("Failed to fetch order data");
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    return (
        <OrderContext.Provider value={{ orderData, storeOrder, fetchOrderData }}>
            {children}
        </OrderContext.Provider>
    );
};
