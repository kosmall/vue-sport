import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { ref } from 'vue';
import TeamView from './TeamView.vue';
vi.mock('@/composables/useTeam', () => ({ useTeam: vi.fn() }));

import { useTeam } from '@/composables/useTeam';
import { mockTeam } from '@/tests/mocks/team';

function createTestRouter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'teams', component: { template: '<div />' } },
      { path: '/team/:id', name: 'team', component: TeamView },
    ],
  });
  return router;
}

describe('TeamView', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows loading indicator', async () => {
    vi.mocked(useTeam).mockReturnValue({
      isPending: ref(true),
      isError: ref(false),
      data: ref(undefined),
      error: ref(null),
    } as any);

    const router = createTestRouter();
    await router.push('/team/133604');
    await router.isReady();

    const wrapper = mount(TeamView, { global: { plugins: [router] } });

    expect(wrapper.text()).toContain('Loading...');
  });

  it('shows error message', async () => {
    vi.mocked(useTeam).mockReturnValue({
      isPending: ref(false),
      isError: ref(true),
      data: ref(undefined),
      error: ref(new Error('Team not found')),
    } as any);

    const router = createTestRouter();
    await router.push('/team/133604');
    await router.isReady();

    const wrapper = mount(TeamView, { global: { plugins: [router] } });

    expect(wrapper.text()).toContain('Team not found');
  });

  it('renders team name, city and stadium', async () => {
    vi.mocked(useTeam).mockReturnValue({
      isPending: ref(false),
      isError: ref(false),
      data: ref(mockTeam),
      error: ref(null),
    } as any);

    const router = createTestRouter();
    await router.push('/team/133604');
    await router.isReady();

    const wrapper = mount(TeamView, { global: { plugins: [router] } });

    expect(wrapper.text()).toContain('Arsenal');
    expect(wrapper.text()).toContain('London');
    expect(wrapper.text()).toContain('Emirates Stadium');
  });

  it('renders social links for populated fields only', async () => {
    vi.mocked(useTeam).mockReturnValue({
      isPending: ref(false),
      isError: ref(false),
      data: ref(mockTeam),
      error: ref(null),
    } as any);

    const router = createTestRouter();
    await router.push('/team/133604');
    await router.isReady();

    const wrapper = mount(TeamView, { global: { plugins: [router] } });

    expect(wrapper.text()).toContain('Website');
    expect(wrapper.text()).toContain('Twitter');
    expect(wrapper.text()).toContain('Facebook');
    expect(wrapper.text()).toContain('Instagram');
  });
});
