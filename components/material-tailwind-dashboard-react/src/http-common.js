import axios from "axios";

export default axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_API}`,
  headers: {
    "Content-type": "application/json",
  },
});
