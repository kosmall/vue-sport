import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockGet = vi.hoisted(() => vi.fn());

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({ get: mockGet })),
  },
}));

import { fetchTeams, fetchTeam, fetchLeagues } from '@/services/sportsApi';
import { mockTeam } from '@/tests/mocks/team';
import { mockLeague } from '@/tests/mocks/league';

describe('sportsApi', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('fetchTeams', () => {
    it('returns teams array for given league key', async () => {
      mockGet.mockResolvedValueOnce({ data: { teams: [mockTeam] } });

      const result = await fetchTeams('English_Premier_League');

      expect(mockGet).toHaveBeenCalledWith('/search_all_teams.php', {
        params: { l: 'English_Premier_League' },
      });
      expect(result).toEqual([mockTeam]);
    });

    it('returns empty array when teams is null', async () => {
      mockGet.mockResolvedValueOnce({ data: { teams: null } });

      const result = await fetchTeams('English_Premier_League');

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

  describe('fetchLeagues', () => {
    it('returns leagues array from api', async () => {
      mockGet.mockResolvedValueOnce({ data: { leagues: [mockLeague] } });

      const result = await fetchLeagues();

      expect(mockGet).toHaveBeenCalledWith('/all_leagues.php');
      expect(result).toEqual([mockLeague]);
    });

    it('returns empty array when leagues is null', async () => {
      mockGet.mockResolvedValueOnce({ data: { leagues: null } });

      const result = await fetchLeagues();

      expect(result).toEqual([]);
    });
  });
});
