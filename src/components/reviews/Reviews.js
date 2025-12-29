import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({ getMovieData, reviews }) => {
  const revText = useRef();
  const { movieId } = useParams();

  useEffect(() => {
    getMovieData(movieId);
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = revText.current.value;
    if (!review.trim()) return alert("Review cannot be empty");

    try {
      await api.post("/api/v1/reviews", {
        reviewBody: review,
        imdbId: movieId
      });

      revText.current.value = "";
      getMovieData(movieId);
    } catch (err) {
      alert("Submit failed");
    }
  };

  return (
    <>
      <ReviewForm
        handleSubmit={handleSubmit}
        revText={revText}
        labelText="Write a review"
        defaultValue=""
      />

      {reviews?.map((r, i) => (
        <p key={i}>{r.body}</p>
      ))}
    </>
  );
};

export default Reviews;
