import axios from "axios";

export default {
  getUSStates() {
    return axios.get(process.env.BACKEND_URL);
  }
};
