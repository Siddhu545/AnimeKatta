import { ImageFormats } from "./ImageFormats";

export type Anime = {
  mal_id: number;
  url: string;
  images: ImageFormats;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Entity[];
  licensors: Entity[];
  studios: Entity[];
  genres: Entity[];
  explicit_genres: Entity[];
  themes: Entity[];
  demographics: Entity[];
};

export type Trailer = {
  youtube_id: string;
  url: string;
  embed_url: string;
};

export type Title = {
  type: string;
  title: string;
};

export type Aired = {
  from: string;
  to: string;
  prop: {
    from: DateInfo;
    to: DateInfo;
    string: string;
  };
};

export type DateInfo = {
  day: number;
  month: number;
  year: number;
};

export type Broadcast = {
  day: string;
  time: string;
  timezone: string;
  string: string;
};

export type Entity = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};