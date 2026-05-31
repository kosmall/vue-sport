import { useQuery } from '@tanstack/vue-query';
import { fetchTeams } from '@/services/sportsApi';
import type { MaybeRef } from 'vue';
import { toValue } from 'vue';

export function useTeams(leagueKey: MaybeRef<string>) {
  return useQuery({
    queryKey: ['teams', leagueKey],
    queryFn: () => fetchTeams(toValue(leagueKey)),
    staleTime: 5 * 60 * 1000,
  });
}
