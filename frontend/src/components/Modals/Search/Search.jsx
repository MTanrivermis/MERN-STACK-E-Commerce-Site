import Proptypes from "prop-types";
import { message } from "antd";
import {Link} from "react-router-dom"
import { useState } from "react";
import "./Search.css";

const Search = ({ isSearchShow, setIsSearchShow }) => {
  const [searchResult, setSearchResult] = useState(null);

  const apiUrl = "/api/v1";

  const handleCloseModal = () => {4
    setIsSearchShow(false); 
    setSearchResult(null);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const productName = e.target[0].value;

    if (productName.trim().length === 0) {
      message.warning(
        "Please enter the product information you want to search."
      );
      return;
    }

    try {
      const res = await fetch(
        `${apiUrl}/products/search/${productName.trim()}`
      );

      if (!res.ok) {
        message.error("Product search error");
        return;
      }

      const data = await res.json();
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""} `}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Search a product" />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <div
            className="results"
            style={{
              display: `${
                searchResult?.length === 0 || !searchResult ? "flex" : "grid"
              }`,
            }}
          >
            {!searchResult && (
              <b
                href="#"
                className="result-item"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                Product search..
              </b>
            )}
            {searchResult?.length === 0 && (
              <a
                href="#"
                className="result-item"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                😔The product you were looking for was not found😔
              </a>
            )}
            {searchResult?.length > 0 &&
              searchResult.map((resultItem) => (
                <Link to={`product/${resultItem._id}`} className="result-item" key={resultItem._id}>
                  <img
                    src={resultItem.img[0]}
                    className="search-thumb"
                    alt=""
                  />
                  <div className="search-info">
                    <h4>{resultItem.name}</h4>
                    <span className="search-sku">SKU: PD0016</span>
                    <span className="search-price">
                      ${resultItem.price.current.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={handleCloseModal}
        ></i>
      </div>
      <div
        className="modal-overlay"
        onClick={handleCloseModal}
      ></div>
    </div>
  );
};

export default Search;

Search.propTypes = {
  isSearchShow: Proptypes.bool,
  setIsSearchShow: Proptypes.func,
};
