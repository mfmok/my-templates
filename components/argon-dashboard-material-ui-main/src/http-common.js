import axios from "axios";

export default axios.create({
  baseURL: `${import.meta.env.REACT_APP_BASE_API}`,
  headers: {
    "Content-type": "application/json",
  },
});