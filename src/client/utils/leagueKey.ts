export function toLeagueKey(strLeague: string): string {
  return strLeague.replace(/ /g, '_');
}

export function fromLeagueKey(leagueKey: string): string {
  return leagueKey.replace(/_/g, ' ');
}
