import React, { useState, useEffect, createContext, useContext, useMemo } from "react";
import { Anime } from "../types/Anime";
import { fetchAllAnime } from "../api/GetAnime";
import { useError } from "./ErrorContext";
import { buildGenreAnimeMap } from "../utils/AnimeByGenres";

interface AnimeDataContextType {
    animes: Anime[];
    loading: boolean;
    genreAnimeMap: Map<string, Anime[]>;
}

const AnimeDataContext = createContext<AnimeDataContextType | null>(null);

export const AnimeDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [animes, setAnimes] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(true);
    const { setError } = useError();

    useEffect(() => {
        setLoading(true);
        fetchAllAnime()
            .then((fetchedAnimes) => {
                setAnimes(fetchedAnimes || []);
            })
            .catch((err) => {
                setError("Failed to fetch anime");
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    const genreAnimeMap = useMemo(() => buildGenreAnimeMap(animes), [animes]);

    return (
        <AnimeDataContext.Provider value={{ animes, loading, genreAnimeMap }}>
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
