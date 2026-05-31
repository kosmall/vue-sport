export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
}

export interface LeaguesResponse {
  leagues: League[] | null;
}
