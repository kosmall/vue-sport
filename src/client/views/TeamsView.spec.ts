import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { ref } from 'vue';
import TeamsView from './TeamsView.vue';
vi.mock('@/composables/useTeams', () => ({ useTeams: vi.fn() }));

import { useTeams } from '@/composables/useTeams';
import { mockTeam } from '@/tests/mocks/team';

const mountOptions = { global: { stubs: { RouterLink: RouterLinkStub } } };

describe('TeamsView', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows loading indicator', () => {
    vi.mocked(useTeams).mockReturnValue({
      isPending: ref(true),
      isError: ref(false),
      data: ref(undefined),
      error: ref(null),
    } as any);

    const wrapper = mount(TeamsView, mountOptions);

    expect(wrapper.text()).toContain('Loading...');
  });

  it('shows error message', () => {
    vi.mocked(useTeams).mockReturnValue({
      isPending: ref(false),
      isError: ref(true),
      data: ref(undefined),
      error: ref(new Error('fetch failed')),
    } as any);

    const wrapper = mount(TeamsView, mountOptions);

    expect(wrapper.text()).toContain('fetch failed');
  });

  it('renders team list with badge and name', () => {
    vi.mocked(useTeams).mockReturnValue({
      isPending: ref(false),
      isError: ref(false),
      data: ref([mockTeam]),
      error: ref(null),
    } as any);

    const wrapper = mount(TeamsView, mountOptions);

    expect(wrapper.text()).toContain('Arsenal');
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe(mockTeam.strBadge);
  });
});
