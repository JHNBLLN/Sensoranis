import "./css/CartPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import InventoryProductCard from "../components/InventoryProductCard";
import HeaderBar from "../components/HeaderBar";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, []);

  const handleRemoveCartItem = async (productId) => {
    if (isLoading) return;
    setLoading(true);
    try {
      await axios.post(
        `/api/cart/remove`,
        {
          cartId: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setProducts((prevCart) => prevCart.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Error removing item from the cart", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    if (isLoading) return;
    setLoading(true);
    try {
      await axios.post(`/api/cart/increase`, { cartId: productId });
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
      console.log("Increased item quantity");
    } catch (error) {
      console.error("Error increasing quantity", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    if (isLoading) return;
    setLoading(true);
    try {
      await axios.post(`/api/cart/decrease`, { cartId: productId });
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId
            ? { ...p, quantity: Math.max(p.quantity - 1, 1) }
            : p
        )
      );
      console.log("Decreased item quantity");
    } catch (error) {
      console.error("Error decreasing quantity", error);
    } finally {
      setLoading(false);
    }
  };
  const calculateSubtotal = (items) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <>
      <HeaderBar />

      <div className="cart-container">
        <div className="item-list">
          <h2 className="cart-title">Your cart</h2>
          {products.map((product) => (
            <InventoryProductCard
              key={product.id}
              product={product}
              onRemove={() => handleRemoveCartItem(product.id)}
              onIncrease={() => handleIncreaseQuantity(product.id)}
              onDecrease={() => handleDecreaseQuantity(product.id)}
            />
          ))}
        </div>
        <div className="cart-sidebar">
          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/")}
          >
            Continue shopping
          </button>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₱{calculateSubtotal(products)}</span>
            </div>
            <p className="shipping-note">
              Tax included. <a href="#">Shipping</a> calculated at checkout.
            </p>
          </div>

          <button className="Purchase-shopping-btn">Check out</button>
        </div>
      </div>
    </>
  );
}

export default CartPage;
