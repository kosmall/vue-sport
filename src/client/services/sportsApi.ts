import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { Team, TeamsResponse } from '@/types/team';

const API_KEY = import.meta.env.VITE_SPORTS_DB_KEY ?? '3';
const PREMIER_LEAGUE_KEY = 'English_Premier_League';

const http: AxiosInstance = axios.create({
  baseURL: `https://www.thesportsdb.com/api/v1/json/${API_KEY}`,
});

export async function fetchTeams(): Promise<Team[]> {
  const { data } = await http.get<TeamsResponse>('/search_all_teams.php', {
    params: { l: PREMIER_LEAGUE_KEY },
  });
  return data.teams ?? [];
}

export async function fetchTeam(id: string): Promise<Team> {
  const { data } = await http.get<TeamsResponse>('/lookupteam.php', {
    params: { id },
  });
  const team = data.teams?.[0];
  if (!team) throw new Error(`Team ${id} not found`);
  return team;
}
