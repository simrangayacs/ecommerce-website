import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/?search=${search}`);
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo">Online Store</Link>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <nav className="nav-links">
        <Link to="/cart">Cart ({totalItems})</Link>

        {user ? (
          <>
            <Link to="/orders">My Orders</Link>
            <span>Hi, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;