import axios from "axios";
import { getToken } from "../auth";

//export const BASE_URL='http://localhost:5000/api/v1';
export const BASE_URL='https://study-socially-backend-production.up.railway.app/api/v1';

export const myAxios=axios.create({
    baseURL:BASE_URL
});

export const privateAxios=axios.create({
    baseURL:BASE_URL
});

privateAxios.interceptors.request.use(config=>{
  const token = getToken()
  if (token){
    console.log(token) 
    config.headers.common.Authorization=`Bearer ${token}`
    return config
  }  
}, error=>Promise.reject(error))

