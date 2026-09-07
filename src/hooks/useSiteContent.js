import {
  useQuery,
} from '@tanstack/react-query';

import { djangoApi } from '@/api/djangoApi';


export function useSiteSection(
  key
) {
  return useQuery({
    queryKey: [
      'site-section',
      key,
    ],
    queryFn: () =>
      djangoApi.siteSections.get(
        key
      ),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}


export function usePublicContent(
  key,
  queryFn
) {
  return useQuery({
    queryKey: [
      'public-content',
      key,
    ],
    queryFn,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}
