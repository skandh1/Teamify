
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000", withCredentials: true });

export const signup = (userData) => API.post("/api/auth/signup", userData);
export const login = (userData) => API.post("/api/auth/login", userData);
