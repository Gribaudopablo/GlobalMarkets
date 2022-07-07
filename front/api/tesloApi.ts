import axios from "axios";

const tesloApi = axios.create({
  baseURL: "https://globalmarkets13.herokuapp.com"
  
});


export default tesloApi;
