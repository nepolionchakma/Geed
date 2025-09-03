export interface SongType {
  id: number;
  title: string;
  artist: string;
  artwork: string;
  url: string;
}
export interface SongsWithCategoryType {
  id: number;
  title: string;
  songs: SongType[];
}
