import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { ref } from 'vue';
import LeaguesView from './LeaguesView.vue';

vi.mock('@/composables/useLeagues', () => ({ useLeagues: vi.fn() }));

import { useLeagues } from '@/composables/useLeagues';
import { mockLeague } from '@/tests/mocks/league';

const mountOptions = { global: { stubs: { RouterLink: RouterLinkStub } } };

describe('LeaguesView', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows loading indicator', () => {
    vi.mocked(useLeagues).mockReturnValue({
      isPending: ref(true),
      isError: ref(false),
      data: ref(undefined),
      error: ref(null),
    } as any);
    const wrapper = mount(LeaguesView, mountOptions);
    expect(wrapper.text()).toContain('Loading...');
  });

  it('shows error message', () => {
    vi.mocked(useLeagues).mockReturnValue({
      isPending: ref(false),
      isError: ref(true),
      data: ref(undefined),
      error: ref(new Error('fetch failed')),
    } as any);
    const wrapper = mount(LeaguesView, mountOptions);
    expect(wrapper.text()).toContain('fetch failed');
  });

  it('renders league list', () => {
    vi.mocked(useLeagues).mockReturnValue({
      isPending: ref(false),
      isError: ref(false),
      data: ref([mockLeague]),
      error: ref(null),
    } as any);
    const wrapper = mount(LeaguesView, mountOptions);
    expect(wrapper.text()).toContain('English Premier League');
    expect(wrapper.text()).toContain('Soccer');
  });

  it('filters leagues by search input', async () => {
    vi.mocked(useLeagues).mockReturnValue({
      isPending: ref(false),
      isError: ref(false),
      data: ref([
        mockLeague,
        { idLeague: '4335', strLeague: 'Spanish La Liga', strSport: 'Soccer' },
      ]),
      error: ref(null),
    } as any);
    const wrapper = mount(LeaguesView, mountOptions);
    await wrapper.find('input').setValue('spanish');
    expect(wrapper.text()).toContain('Spanish La Liga');
    expect(wrapper.text()).not.toContain('English Premier League');
  });

  it('shows empty state when no leagues match search', async () => {
    vi.mocked(useLeagues).mockReturnValue({
      isPending: ref(false),
      isError: ref(false),
      data: ref([mockLeague]),
      error: ref(null),
    } as any);
    const wrapper = mount(LeaguesView, mountOptions);
    await wrapper.find('input').setValue('xyz');
    expect(wrapper.text()).toContain('No leagues match your search');
  });
});
