import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Anime } from "../types/Anime";
import { fetchAnimeByID } from "../api/GetAnime";

export function Anime() {

    const { id } = useParams()
    const [anime, setAnime] = useState<Anime | null>(null)

    useEffect(() => {
        if (id) {
            fetchAnimeByID(parseInt(id)).then(res => setAnime(res.data))
        }
    }, [id])


    if (!anime) return <div>Loading....</div>
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{anime.title}</h1>
            <img src={anime.images.jpg.image_url} alt={anime.title} />
            <p>{anime.synopsis}</p>
        </div>
    )
}