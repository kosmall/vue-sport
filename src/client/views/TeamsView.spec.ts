import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { ref } from 'vue';
import TeamsView from './TeamsView.vue';

vi.mock('@/composables/useTeams', () => ({ useTeams: vi.fn() }));

import { useTeams } from '@/composables/useTeams';
import { mockTeam } from '@/tests/mocks/team';

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'leagues', component: { template: '<div />' } },
      { path: '/league/:leagueKey/teams', name: 'teams', component: TeamsView },
      { path: '/team/:id', name: 'team', component: { template: '<div />' } },
    ],
  });
}

describe('TeamsView', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows loading indicator', async () => {
    vi.mocked(useTeams).mockReturnValue({
      isPending: ref(true),
      isError: ref(false),
      data: ref(undefined),
      error: ref(null),
    } as any);
    const router = createTestRouter();
    await router.push('/league/English_Premier_League/teams');
    await router.isReady();
    const wrapper = mount(TeamsView, { global: { plugins: [router] } });
    expect(wrapper.text()).toContain('Loading...');
  });

  it('shows error message', async () => {
    vi.mocked(useTeams).mockReturnValue({
      isPending: ref(false),
      isError: ref(true),
      data: ref(undefined),
      error: ref(new Error('fetch failed')),
    } as any);
    const router = createTestRouter();
    await router.push('/league/English_Premier_League/teams');
    await router.isReady();
    const wrapper = mount(TeamsView, { global: { plugins: [router] } });
    expect(wrapper.text()).toContain('fetch failed');
  });

  it('renders team list with badge and name', async () => {
    vi.mocked(useTeams).mockReturnValue({
      isPending: ref(false),
      isError: ref(false),
      data: ref([mockTeam]),
      error: ref(null),
    } as any);
    const router = createTestRouter();
    await router.push('/league/English_Premier_League/teams');
    await router.isReady();
    const wrapper = mount(TeamsView, { global: { plugins: [router] } });
    expect(wrapper.text()).toContain('Arsenal');
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe(mockTeam.strBadge);
  });

  it('derives league name from route param', async () => {
    vi.mocked(useTeams).mockReturnValue({
      isPending: ref(false),
      isError: ref(false),
      data: ref([]),
      error: ref(null),
    } as any);
    const router = createTestRouter();
    await router.push('/league/Spanish_La_Liga/teams');
    await router.isReady();
    const wrapper = mount(TeamsView, { global: { plugins: [router] } });
    expect(wrapper.text()).toContain('Spanish La Liga');
  });
});
