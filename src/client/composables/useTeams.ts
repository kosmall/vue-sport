import { useQuery } from '@tanstack/vue-query';
import { fetchTeams } from '@/services/sportsApi';

export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
    staleTime: 5 * 60 * 1000,
  });
}
