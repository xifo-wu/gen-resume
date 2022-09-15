import type { Key, SWRConfiguration } from 'swr';
import useApi from './useApi';

export default function useList(key: Key, config?: SWRConfiguration) {
  const { data, ...rest } = useApi(key, config);

  if (!data) {
    return rest;
  }

  return {
    ...data,
    loading: rest.loading,
  };
}
