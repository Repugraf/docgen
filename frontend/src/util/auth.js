import router from "./router";
import axios from "axios";

export const getAuthAxios = token => {
  const authAxios = axios.create({
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  authAxios.interceptors(undefined, err => {
    const { response } = err;
    if (response.status === 401) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  })
  return authAxios;
}