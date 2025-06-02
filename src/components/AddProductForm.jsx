import "./css/AddProductForm.css";
import axios from "axios";
import { useState } from "react";
import { refreshToken } from "../utility/tokenUtility";

function SellingPage({
  hideFormCallback,
  formProccessedCallback,
  closeFormCallback,
}) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    await refreshToken();
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setLoading(false);
      setMessage({
        text: "Unauthorized access. Please log in again.",
        type: "error",
      });
      return;
    }

    try {
      await axios.post(
        "/api/sellerproducts/add",
        { productName, description, price },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      formProccessedCallback(true);
      closeFormCallback(false);
      hideFormCallback(false);
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Something went wrong.";
      setMessage({ text: errorMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-product-form" onSubmit={handleAddProduct}>
      <h2>Add New Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        min="0"
        required
      />

      <div className="form-buttons">
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
        <button
          type="button"
          onClick={() => {
            closeFormCallback(false);
            hideFormCallback(false);
          }}
        >
          Cancel
        </button>
      </div>

      {message.text && (
        <p className={`form-message ${message.type}`}>{message.text}</p>
      )}
    </form>
  );
}

export default SellingPage;
