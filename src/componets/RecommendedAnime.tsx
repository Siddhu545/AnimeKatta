
import React, { useEffect, useRef, useState } from "react";
import { Anime } from "../types/Anime";
import { getRecommendedAnime } from "../api/GetAnime";
import "./RecommendedAnime.css";
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
        <div className="p-4 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Recommended Anime</h2>

            <div className="relative flex items-center">
                {/* Scroll Left Button */}
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/60 text-white text-2xl px-4 py-2 z-10 rounded hover:bg-neutral-700"
                    onClick={() => scroll("left")}
                >
                    ←
                </button>

                {/* Scrollable Area */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-4 py-4 px-2 scroll-smooth hide-scrollbar"
                >
                    {uniqueList.map((item) => (
                        <div
                            key={item.mal_id}
                            onClick={() => navigate(`/anime/${item.mal_id}`)}
                            className="flex-shrink-0 w-[150px] bg-zinc-800 rounded-lg overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
                        >
                            <img
                                src={item.images.jpg.image_url}
                                alt={truncateTitle(item.title)}
                                className="w-full h-[220px] object-cover"
                            />
                            <p className="p-2 text-sm text-white text-center truncate">{item.title}</p>
                        </div>
                    ))}
                </div>

                {/* Scroll Right Button */}
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/60 text-white text-2xl px-4 py-2 z-10 rounded hover:bg-neutral-700"
                    onClick={() => scroll("right")}
                >
                    →
                </button>
            </div>
        </div>

    );
}
