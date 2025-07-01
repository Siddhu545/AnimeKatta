import { useEffect, useState } from "react";


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

export const fetchAllAnime = async () => {
    try {
        const res = await fetch(`${baseURL}/anime`)
        const data = await res.json()
        return data
    } catch (error) {
        console.error('Error :', error)
    }
}

export const fetchAnimeByParams = async (debouncedSearch: string) => {
    try {
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${debouncedSearch}`);
        const data = await res.json()
        console.log(data)
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