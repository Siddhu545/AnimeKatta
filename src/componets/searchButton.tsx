import React, { useEffect, useState } from "react";
import { fetchAnimeByParams } from "../api/GetAnime";
import { Anime } from "../types/Anime";

export function SearchBar() {
  const [input, setInput] = useState('');
  const [debounceVal, setDebounceVal] = useState(input);
  const [data, setData] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(input);
    }, 500);

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
    <>
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full"
      />
      {loading && <p>Loading...</p>}
      <ul className="mt-4 space-y-2">
        {data.map((anime) => (
          <li key={anime.mal_id}>
            <strong>{anime.title}</strong>
          </li>
        ))}
      </ul>
    </>
  );
}
