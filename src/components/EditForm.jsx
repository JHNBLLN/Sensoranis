import "./css/EditForm.css";
import { useState } from "react";
import axios from "axios";
import { refreshToken } from "../utility/tokenUtility";

function EditPage({
  product,
  hideFormCallback,
  formProccessedCallback,
  closeFormCallback,
}) {
  const [localName, setLocalName] = useState(product.name || "");
  const [localDescription, setLocalDescription] = useState(
    product.description || ""
  );
  const [localPrice, setLocalPrice] = useState(product.price || "");
  const [updateMessage, setUpdateMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleProductDataUpdate = async (event) => {
    event.preventDefault();
    await refreshToken();
    try {
      const update = await axios.post(
        "/api/sellerproducts/update",
        {
          id: product.id,
          name: localName,
          description: localDescription,
          price: localPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setUpdateMessage(update.data.message);
      setMessageType("success");
      closeFormCallback(false);
      formProccessedCallback(true);
    } catch (err) {
      setUpdateMessage(err.response.data.message);
      setMessageType("error");
    }
  };

  return (
    <form
      className="product-edit-form"
      onSubmit={(e) => {
        handleProductDataUpdate(e);
      }}
    >
      <input
        type="number"
        placeholder="id"
        disabled={true}
        value={product.id}
      />
      <input
        type="text"
        placeholder="name"
        value={localName}
        onChange={(e) => {
          setLocalName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="description"
        value={localDescription}
        onChange={(e) => {
          setLocalDescription(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="price"
        value={localPrice}
        onChange={(e) => {
          setLocalPrice(e.target.value);
        }}
      />
      <button type="submit">SAVE</button>
      <button
        type="button"
        onClick={() => {
          closeFormCallback(false);
          hideFormCallback(false);
        }}
      >
        close
      </button>
      {updateMessage && (
        <p
          style={{
            color: messageType === "success" ? "green" : "red",
            margin: "auto",
          }}
        >
          {updateMessage}
        </p>
      )}
    </form>
  );
}

export default EditPage;
