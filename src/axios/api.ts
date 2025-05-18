import { axiosInstance } from "./axiosInstance";

export const getter = async <T>(
  url: string,
  params?: Record<string, any>
): Promise<T> => {
  const res = await axiosInstance.get<T>(url, { params });
  return res.data;
};

export const poster = async <T>(url: string, body: any): Promise<T> => {
  const res = await axiosInstance.post<T>(url, body);
  return res.data;
};

export const putter = async <T>(url: string, body: any): Promise<T> => {
  const res = await axiosInstance.put<T>(url, body);
  return res.data;
};

export const deleter = async <T>(url: string): Promise<T> => {
  const res = await axiosInstance.delete<T>(url);
  return res.data;
};
