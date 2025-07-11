import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Anime } from "../types/Anime";
import { fetchAnimeByID } from "../api/GetAnime";
import { useError } from "../context/ErrorContext";
import { useAnimeData } from "../context/AnimeContext";

export function Anime() {
  const { setError } = useError();
  const { genreAnimeMap } = useAnimeData();
  const { id } = useParams();
  const navigate = useNavigate();

  const [anime, setAnime] = useState<Anime | null>(null);
  const [similarAnimes, setSimilarAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    if (!id) return;

    const animeId = parseInt(id);

    fetchAnimeByID(animeId, setError)
      .then((res) => {
        const animeData: Anime = res.data;
        setAnime(animeData);

        if (animeData.genres.length > 0) {
          const genre = animeData.genres[0].name;
          const localSimilar = genreAnimeMap.get(genre) || [];
          const filtered = localSimilar.filter((a) => a.mal_id !== animeId);
          setSimilarAnimes(filtered);
        } else {
          setSimilarAnimes([]);
        }
      })
      .catch(() => setError("Failed to load anime."));
  }, [id, genreAnimeMap, setError]);

  if (!anime) return <div className="text-mhaYellow text-center py-10 font-hero text-xl">Loading…</div>;

  return (
    <div className="min-h-screen bg-mhaDark text-white px-4 py-10 flex flex-col items-center gap-12 font-hero">
      {/* Anime Detail */}
      <div className="max-w-5xl w-full bg-zinc-800 border-4 border-mhaYellow rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-2/5">
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="lg:w-3/5 p-6 flex flex-col gap-4">
          <h1 className="text-4xl text-mhaYellow font-bold drop-shadow">{anime.title}</h1>
          {anime.title_japanese && (
            <h2 className="text-md text-mhaBlue italic">{anime.title_japanese}</h2>
          )}
          {anime.score && (
            <p className="text-sm">
              <span className="font-bold text-mhaRed">Score:</span> {anime.score}/10
            </p>
          )}
          {anime.episodes && (
            <p className="text-sm">
              <span className="font-bold text-mhaRed">Episodes:</span> {anime.episodes}
            </p>
          )}
          <div className="overflow-y-auto max-h-60 pr-2 hide-scrollbar text-sm text-white">
            <p className="leading-relaxed">{anime.synopsis}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {anime.genres.map((g) => (
              <span
                key={g.mal_id}
                className="text-xs bg-mhaBlue text-white px-3 py-1 rounded-full shadow-md"
              >
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Similar Anime */}
      {similarAnimes.length > 0 && (
        <div className="max-w-5xl w-full">
          <h2 className="text-2xl text-mhaYellow mb-4">Similar Anime</h2>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 scroll-smooth">
            {similarAnimes.map((sim) => (
              <div
                key={sim.mal_id}
                onClick={() => navigate(`/anime/${sim.mal_id}`)}
                className="flex-shrink-0 w-36 sm:w-40 bg-zinc-800 border border-mhaYellow rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
              >
                <img
                  src={sim.images.jpg.image_url}
                  alt={sim.title}
                  className="w-full h-[180px] object-cover"
                />
                <p className="text-xs text-center text-white p-2 truncate">{sim.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
