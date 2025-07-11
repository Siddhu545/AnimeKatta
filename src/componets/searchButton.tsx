import React, { useEffect, useState } from "react";
import { fetchAnimeByParams } from "../api/GetAnime";
import { Anime } from "../types/Anime";
import { useNavigate } from "react-router-dom";
import { useError } from "../context/ErrorContext";

export function SearchBar() {
  const { setError } = useError();
  const [input, setInput] = useState("");
  const [debounceVal, setDebounceVal] = useState(input);
  const [data, setData] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setDebounceVal(input), 500);
    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    if (!debounceVal || debounceVal.length < 3) {
      setData([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await fetchAnimeByParams(debounceVal, setError);
        setData(results.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debounceVal]);

  return (
    <div className="relative w-full max-w-xl mx-auto z-50">
      <input
        type="text"
        placeholder="💥 Search anime…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={`w-full px-5 py-3 rounded-md border-2 border-mhaYellow bg-mhaDark text-white placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-mhaBlue transition duration-300 font-hero text-lg shadow-md ${
          loading ? "animate-pulse" : ""
        }`}
      />

      {/* Dropdown Results */}
      {data.length > 0 && (
        <ul className="absolute w-full bg-mhaDark border border-mhaYellow mt-1 rounded-md shadow-lg max-h-80 overflow-y-auto z-50">
          {data.map((anime) => (
            <li
              key={anime.mal_id}
              onClick={() => navigate(`/anime/${anime.mal_id}`)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-mhaBlue cursor-pointer transition text-white"
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-10 h-14 object-cover rounded"
              />
              <span className="truncate text-sm">{anime.title}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Loading State */}
      {loading && (
        <div className="absolute left-2 top-full mt-1 text-yellow-300 font-hero text-sm animate-pulse">
          Searching…
        </div>
      )}
    </div>
  );
}
