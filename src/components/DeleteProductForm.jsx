import axios from "axios";
import "./css/DeleteProductForm.css";

function DeleteProductForm({
  product,
  hideFormCallback,
  formProccessedCallback,
  closeFormCallback,
}) {
  const handleProductDelete = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "/api/sellerproducts/delete",
        {
          productId: product.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      hideFormCallback(false);
      closeFormCallback(false);
      formProccessedCallback(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="delete-product-form"
      onSubmit={(e) => handleProductDelete(e)}
    >
      <p>Are you sure you want to delete product id: {product.id}</p>
      <p>name: {product.name}</p>
      <p>description: {product.description}</p>
      <p>description: {product.description}</p>
      <button type="submit">delete</button>
      <button
        type="button"
        onClick={() => {
          closeFormCallback(false);
          hideFormCallback(false);
        }}
      >
        cancel
      </button>
    </form>
  );
}

export default DeleteProductForm;
