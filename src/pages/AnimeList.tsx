import React from "react";
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
    error,
    currentPage,
    goToNextPage,
    goToPrevPage,
    hasNextPage,
  } = useAnimeData();

  const navigate = useNavigate();

  const handleGenreSelect = (genre: Entity) => {
    navigate(`/genre/${genre.mal_id}`);
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
        <h2 className="section-title">Recommended for You</h2>
        <AnimeRecommendations />
      </section>

      <section>
        <h2 className="section-title">Browse All Anime</h2>
        <div className="anime-grid">
          {animes.map((anime) => (
            <div
              key={anime.mal_id}
              className="anime-card"
              onClick={() => navigate(`/anime/${anime.mal_id}`)}
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="anime-image"
                loading="lazy"
              />
              <div className="anime-info">
                <h3 className="anime-title">{anime.title}</h3>
                {anime.trailer?.url && (
                  <a
                    href={anime.trailer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="anime-trailer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    🎬 Watch Trailer
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="pagination-container">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          ⬅ Prev
        </button>
        <span className="pagination-page">Page {currentPage}</span>
        <button
          onClick={goToNextPage}
          disabled={!hasNextPage}
          className="pagination-button"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};
