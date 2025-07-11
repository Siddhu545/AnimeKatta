import { Anime } from "../types/Anime"
import { buildGenreAnimeMap } from "../utils/AnimeByGenres"



const baseURL = `https://api.jikan.moe/v4`

export const fetchAnimeByID = async (id: number, setError: (msg: string) => void) => {
  try {
    const res = await fetch(`${baseURL}/anime/${id}`)
    const data = await res.json()
    return data
  } catch (error) {
    setError("Something went wrong while fetching Anime.")
  }
}

const CACHE_KEY = "all-animes";
const CACHE_TTL_ALL_ANIMES = 1000 * 60 * 60 * 24; // 24 hours

export const fetchAllAnime = async (): Promise<Anime[]> => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const parsed = JSON.parse(cached);
    const now = Date.now();
    if (now - parsed.timestamp < CACHE_TTL_ALL_ANIMES) {
      return parsed.data;
    }
  }

  const allAnimes: Anime[] = [];
  let page = 1;
  let hasNext = true;

  try {
    while (hasNext && page <= 5) {
      const res = await fetch(`${baseURL}/anime?page=${page}`);
      const data = await res.json();
      allAnimes.push(...data.data);
      hasNext = data.pagination?.has_next_page;
      page++;
      await new Promise((res) => setTimeout(res, 2500));
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: allAnimes,
      timestamp: Date.now(),
    }));
    return allAnimes;
  } catch (error) {
    console.error("Error fetching all animes:", error);
    return [];
  }
};

export const fetchAnimeByParams = async (debouncedSearch: string, setError: (msg: string) => void) => {
  try {
    const res = await fetch(`${baseURL}/anime?q=${debouncedSearch}`);
    const data = await res.json()
    return data
  } catch (error) {
    setError("Something went wrong while fetching Anime.")
  }
}

export const fetchAnimeByGenres = async (genreId: number, setError: (msg: string) => void) => {
  try {
    const res = await fetch(`${baseURL}/genres/anime?q=${genreId}&limit=20`)
    const data = await res.json()
    return data
  } catch (error) {
    setError("Something went wrong while fetching Anime.")
  }

}

const REC_ANIMES_KEY = "rec-animes"
const CACHE_TTL_REC = 1000 * 60 * 60 * 24

export const getRecommendedAnime = async (setError: (msg: string) => void) => {
  try {
    const cached = localStorage.getItem(REC_ANIMES_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      const now = Date.now()
      if (now - parsed.timestamp < CACHE_TTL_REC) {
        return { data: parsed.data }
      }
    }
    const res = await fetch(`${baseURL}/recommendations/anime`)
    const data = await res.json()
    localStorage.setItem(
      GENRE_CACHE_KEY,
      JSON.stringify({ data: data.data, timestamp: Date.now() })
    );
    return data
  } catch (error) {
    setError("Something went wrong while Recommended Animes.")
  }
}

const GENRE_CACHE_KEY = "anime-genres";
const CACHE_TTL = 1000 * 60 * 60 * 24;

export const getAnimeGenres = async (setError: (msg: string) => void) => {
  try {
    const cached = localStorage.getItem(GENRE_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      const now = Date.now();
      if (now - parsed.timestamp < CACHE_TTL) {
        return { data: parsed.data };
      }
    }

    const res = await fetch(`${baseURL}/genres/anime`);
    if (!res.ok) throw new Error(`Status ${res.status}`);

    const data = await res.json();


    localStorage.setItem(
      GENRE_CACHE_KEY,
      JSON.stringify({ data: data.data, timestamp: Date.now() })
    );
    console.log(data)
    return data;
  } catch (error) {
    setError("Something went wrong while fetching Genres.")
    return { data: [] };
  }
};
