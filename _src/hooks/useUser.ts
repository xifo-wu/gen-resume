import useSWR from 'swr';
import api from '@/utils/api';

export default function useUser() {
  const { data, ...rest } = useSWR<{ data: any }>('/api/v1/users/current', api.get);

  return {
    ...rest,
    loading: !data?.data,
    user: data?.data,
  };
}
