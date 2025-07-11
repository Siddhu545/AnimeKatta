import { Anime } from "../types/Anime";

export function buildGenreAnimeMap(animeList: Anime[]): Map<string, Anime[]> {
  const genreMap = new Map<string, Anime[]>();

  animeList.forEach((anime) => {
    anime.genres.forEach((genre) => {
      if (!genreMap.has(genre.name)) {
        genreMap.set(genre.name, []);
      }
      genreMap.get(genre.name)!.push(anime);
    });
  });

  return genreMap;
}
