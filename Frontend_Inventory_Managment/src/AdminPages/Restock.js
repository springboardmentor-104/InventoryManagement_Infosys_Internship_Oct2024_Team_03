import React, { useContext, useState, useEffect } from 'react';
import { CustomerContext } from '../ContextApi/CustomerContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../AdminPages_css/Restock.css';
import { useUser } from '../Login _signup_pages/UserContext';

const Restock = () => {
  const { userData } = useUser();
  const { products, restockProduct } = useContext(CustomerContext); // Use restockProduct here
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);

  useEffect(() => {
    const productToRestock = products.find(p => p._id === productId);
    if (productToRestock) {
      setProduct(productToRestock);
      setNewQuantity(productToRestock.quantity);
    }
  }, [productId, products]);

  const handleRestockSubmit = async () => {
    if (newQuantity <= product.quantity) {
      alert('Quantity should be greater than the current stock.');
      return;
    }

    try {
      await restockProduct(productId, newQuantity - product.quantity); // Adjust the quantity to add
      alert('Product restocked successfully!');
      navigate(`/admin/${userData.id}/stock`);
    } catch (err) {
      alert('Error restocking product: ' + err.message);
    }
  };

  if (!product) return <p>Product not found</p>;

  return (
    <div className="restock-container">
      <h1>Restock Product</h1>
      <div className="restock-details">
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Current Quantity:</strong> {product.quantity}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
      </div>
      <div className="restock-form">
        <label>New Quantity:</label>
        <input
          type="number"
          value={newQuantity}
          onChange={(e) => setNewQuantity(Number(e.target.value))}
          min={product.quantity + 1}
        />
        <button onClick={handleRestockSubmit}>Submit Restock</button>
      </div>
    </div>
  );
};

export default Restock;
