/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = "https://cooper-api.onrender.com";
const headers = {
  "Content-Type": "application/json",
};
export const post = async (endpoint: string, payload: any) => {
  const url = API_URL + endpoint;

  const response = await axios.post(url, payload, { headers });

  return response;
};
export const patch = async (endpoint: string, payload?: any) => {
  const url = API_URL + endpoint;

  const response = await axios.patch(url, payload, { headers });

  return response;
};
export const delete_todo = async (endpoint: string) => {
  const url = API_URL + endpoint;

  const response = await axios.delete(url);

  return response;
};
export const delete_all = async (endpoint: string) => {
  const url = API_URL + endpoint;

  const response = await axios.delete(url, { headers });

  return response;
};
export const get = async (endpoint: string) => {
  const url = API_URL + endpoint;

  const response = await axios.get(url, { headers });

  return response;
};
