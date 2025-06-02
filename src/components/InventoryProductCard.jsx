import "./css/InventoryProductCard.css";

function InventoryProductCard({ product, onRemove, onIncrease, onDecrease }) {
  return (
    <div className="cart-card">
      <div className="cart-card-img-frame">
        <img src={product.thumbnail} alt={product.name} />
      </div>
      <div className="cart-card-body">
        <div className="card-text">
          <p>{product.name}</p>
          <p>
            Quantity:
            <button onClick={() => onDecrease(product)}>-</button>
            <span style={{ margin: "0 10px" }}>{product.quantity}</span>
            <button onClick={() => onIncrease(product)}>+</button>
          </p>
          <p>{`Total: ₱ ${(product.price * product.quantity).toFixed(2)}`}</p>
        </div>
        <div className="item-action">
          <button onClick={() => onRemove(product)}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default InventoryProductCard;
