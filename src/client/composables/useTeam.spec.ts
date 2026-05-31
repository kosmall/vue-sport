import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { ref } from 'vue';

vi.mock('@/services/sportsApi', () => ({ fetchTeam: vi.fn() }));

import { useTeam } from '@/composables/useTeam';
import { fetchTeam } from '@/services/sportsApi';
import { mockTeam } from '@/tests/mocks/team';

function mountComposable<T>(setup: () => T): T {
  let result!: T;
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  mount(
    {
      setup() {
        result = setup();
        return {};
      },
      template: '<div />',
    },
    { global: { plugins: [[VueQueryPlugin, { queryClient }]] } },
  );
  return result;
}

describe('useTeam', () => {
  beforeEach(() => vi.clearAllMocks());

  it('is pending initially', () => {
    vi.mocked(fetchTeam).mockResolvedValue(mockTeam);
    const { isPending } = mountComposable(() => useTeam('133604'));
    expect(isPending.value).toBe(true);
  });

  it('fetches team by id', async () => {
    vi.mocked(fetchTeam).mockResolvedValue(mockTeam);
    const { data } = mountComposable(() => useTeam('133604'));
    await vi.waitFor(() => expect(data.value).toEqual(mockTeam));
    expect(fetchTeam).toHaveBeenCalledWith('133604');
  });

  it('refetches when reactive id changes', async () => {
    const chelseaData = { ...mockTeam, idTeam: '133610', strTeam: 'Chelsea' };
    vi.mocked(fetchTeam)
      .mockResolvedValueOnce(mockTeam)
      .mockResolvedValueOnce(chelseaData);

    const id = ref('133604');
    const { data } = mountComposable(() => useTeam(id));

    await vi.waitFor(() => expect(data.value).toEqual(mockTeam));

    id.value = '133610';

    await vi.waitFor(() => expect(fetchTeam).toHaveBeenCalledWith('133610'));
  });
});
