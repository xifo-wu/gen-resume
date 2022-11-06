// 封装一层 SWR

import api from '@/api';
import useSWR from 'swr';
import type { SWRConfiguration, Key } from 'swr';

const fetcher = (key: string, params: any) =>
  api({
    url: key,
    params,
  });

/**
 * 统一格式的 Api 请求 Hooks
 * @param key 后端接口地址，同 SWR
 * @param config SWR 配置项
 */

const useApi = (key: Key, config?: SWRConfiguration) => {
  const { data, error, mutate, } = useSWR(key, fetcher, config);

  const loading = !error && !data;
  const frontendErrorMessage = { message: '请求出错', success: false };

  if (loading) {
    return {
      loading,
      mutate,
    }
  }

  if (error) {
    const { response } = error;
    return {
      loading,
      mutate,
      error: response.data || frontendErrorMessage,
    };
  }

  const { data: responseData, meta, status } = data;
  if (data.success === false || status >= 400) {
    return {
      mutate,
      loading,
      error: responseData.data || frontendErrorMessage,
    };
  }

  return {
    mutate,
    loading,
    data: responseData.data,
    meta,
  };
};

export default useApi;
