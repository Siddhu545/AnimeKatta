import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimeData } from "../context/AnimeContext";
import { SearchBar } from "../componets/searchButton";
import { AnimeRecommendations } from "../componets/RecommendedAnime";
import { GenreDropdown } from "../componets/Genres";
import { Entity } from "../types/Anime";

export const AnimeList = () => {
  const { animes, loading } = useAnimeData();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [heroMode, setHeroMode] = useState(false);

  const handleGenreSelect = (genre: Entity) => navigate(`/genre/${genre.mal_id}`);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  if (loading) return <p className="text-center text-white py-6">Loading anime…</p>;

  return (
    <div
      className={`min-h-screen w-full ${
        heroMode ? "bg-gradient-to-br from-mhaBlue to-mhaDark" : "bg-zinc-900"
      } text-white px-4 sm:px-6 lg:px-8`}
    >
      {/* Hero Mode Toggle */}
      <button
        onClick={() => setHeroMode(!heroMode)}
        className="fixed top-4 right-4 z-50 bg-mhaRed text-mhaYellow font-hero px-4 py-2 rounded-full shadow-lg hover:bg-mhaDark transition-all"
      >
        {heroMode ? "Go Normal" : "Go PLUS ULTRA!"}
      </button>

      {/* Header */}
      <header className="flex flex-col items-center gap-4 py-6">
        <h1 className="text-4xl font-hero text-mhaYellow drop-shadow">PLUS ULTRA ANIME</h1>
        <SearchBar />
        <GenreDropdown onSelect={handleGenreSelect} />
      </header>

      {/* Recommendations */}
      <section className="mb-10">
        <AnimeRecommendations />
      </section>

      {/* All Anime */}
      <section className="relative">
        <h2 className="text-2xl font-hero text-mhaYellow mb-4">Browse All Anime</h2>

        {/* Scroll Buttons */}
        <button
          aria-label="scroll left"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-mhaYellow text-3xl px-4 py-3 rounded-full shadow-lg hover:bg-mhaRed"
        >
          ←
        </button>
        <button
          aria-label="scroll right"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-mhaYellow text-3xl px-4 py-3 rounded-full shadow-lg hover:bg-mhaRed"
        >
          →
        </button>

        {/* Anime Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth py-4 hide-scrollbar"
        >
          {animes.map((anime) => (
            <div
              key={anime.mal_id}
              onClick={() => navigate(`/anime/${anime.mal_id}`)}
              className="flex-shrink-0 w-40 sm:w-44 bg-mhaDark rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 border-2 border-mhaYellow shadow-md"
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                loading="lazy"
                className="w-full h-[220px] object-cover"
              />
              <h3 className="p-2 text-xs text-center font-semibold text-mhaYellow truncate">
                {anime.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
