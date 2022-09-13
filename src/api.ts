import axios, { AxiosRequestConfig } from 'axios';

type ReturnType<T> = {
  data: T;
  status: number;
}

async function api<T>(config: AxiosRequestConfig<T>): Promise<ReturnType<T>> {
  const { url } = config;
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseURL) {
    throw Error('Api Base url env is not fund');
  }

  const { data, status } = await axios({
    baseURL,
    url,
    ...config,
  });

  return {
    data,
    status,
  };
}

export default api;
