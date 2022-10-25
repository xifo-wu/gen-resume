import axios, { AxiosError, AxiosRequestConfig } from 'axios';

type ReturnType<T> = {
  data?: T;
  error?: ErrorResult;
  status: number;
};

type ErrorResult = {
  success: boolean;
  message: string;
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

export const apiGet = async <T, R = unknown>(config: AxiosRequestConfig<T>): Promise<ReturnType<R>> => {
  try {
    const response = await api<T, R>({
      method: 'GET',
      ...config,
    });

    return response;
  } catch (error) {
    return {
      // data: [],
      status: 418,
    };
  }
};

export const apiPost = async <T, R extends any>(
  config: AxiosRequestConfig<T>,
): Promise<ReturnType<R>> => {
  try {
    const response = await api<T, R>({
      method: 'POST',
      ...config,
    });

    return response as ReturnType<R>;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      if (response) {
        return {
          error: response.data,
          status: response.status,
        };
      }
    }

    return {
      error: {
        message: '网络故障，请检查您的网络设置',
        success: false,
      },
      status: 418,
    };
  }
};

export const apiPut = async <T, R extends any>(
  config: AxiosRequestConfig<T>,
): Promise<ReturnType<R>> => {
  try {
    const response = await api<T, R>({
      method: 'PUT',
      ...config,
    });

    return response as ReturnType<R>;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      if (response) {
        return {
          error: response.data,
          status: response.status,
        };
      }
    }

    return {
      error: {
        message: '网络故障，请检查您的网络设置',
        success: false,
      },
      status: 418,
    };
  }
};


export default api;
