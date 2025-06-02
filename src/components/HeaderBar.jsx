import "./css/HeaderBar.css";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import CartImage from "../assets/icons/cart_ico.png";
import axios from "axios";
import Weblogo from "../assets/websitelogo/website-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { getRole } from "../utility/tokenUtility";

const HeaderBar = ({ searchValue, setSearchValue, setCurrentPage }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="container-header">
        <div className="left-side-bar">
          <nav>
            <ul style={{ listStyleType: "none", display: "flex" }}>
              <li>
                <Link to="/products" className="nav-link">
                  <img
                    src={Weblogo}
                    alt="website logo"
                    className="website-logo"
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="navigation-bar">
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="right-side-bar">
          <Link className="cart-ico" to="/cart">
            <img src={CartImage} alt="Cart" />
          </Link>
          <div className="dropdown" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              id="profile-btn"
              aria-label="User menu"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <FontAwesomeIcon icon={faUser} style={{ fontSize: "2rem" }} />
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                {getRole().includes(2) && (
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/admin/products");
                    }}
                  >
                    Admin
                  </button>
                )}
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderBar;
