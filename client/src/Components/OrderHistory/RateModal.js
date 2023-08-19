import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RateModal.css";
import { UserState } from "../Context/UserProvider";
import { API_BASE } from "../functions/functions";
import { getFileNameFromPath } from "../IndividualProduct/function";
import StarRating from "./StarRating";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RateModal = ({ products, onClose }) => {
  const { user } = UserState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getProductDetails = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      if (user) {
        try {
          const cartDetails = await Promise.all(
            products.map(async (item) => {
              const response = await axios.get(
                API_BASE + `/cart/getCartInfo/${item._id}`,
                config
              );
              return {
                product: response.data,
                count: item.count,
              };
            })
          );
          setProductsList(cartDetails);
        } catch (error) {
          toast.error("Something went wrong");
          console.log(error);
        }
      }
    };
    getProductDetails();
  }, [products, user]);

  useEffect(() => {
    const fetchPreviousRating = async () => {
      try {
        const response = await axios.get(
          API_BASE + `/api/review/getPreviousRating/${selectedProduct._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.data) {
          setRating(response.data.stars);
          setReviewText(response.data.reviewMessage);
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.error("Error fetching previous rating:", error);
      }
    };

    if (selectedProduct) {
      fetchPreviousRating();
    }
  }, [selectedProduct, user]);

  const handleSubmit = async () => {
    if (selectedProduct !== null && rating !== 0) {
      setSubmitting(true);
      try {
        await axios.post(
          API_BASE + "/api/review/submitRating",
          {
            productId: selectedProduct._id,
            stars: rating,
            reviewMessage: reviewText,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        toast.success("Review Submitted suceesfully");
        setRating(0);
        setReviewText("");
        onClose();
      } catch (error) {
        toast.error("Something went wrong");
        console.error("Error submitting review:", error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleProductSelect = (productDetails) => {
    setSelectedProduct(productDetails);
  };
  return (
    <div className="rate-modal-container">
      <div className="rate-modal">
        {!selectedProduct && (
          <>
            <h2>Rate Products</h2>
            <p>Select a product to rate:</p>
            <ul className="product-list">
              {productsList.map((product) => (
                <li
                  key={product.product._id}
                  className={
                    selectedProduct === product.product ? "selected" : ""
                  }
                  onClick={() => handleProductSelect(product.product)}
                >
                  <div className="product-info">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/uploads/" +
                        getFileNameFromPath(product.product.pics[0])
                      }
                      alt={`${product.product.name}`}
                    />
                    <div className="product-details-rate-modal">
                      <p className="product-name">{product.product.name}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {selectedProduct && (
          <div className="rating-section">
            <h3>Rate the product:</h3>
            <div className="product-info">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/uploads/" +
                  getFileNameFromPath(selectedProduct.pics[0])
                }
                alt={`${selectedProduct.name}`}
              />
              <p className="selected-product-name">{selectedProduct.name}</p>
            </div>
            <div className="rating-stars">
              <StarRating value={rating} onChange={setRating} />
            </div>
            <textarea
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Rating"}
            </button>
          </div>
        )}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default RateModal;
