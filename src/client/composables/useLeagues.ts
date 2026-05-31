import { useQuery } from '@tanstack/vue-query';
import { fetchLeagues } from '@/services/sportsApi';

export function useLeagues() {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: fetchLeagues,
    staleTime: 60 * 60 * 1000,
  });
}
