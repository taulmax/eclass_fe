import axios, { AxiosInstance, AxiosResponse } from "axios";

const baseURL = "http://localhost:8080";

export const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 30000,
});

const GET = async (url: string) => {
  const { data }: AxiosResponse = await instance.get(url);
  return data;
};

const POST = async (url: string, body: any) => {
  const { data }: AxiosResponse = await instance.post(url, body);
  return data;
};

const PATCH = async (url: string, body: any) => {
  const { data }: AxiosResponse = await instance.patch(url, body, {
    headers: { Authorization: `Bearer ${localStorage.auth_token}` },
  });
  return data;
};

const DELETE = async (url: string, body: any) => {
  const { data }: AxiosResponse = await instance.delete(url, {
    data: body,
    headers: { Authorization: `Bearer ${localStorage.auth_token}` },
  });
  return data;
};

export const useMyAxios = { GET, POST, PATCH, DELETE };
