import axios, { AxiosRequestConfig } from 'axios';

type ReturnType<T> = {
  data: T;
  status: number;
};

async function api<T, R>(config: AxiosRequestConfig<T>): Promise<ReturnType<R>> {
  const { url, headers, ...rest } = config;
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseURL) {
    throw Error('Api Base url env is not fund');
  }

  const accessToken = window.localStorage.getItem('accessToken');

  const { data, status } = await axios({
    baseURL,
    url,
    headers: {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...headers,
    },
    ...rest,
  });

  return {
    data,
    status,
  };
}

export default api;
