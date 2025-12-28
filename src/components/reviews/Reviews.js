import { useRef } from "react";
import api from "../../api/axiosConfig";
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({ imdbId }) => {
  const revText = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = revText.current.value;

    if (!review || review.trim() === "") {
      alert("Review cannot be empty");
      return;
    }

    try {
      await api.post("/api/v1/reviews", {
        reviewBody: review,
        imdbId: imdbId
      });

      alert("Review submitted ✅");
      revText.current.value = "";
    } catch (err) {
      console.error(err);
      alert("Submit failed ❌");
    }
  };

  return (
    <ReviewForm
      handleSubmit={handleSubmit}
      revText={revText}
      labelText="Write a review"
      defaultValue=""
    />
  );
};

export default Reviews;
