import { useQuery } from '@tanstack/vue-query';
import { fetchTeam } from '@/services/sportsApi';
import type { MaybeRef } from 'vue';
import { toValue } from 'vue';

export function useTeam(id: MaybeRef<string>) {
  return useQuery({
    queryKey: ['team', id],
    queryFn: () => fetchTeam(toValue(id)),
    staleTime: 5 * 60 * 1000,
  });
}
