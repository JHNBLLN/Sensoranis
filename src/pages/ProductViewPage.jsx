import "./css/ProductViewPage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ProductViewPage() {
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios
      .get(`/api/products/${product_id}`)

      .then((response) => {
        console.log(response.data);
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, [product_id]);

  const [isLoading, setLoading] = useState(false);
  const handleAddToCart = async () => {
    if (isLoading) return;

    setLoading(true);

    try {
      await axios.post(
        "/api/cart/add",
        {
          productId: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error adding item to the cart", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-view-body">
      <Link to="/" className="back-arrow">
        <FontAwesomeIcon icon={faChevronLeft} /> BACK
      </Link>

      <div className="product">
        <div className="product-view-img-frame">
          <img src={product.thumbnail} alt={product.name} />
        </div>
        <div className="product-info">
          <p>{product.name}</p>
          <div className="product-action-section">
            <p>{`₱ ${product.price}`}</p>
            <button onClick={handleAddToCart} className="add-cart">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div className="product-additional-info">
        <div>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductViewPage;
