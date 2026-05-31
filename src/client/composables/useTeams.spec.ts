import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { ref } from 'vue';

vi.mock('@/services/sportsApi', () => ({ fetchTeams: vi.fn() }));

import { useTeams } from '@/composables/useTeams';
import { fetchTeams } from '@/services/sportsApi';
import { mockTeam } from '@/tests/mocks/team';

function mountComposable(leagueKey = 'English_Premier_League') {
  let result!: ReturnType<typeof useTeams>;
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  mount(
    {
      setup() {
        result = useTeams(leagueKey);
        return {};
      },
      template: '<div />',
    },
    { global: { plugins: [[VueQueryPlugin, { queryClient }]] } },
  );
  return result;
}

describe('useTeams', () => {
  beforeEach(() => vi.clearAllMocks());

  it('is pending initially', () => {
    vi.mocked(fetchTeams).mockResolvedValue([]);
    const { isPending } = mountComposable();
    expect(isPending.value).toBe(true);
  });

  it('returns fetched teams for given league', async () => {
    vi.mocked(fetchTeams).mockResolvedValue([mockTeam]);
    const { data } = mountComposable();
    await vi.waitFor(() => expect(data.value).toEqual([mockTeam]));
    expect(fetchTeams).toHaveBeenCalledWith('English_Premier_League');
  });

  it('returns empty array when api returns no teams', async () => {
    vi.mocked(fetchTeams).mockResolvedValue([]);
    const { data } = mountComposable();
    await vi.waitFor(() => expect(data.value).toEqual([]));
  });

  it('refetches when reactive leagueKey changes', async () => {
    const bundesligaTeam = {
      ...mockTeam,
      idTeam: '133700',
      strTeam: 'Bayern Munich',
    };
    vi.mocked(fetchTeams)
      .mockResolvedValueOnce([mockTeam])
      .mockResolvedValueOnce([bundesligaTeam]);

    const leagueKey = ref('English_Premier_League');
    let result!: ReturnType<typeof useTeams>;
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    mount(
      {
        setup() {
          result = useTeams(leagueKey);
          return {};
        },
        template: '<div />',
      },
      { global: { plugins: [[VueQueryPlugin, { queryClient }]] } },
    );

    await vi.waitFor(() => expect(result.data.value).toEqual([mockTeam]));

    leagueKey.value = 'German_Bundesliga';

    await vi.waitFor(() =>
      expect(fetchTeams).toHaveBeenCalledWith('German_Bundesliga'),
    );
  });
});
