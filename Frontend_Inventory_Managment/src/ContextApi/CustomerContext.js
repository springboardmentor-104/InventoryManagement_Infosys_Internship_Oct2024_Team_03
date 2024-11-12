import React, { createContext, useEffect, useState } from 'react';

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // State to store the products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products'); // Fetching from the backend
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data); // Set the fetched products
      } catch (err) {
        setError(err.message); // Handle any errors during fetch
      } finally {
        setLoading(false); // Set loading to false once fetch completes
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to remove a product
  const removeProduct = async (productId) => {
    try {
      const response = await fetch('http://localhost:3000/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }), // Send product ID to delete
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Remove the deleted product from state
      setProducts(products.filter(product => product._id !== productId));
    } catch (err) {
      setError(err.message); // Handle any errors during product removal
    }
  };

  // Function to update a product's details
  const updateProduct = async (productId, updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct), // Send updated product details
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const data = await response.json();
      // Update the state with the updated product
      setProducts(products.map(product => (product._id === productId ? data.product : product)));
    } catch (err) {
      setError(err.message); // Handle any errors during product update
    }
  };

  // Function to restock a product (update quantity)
  const restockProduct = async (productId, additionalQuantity) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}/restock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ additionalQuantity }), // Send the additional quantity
      });

      if (!response.ok) {
        throw new Error('Failed to restock product');
      }

      const data = await response.json();
      // Update the state with the restocked product
      setProducts(products.map(product => (product._id === productId ? data.product : product)));
    } catch (err) {
      setError(err.message); // Handle any errors during restocking
    }
  };

  return (
    <CustomerContext.Provider value={{
      products, // The list of products
      loading,  // Loading state
      error,    // Error message if any
      removeProduct,  // Function to remove product
      updateProduct,  // Function to update product
      restockProduct, // Function to restock product
    }}>
      {children} {/* Render children components inside the context provider */}
    </CustomerContext.Provider>
  );
};
