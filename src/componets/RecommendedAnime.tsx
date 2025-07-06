
import React, { useEffect, useRef, useState } from "react";
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
    const [recAnimes, setRecAnimes] = useState<RecommendationItem[] | []>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate()
    const scrollRef = useRef<HTMLDivElement>(null);

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

    console.log(recAnimes)

    function truncateTitle(title: string) {
        const maxLength = 20;
        return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
    }

    if (loading) return <p>Loading recommendations...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const uniqueAnimeList = new Map<number, Anime>()

    recAnimes.forEach((item) => {
        item.entry.forEach((anime) => {
            if (!uniqueAnimeList.has(anime.mal_id)) {
                uniqueAnimeList.set(anime.mal_id, anime)
            }
        })
    })

    const uniqueList = Array.from(uniqueAnimeList.values());
    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -300 : 300,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="recommendation-container">
            <h2 className="recommendation-title">Recommended Anime</h2>

            <div className="scroll-wrapper">
                <button className="scroll-button left" onClick={() => scroll("left")}>
                    ←
                </button>
                <div className="recommendation-scroll" ref={scrollRef}>
                    {uniqueList.map((item) => (
                        <div
                            key={item.mal_id}
                            className="recommendation-card"
                            onClick={() => navigate(`/anime/${item.mal_id}`)}
                        >
                            <img
                                src={item.images.jpg.image_url}
                                alt={truncateTitle(item.title)}
                                className="recommendation-image"
                            />
                            <p className="recommendation-name">{item.title}</p>
                        </div>
                    ))}
                </div>
                <button className="scroll-button right" onClick={() => scroll("right")}>
                    →
                </button>
            </div>
        </div>
    );
}
