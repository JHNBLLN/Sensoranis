import "./css/SellerProducts.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRole, refreshToken } from "../utility/tokenUtility";
import EditForm from "../components/EditForm";
import DeleteProductForm from "../components/DeleteProductForm";
import AddProductForm from "../components/AddProductForm";

function SellerProducts() {
  getRole();
  const navigate = useNavigate();
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [formProccessed, setFormProccessed] = useState(true);
  const [formVisble, setformVisble] = useState(false);

  useEffect(() => {
    if (!formProccessed) {
      return;
    }
    setFormProccessed(false);
    const fetchProducts = async () => {
      await axios
        .get(`/api/sellerproducts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          if (response.status === 200 && response.data.itemCount === 0) {
            setProducts(response.data.products);
            return;
          }
          setProducts(response.data.products);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            const loginRedirect = () => navigate("/login");
            loginRedirect();
          }
        });
    };

    const init = async () => {
      await refreshToken();
      await fetchProducts();
    };

    init();
  }, [formProccessed]);

  return (
    <>
      {formVisble && (
        <div className="product-form-container">
          {showEditProduct && (
            <EditForm
              product={selectedProduct}
              hideFormCallback={setShowEditProduct}
              closeFormCallback={setformVisble}
              formProccessedCallback={setFormProccessed}
            />
          )}
          {showDeleteForm && (
            <DeleteProductForm
              product={selectedProduct}
              hideFormCallback={setShowDeleteForm}
              closeFormCallback={setformVisble}
              formProccessedCallback={setFormProccessed}
            />
          )}
          {showAddProductForm && (
            <AddProductForm
              hideFormCallback={setShowAddProductForm}
              closeFormCallback={setformVisble}
              formProccessedCallback={setFormProccessed}
            />
          )}
        </div>
      )}
      <div className="add-btn-container">
        <button
          className="add-btn"
          onClick={() => {
            setformVisble(true);
            setShowAddProductForm(true);
          }}
        >
          Add product
        </button>
      </div>
      <div className="my-products-container">
        <p className="cell header">ID</p>
        <p className="cell header">Name</p>
        <p className="cell header">Price</p>
        <p className="cell header">Actions</p>

        {products.map((p) => (
          <React.Fragment key={p.id}>
            <p className="cell">{p.id}</p>
            <p className="cell">{p.name}</p>
            <p className="cell">₱{p.price}</p>
            <div className="products-container-action-button">
              <button
                className="edit-btn"
                onClick={() => {
                  setformVisble(true);
                  setSelectedProduct(p);
                  setShowEditProduct(true);
                }}
              >
                edit
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  setformVisble(true);
                  setSelectedProduct(p);
                  setShowDeleteForm(true);
                }}
              >
                delete
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default SellerProducts;
