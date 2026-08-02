import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  async function fetchProduct() {
    const res = await api.get(`/products/${id}`);
    setProduct(res.data);
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();
    await api.post(`/products/${id}/reviews`, {
      rating,
      comment,
      userName: user.name,
    });
    setComment("");
    fetchProduct();
  }

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />

      <div className="details-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">₹{product.price}</p>
        <p>
          {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
        </p>

        <button disabled={product.stock === 0} onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>

      <div className="reviews">
        <h3>Reviews ({product.reviews.length})</h3>

        {product.reviews.map((review, index) => (
          <div key={index} className="review">
            <strong>{review.userName}</strong> - {review.rating}/5
            <p>{review.comment}</p>
          </div>
        ))}

        {user ? (
          <form onSubmit={handleReviewSubmit}>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num} Star
                </option>
              ))}
            </select>
            <textarea
              placeholder="Apna review likho..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button type="submit">Submit Review</button>
          </form>
        ) : (
          <p>Review dene ke liye login karo</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;