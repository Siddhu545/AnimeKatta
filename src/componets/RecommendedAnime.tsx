
import React, { useEffect, useState } from "react";
import { Anime } from "../types/Anime";
import { getRecommendedAnime } from "../api/GetAnime";
import "./AnimeRecommendations.css";
import { useNavigate } from "react-router-dom";

type RecommendationItem = {
    entry: Anime[];
    votes: number;
};

type RecommendationResponse = {
    data: RecommendationItem[];
};

export function AnimeRecommendations() {
    const [recAnimes, setRecAnimes] = useState<RecommendationItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const res: RecommendationResponse = await getRecommendedAnime();
                setRecAnimes(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load recommendations.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    function truncateTitle(title: string) {
        let maxLength = 20
        if (title.length > maxLength) {
            return title.substring(0, maxLength)
        } else {
            return title
        }
    }

    if (loading) return <p>Loading recommendations...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="recommendation-container">
            <h2 className="recommendation-title">Recommended Anime</h2>
            <div className="recommendation-scroll">
                {recAnimes.flatMap((item) =>
                    item.entry.map((anime) => (
                        <div key={anime.mal_id} className="recommendation-card">
                            <img
                                src={
                                    anime.images.jpg.image_url
                                }
                                alt={anime.title}
                                className="recommendation-image"
                            />
                            <h3 className="mt-2 font-semibold">{truncateTitle(anime.title)}</h3>
                            <button onClick={() => navigate(`/anime/${anime.mal_id}`)}>In Detail</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
