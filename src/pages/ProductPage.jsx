import "./css/ProductPage.css";
import Promo from "../assets/slideimg/slide-promo.png";

import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import HeaderBar from "../components/HeaderBar";
import Slideshow from "../components/Slideshow";
import Footer from "../components/Footer";
import { refreshToken } from "../utility/tokenUtility";
import { PaginationContext } from "../context/contexts";

function ProductPage() {
  const navigate = useNavigate();
  const productDisplay = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(
    Number(searchParams.get("itemPerPage")) || 15
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setItemPerPage(Number(searchParams.get("itemPerPage") || 15));
    setCurrentPage(Number(searchParams.get("page")) || 1);
    setSearchValue(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    const setAddressParam = () => {
      const newParams = {
        ...(searchValue && { q: searchValue }),
        page: String(currentPage),
        itemPerPage: String(itemPerPage),
      };

      const currentParams = Object.fromEntries([...searchParams]);

      const areEqual =
        Object.keys(newParams).length === Object.keys(currentParams).length &&
        Object.keys(newParams).every(
          (key) => newParams[key] === currentParams[key]
        );

      if (areEqual) {
        return;
      }

      setSearchParams(newParams, { replace: false });
    };

    const fetchProducts = async () => {
      await axios
        .get(`/api/products`, {
          params: {
            q: searchValue,
            page: currentPage,
            itemPerPage: itemPerPage,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: false,
        })
        .then((response) => {
          if (response.status === 200 && response.data.itemCount === 0) {
            setProducts(response.data.products);
            setTotalItem(response.data.itemCount);
            return;
          }
          setProducts(response.data.products);
          setTotalItem(response.data.totalCount);
        })
        .catch((error) => {
          console.log(error);
          console.log(localStorage.getItem("accessToken"));
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

    setAddressParam();
    init();
  }, [currentPage, searchValue, itemPerPage]);

  return (
    <>
      <HeaderBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setCurrentPage={setCurrentPage}
      />

      <div className="page-header">
        <Slideshow />
        <img src={Promo} alt="discount-poster" className="promo-poster" />
      </div>
      <div className="products-main">
        <div className="item-per-page-selector">
          <p>item for page: </p>
          <button
            onClick={() => {
              setItemPerPage(10);
            }}
          >
            10
          </button>
          <button
            onClick={() => {
              setItemPerPage(20);
            }}
          >
            20
          </button>
          <button
            onClick={() => {
              setItemPerPage(40);
            }}
          >
            40
          </button>
        </div>
        <h1>Product</h1>
        <div ref={productDisplay} className="product-container">
          {products &&
            products.map((product, index) => (
              <ProductCard key={product.id || index} product={product} />
            ))}
          {products.length === 0 && (
            <p style={{ textAlign: "center", width: "100%" }}>
              No results found
            </p>
          )}
        </div>
        <PaginationContext.Provider
          value={{
            totalItem,
            itemPerPage,
            setCurrentPage,
            productDisplay,
            currentPage,
          }}
        >
          <Pagination />
        </PaginationContext.Provider>
      </div>
      <div className="product-page-footer">
        <Footer />
      </div>
    </>
  );
}

export default ProductPage;
