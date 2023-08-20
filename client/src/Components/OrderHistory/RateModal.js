import React, { useState, useEffect } from "react";
import "./RateModal.css";
import { UserState } from "../Context/UserProvider";
import StarRating from "./StarRating";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_BASE } from "../functions/functions";
import { getFileNameFromPath } from "../IndividualProduct/function";

const RateModal = ({ products, onClose }) => {
  const { user } = UserState();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPreviousReview = async () => {
      try {
        const response = await axios.get(
          API_BASE + `/api/review/getPreviousRating/${products._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setRating(response.data.stars);
        setReviewText(response.data.reviewMessage);
      } catch (error) {
        console.error("Error fetching previous review:", error);
      }
    };

    fetchPreviousReview();
  }, [user]);

  const handleSubmit = async () => {
    if (rating !== 0 && reviewText !== "") {
      setSubmitting(true);
      try {
        await axios.post(
          API_BASE + "/api/review/submitRating",
          {
            productId: products._id,
            stars: rating,
            reviewMessage: reviewText,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        toast("Thank you for your feedback!", { type: "success" });
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
  return (
    <div className="rate-modal-container">
      <div className="rate-modal">
        <div className="rating-section">
          <h3>Rate the product:</h3>
          <div className="product-info">
            <img
              src={
                process.env.PUBLIC_URL +
                "/uploads/" +
                getFileNameFromPath(products.pics[0])
              }
              alt={`${products.name}`}
            />
            <p className="selected-product-name">{products.name}</p>
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
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default RateModal;
