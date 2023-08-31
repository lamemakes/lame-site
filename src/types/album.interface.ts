export interface AlbumOfTheMonthContainer {
  current: AlbumOfTheMonth;
  previous: AlbumOfTheMonth[];
}

export interface AlbumOfTheMonth {
  name: string;
  artist: string;
  month: string;
  spotifyEmbedHtml: string;
  albumCoverColor: string;
}
