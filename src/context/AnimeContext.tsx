import React, { useState, useEffect, createContext, useContext } from "react";
import { Anime } from "../types/Anime";
import { fetchAllAnime } from "../api/GetAnime";

interface AnimeDataContextType {
    animes: Anime[];
    loading: boolean;
    error: string | null;
    currentPage: number,
    hasNextPage: boolean,
    goToNextPage: () => void
    goToPrevPage: () => void
}

const AnimeDataContext = createContext<AnimeDataContextType | null>(null);

export const AnimeDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [animes, setAnimes] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(true)

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchAllAnime(currentPage)
            .then((res) => {
                setAnimes(res.data);
                setHasNextPage(res.pagination.has_next_page);
            })
            .catch((err) => {
                setError("Failed to fetch anime");
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, [currentPage]);

    const goToNextPage = () => {
        if (hasNextPage) setCurrentPage((prev) => prev + 1)
    }

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1)
    }

    return (
        <AnimeDataContext.Provider value={{ animes, loading, error, currentPage, goToNextPage, goToPrevPage, hasNextPage }}>
            {children}
        </AnimeDataContext.Provider>
    );
};

export const useAnimeData = () => {
    const context = useContext(AnimeDataContext);
    if (!context) {
        throw new Error("useAnimeData must be used within an AnimeDataProvider");
    }
    return context;
};
