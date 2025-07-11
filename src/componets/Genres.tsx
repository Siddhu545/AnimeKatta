import React, { useEffect, useState } from "react";
import { Entity } from "../types/Anime";
import { getAnimeGenres } from "../api/GetAnime";
import { useError } from "../context/ErrorContext";

export function GenreDropdown({
  onSelect,
}: {
  onSelect: (genre: Entity) => void;
}) {
  const [genres, setGenres] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(false);
  const { setError } = useError();

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const res = await getAnimeGenres(setError);
        setGenres(res.data);
      } catch (err) {
        setError("Failed to load genres.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) return <p className="text-mhaYellow font-hero">Loading genres...</p>;

  return (
    <div className="w-full max-w-xs mx-auto">
      <select
        className="w-full px-4 py-2 bg-mhaDark text-white font-hero border-2 border-mhaYellow rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-mhaBlue transition duration-200"
        onChange={(e) => {
          const selectedId = parseInt(e.target.value);
          const selected = genres.find((g) => g.mal_id === selectedId);
          if (selected) onSelect(selected);
        }}
      >
        <option value="">🎯 Browse by Genre</option>
        {genres.map((genre) => (
          <option key={genre.mal_id} value={genre.mal_id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}
