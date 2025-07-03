import React from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { useAnimeData } from "../context/AnimeContext";
import "./AnimeGrid.css";
import { fetchAnimeByID } from "../api/GetAnime";
import { SearchBar } from "../componets/searchButton";
import { AnimeRecommendations } from "../componets/RecommendedAnime";

export const AnimeList = () => {
    const { animes, loading, error, currentPage, goToNextPage, goToPrevPage, hasNextPage } = useAnimeData()
    const navigate = useNavigate()
    if (loading) return <p>Loading Animes...</p>
    if (error) return <p>Error : {error}</p>

    return (
        <div className="anime-grid-container">
            <h2 className="anime-grid-title">Animes</h2>
            <SearchBar />
            <AnimeRecommendations />
            <div className="anime-grid">
                {animes.map((anime) => (
                    <div key={anime.mal_id} className="anime-card">
                        <img
                            src={anime.images.jpg.image_url}
                            alt={anime.title}
                            className="anime-image"
                        />
                        <div className="anime-title">{anime.title}</div>
                        {anime.trailer.url && (
                            <a
                                href={anime.trailer.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="anime-link"
                            >
                                Watch Trailer
                            </a>
                        )}
                        <button onClick={() => navigate(`/anime/${anime.mal_id}`)}>In Detail</button>
                    </div>
                ))}
            </div>
            <div className="pagination-container">
                <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Prev
                </button>

                <span className="pagination-page">Page {currentPage}</span>

                <button
                    onClick={goToNextPage}
                    disabled={!hasNextPage}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>
        </div>
    );
}