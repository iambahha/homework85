import axios from 'axios';
import {apiURL} from "./constants";

const AxiosApi = axios.create({
  baseURL: apiURL
});

export default AxiosApi;
