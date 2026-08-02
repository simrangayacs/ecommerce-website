import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleCheckout() {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <p>Cart khali hai</p>
        <Link to="/">Shopping shuru karo</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      {cart.map((item) => (
        <div key={item.product} className="cart-item">
          <img src={item.image} alt={item.name} />
          <span>{item.name}</span>
          <span>₹{item.price}</span>

          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.product, Number(e.target.value))}
          />

          <span>₹{item.price * item.quantity}</span>

          <button onClick={() => removeFromCart(item.product)}>Remove</button>
        </div>
      ))}

      <h3>Total: ₹{cartTotal}</h3>

      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}

export default Cart;