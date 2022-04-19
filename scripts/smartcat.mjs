import axios from "axios";

const smartcat = axios.create({
  auth: {
    password: process.env.SMARTCAT_API_KEY,
    username: process.env.SMARTCAT_ACCOUNT_ID,
  },
  baseURL: "https://smartcat.ai/api/integration",
});

export default smartcat;
