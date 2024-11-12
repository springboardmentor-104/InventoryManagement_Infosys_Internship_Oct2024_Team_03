{/*import React from 'react';
import { useCustomer } from '../ContextApi/CustomerContext';

const Cart = () => {
  const { cart, updateProductQuantity } = useCustomer();

  const handleQuantityChange = (productId, quantity) => {
    updateProductQuantity(productId, quantity);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map(item => (
            <div key={item.productId} className="cart-item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>${item.price}</p>
              <input 
                type="number" 
                value={item.quantity} 
                onChange={(e) => handleQuantityChange(item.productId, e.target.value)} 
                min="1"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
*/}