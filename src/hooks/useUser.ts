import useApi from "./useApi";

export default function useUser() {
  const { data: user, ...rest } = useApi('/api/v1/user');

  return {
    ...rest,
    user,
  }
}
