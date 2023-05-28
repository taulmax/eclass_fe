import axios, { AxiosInstance, AxiosResponse } from "axios";

const baseURL = "http://localhost:3000";

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

export const useMyAxios = { GET, POST };
