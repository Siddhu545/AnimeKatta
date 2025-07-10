import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimeData } from "../context/AnimeContext";
import { SearchBar } from "../componets/searchButton";
import { AnimeRecommendations } from "../componets/RecommendedAnime";
import { GenreDropdown } from "../componets/Genres";
import { Entity } from "../types/Anime";

export const AnimeList = () => {
  const { animes, loading, error } = useAnimeData();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleGenreSelect = (genre: Entity) => navigate(`/genre/${genre.mal_id}`);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  if (loading) return <p className="text-center text-white py-6">Loading anime…</p>;
  if (error)   return <p className="text-center text-red-500 py-6">Error: {error}</p>;

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white px-4 sm:px-6 lg:px-8">
      {/* header */}
      <header className="flex flex-col items-center gap-4 py-6">
        <SearchBar />
        <GenreDropdown onSelect={handleGenreSelect} />
      </header>

      {/* recommendations */}
      <section className="mb-10">
        <AnimeRecommendations />
      </section>

      {/* all‑anime horizontal list */}
      <section className="relative">
        <h2 className="text-2xl font-bold mb-4">Browse All Anime</h2>

        {/* scroll buttons */}
        <button
          aria-label="scroll left"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white text-2xl px-3 py-2 rounded hover:bg-black/75"
        >
          ←
        </button>
        <button
          aria-label="scroll right"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white text-2xl px-3 py-2 rounded hover:bg-black/75"
        >
          →
        </button>

        {/* scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth py-4 hide-scrollbar"
        >
          {animes.map((anime) => (
            <div
              key={anime.mal_id}
              onClick={() => navigate(`/anime/${anime.mal_id}`)}
              className="flex-shrink-0 w-40 sm:w-44 bg-zinc-800 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                loading="lazy"
                className="w-full h-[220px] object-cover"
              />
              <h3 className="p-2 text-sm text-center truncate">{anime.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
