import axios from "axios";
import store from "../util/store/index";

export const getAuthAxios = token => {
  const authAxios = axios.create({
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  authAxios.interceptors.response.use(undefined, err => {
    const { response } = err;
    if (response.status === 401) {
      store.dispatch('auth/logout');
    }
  })
  return authAxios;
}