export interface Team {
  idTeam: string;
  strTeam: string;
  strBadge?: string | null;
  strStadium?: string | null;
  strStadiumThumb?: string | null;
  intStadiumCapacity?: string | null;
  strCity?: string | null;
  strCountry?: string | null;
  strLeague?: string | null;
  intFormedYear?: string | null;
  strDescriptionEN?: string | null;
  strWebsite?: string | null;
  strTwitter?: string | null;
  strFacebook?: string | null;
  strInstagram?: string | null;
  strYoutube?: string | null;
}

export interface TeamsResponse {
  teams: Team[] | null;
}
