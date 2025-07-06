import { useEffect, useState } from "react";
import { Entity } from "../types/Anime";


const baseURL = `https://api.jikan.moe/v4`

export const fetchAnimeByID = async (id: number) => {
    try {
        const res = await fetch(`${baseURL}/anime/${id}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.error('Error : ', error)
    }
}

export const fetchAllAnime = async (page: number) => {
    try {
        const res = await fetch(`${baseURL}/anime?page=${page}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.error('Error :', error)
    }
}

export const fetchAnimeByParams = async (debouncedSearch: string) => {
    try {
        const res = await fetch(`${baseURL}/anime?q=${debouncedSearch}`);
        const data = await res.json()
        return data
    } catch (error) {
        console.log('Error : ', error)
    }
}

export const getRecommendedAnime = async () => {
    try {
        const res = await fetch(`${baseURL}/recommendations/anime`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log('Error :', error)
    }
}

export const getAnimeGenres = async () => {
    try {
        const res = await fetch(`${baseURL}/genres/anime`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching genres:", error);
        return { data: [] };
    }
};
