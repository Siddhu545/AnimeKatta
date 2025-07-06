import React, { useEffect, useState } from "react";
import { fetchAnimeByParams } from "../api/GetAnime";
import { Anime } from "../types/Anime";
import { useNavigate } from "react-router-dom";
import "./searchButton.css"; 

export function SearchBar() {
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
        const results = await fetchAnimeByParams(debounceVal);
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
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Search anime..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={`searchbar-input ${loading ? "loading" : ""}`}
      />

      {data.length > 0 && (
        <ul className="searchbar-dropdown">
          {data.map((anime) => (
            <li
              key={anime.mal_id}
              className="searchbar-result"
              onClick={() => navigate(`/anime/${anime.mal_id}`)}
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="searchbar-thumbnail"
              />
              <span>{anime.title}</span>
            </li>
          ))}
        </ul>
      )}

      {loading && <div className="searchbar-loading">Searching...</div>}
    </div>
  );
}
