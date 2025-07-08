import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimeData } from "../context/AnimeContext";
import { SearchBar } from "../componets/searchButton";
import { AnimeRecommendations } from "../componets/RecommendedAnime";
import { GenreDropdown } from "../componets/Genres";
import { Entity } from "../types/Anime";
import "./AnimeGrid.css";

export const AnimeList = () => {
  const {
    animes,
    loading,
    error
  } = useAnimeData();

  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleGenreSelect = (genre: Entity) => {
    navigate(`/genre/${genre.mal_id}`);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <p className="loading-text">Loading anime...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="anime-page">
      <header className="anime-header">
        <SearchBar />
        <GenreDropdown onSelect={handleGenreSelect} />
      </header>
      <section>
        <AnimeRecommendations />
      </section>

      <section>
        <div className="anime-scroll-wrapper">
          <h2 className="section-title">Browse All Anime</h2>

          <div className="anime-scroll-controls">
            <button className="anime-scroll-button" onClick={() => scroll("left")}>←</button>
            <button className="anime-scroll-button" onClick={() => scroll("right")}>→</button>
          </div>

          <div className="anime-scroll-container" ref={scrollRef}>
            {animes.map((anime) => (
              <div
                key={anime.mal_id}
                className="anime-scroll-card"
                onClick={() => {
                  console.log("Navigate to", anime.mal_id);
                  navigate(`/anime/${anime.mal_id}`);
                }}
              >
                <img src={anime.images.jpg.image_url} className="anime-scroll-image" alt={anime.title} />
                <div className="anime-scroll-info">
                  <h3 className="anime-scroll-title">{anime.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
