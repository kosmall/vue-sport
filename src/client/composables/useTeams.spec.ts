import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

vi.mock('@/services/sportsApi', () => ({ fetchTeams: vi.fn() }));

import { useTeams } from '@/composables/useTeams';
import { fetchTeams } from '@/services/sportsApi';
import { mockTeam } from '@/tests/mocks/team';

function mountComposable() {
  let result!: ReturnType<typeof useTeams>;
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  mount(
    {
      setup() {
        result = useTeams();
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

  it('returns fetched teams', async () => {
    vi.mocked(fetchTeams).mockResolvedValue([mockTeam]);
    const { data } = mountComposable();
    await vi.waitFor(() => expect(data.value).toEqual([mockTeam]));
    expect(fetchTeams).toHaveBeenCalledOnce();
  });

  it('returns empty array when api returns no teams', async () => {
    vi.mocked(fetchTeams).mockResolvedValue([]);
    const { data } = mountComposable();
    await vi.waitFor(() => expect(data.value).toEqual([]));
  });
});
