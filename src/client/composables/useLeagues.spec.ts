import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

vi.mock('@/services/sportsApi', () => ({ fetchLeagues: vi.fn() }));

import { useLeagues } from '@/composables/useLeagues';
import { fetchLeagues } from '@/services/sportsApi';
import { mockLeague } from '@/tests/mocks/league';

function mountComposable() {
  let result!: ReturnType<typeof useLeagues>;
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  mount(
    {
      setup() {
        result = useLeagues();
        return {};
      },
      template: '<div />',
    },
    { global: { plugins: [[VueQueryPlugin, { queryClient }]] } },
  );
  return result;
}

describe('useLeagues', () => {
  beforeEach(() => vi.clearAllMocks());

  it('is pending initially', () => {
    vi.mocked(fetchLeagues).mockResolvedValue([]);
    const { isPending } = mountComposable();
    expect(isPending.value).toBe(true);
  });

  it('returns fetched leagues', async () => {
    vi.mocked(fetchLeagues).mockResolvedValue([mockLeague]);
    const { data } = mountComposable();
    await vi.waitFor(() => expect(data.value).toEqual([mockLeague]));
    expect(fetchLeagues).toHaveBeenCalledOnce();
  });
});
