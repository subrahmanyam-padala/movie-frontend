import axios from "axios";

export default axios.create({
  baseURL: "https://backend-movie-api-mtpo.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});
