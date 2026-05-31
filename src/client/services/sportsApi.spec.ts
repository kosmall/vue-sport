import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockGet = vi.hoisted(() => vi.fn());

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({ get: mockGet })),
  },
}));

import { fetchTeams, fetchTeam } from '@/services/sportsApi';
import { mockTeam } from '@/tests/mocks/team';

describe('sportsApi', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('fetchTeams', () => {
    it('returns teams array from api', async () => {
      mockGet.mockResolvedValueOnce({ data: { teams: [mockTeam] } });

      const result = await fetchTeams();

      expect(mockGet).toHaveBeenCalledWith('/search_all_teams.php', {
        params: { l: 'English_Premier_League' },
      });
      expect(result).toEqual([mockTeam]);
    });

    it('returns empty array when teams is null', async () => {
      mockGet.mockResolvedValueOnce({ data: { teams: null } });

      const result = await fetchTeams();

      expect(result).toEqual([]);
    });
  });

  describe('fetchTeam', () => {
    it('returns team by id', async () => {
      mockGet.mockResolvedValueOnce({ data: { teams: [mockTeam] } });

      const result = await fetchTeam('133604');

      expect(mockGet).toHaveBeenCalledWith('/lookupteam.php', {
        params: { id: '133604' },
      });
      expect(result).toEqual(mockTeam);
    });

    it('throws err when team not found', async () => {
      mockGet.mockResolvedValueOnce({ data: { teams: null } });

      await expect(fetchTeam('999')).rejects.toThrow('Team 999 not found');
    });
  });
});
