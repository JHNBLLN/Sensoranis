import "./css/ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const CardContent = (
    <>
      <div className="card-img-frame">
        <img
          src={product.thumbnail}
          className="card-img-top"
          alt="Card image"
        />
      </div>
      <div className="card-body">
        <p dangerouslySetInnerHTML={{ __html: product.name }}></p>
        <p>{`₱${product.price}`}</p>
      </div>
    </>
  );

  return (
    <Link className="card" to={`/${product.id}`}>
      {CardContent}
    </Link>
  );
}

export default ProductCard;
