import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import api from "../services/api";

function Checkout() {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  function handleChange(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();

    await api.post("/orders", {
      items: cart,
      shippingAddress: address,
      total: cartTotal,
    });

    clearCart();
    navigate("/orders");
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <form onSubmit={handlePlaceOrder}>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />

        <h3>Total: ₹{cartTotal}</h3>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;