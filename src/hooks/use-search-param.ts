import { useLocation } from 'react-router-dom';

export function useSearchParam(param: string) {
  const { search } = useLocation();

  return new URLSearchParams(search).get(param);
}
