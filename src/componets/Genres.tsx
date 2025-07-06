import React, { useEffect, useState } from "react";
import { Entity } from "../types/Anime";
import { getAnimeGenres } from "../api/GetAnime";
import "./Genres.css"

export function GenreDropdown({
  onSelect,
}: {
  onSelect: (genre: Entity) => void;
}) {
  const [genres, setGenres] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const res = await getAnimeGenres();
        setGenres(res.data);
      } catch (err) {
        setError("Failed to load genres.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) return <p>Loading genres...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="genre-dropdown">
      <select
        className="genre-select"
        onChange={(e) => {
          const selectedId = parseInt(e.target.value);
          const selected = genres.find((g) => g.mal_id === selectedId);
          if (selected) onSelect(selected);
        }}
      >
        <option value="">Browse by Genre</option>
        {genres.map((genre) => (
          <option key={genre.mal_id} value={genre.mal_id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}
