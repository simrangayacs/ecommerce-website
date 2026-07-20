 import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const page = searchParams.get("page") || 1;

  const categories = ["Electronics", "Clothing", "Books", "Home", "Sports"];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const res = await api.get("/products", {
        params: { search, category, page },
      });
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    }
    fetchProducts();
  }, [search, category, page]);

  function handleCategoryClick(cat) {
    setSearchParams({ search, category: cat, page: 1 });
  }

  function handlePageChange(newPage) {
    setSearchParams({ search, category, page: newPage });
  }

  return (
    <div className="home-page">
      <div className="categories">
        <button onClick={() => handleCategoryClick("")}>All</button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => handleCategoryClick(cat)}>
            {cat}
          </button>
        ))}
      </div>

       {loading ? (
  <p>Loading products...</p>
) : !products || products.length === 0 ? (
  <p>Koi product nahi mila</p>
) : (
  <>
    <div className="product-grid">
      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={Number(page) === num ? "active" : ""}
                onClick={() => handlePageChange(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;