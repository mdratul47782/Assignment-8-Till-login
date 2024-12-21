"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Cast({ id }) {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        const response = await fetch(`/api/movie/cast?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch cast");
        }
        const data = await response.json();
        setCast(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchCast();
  }, [id]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!cast.length) {
    return <div>Loading cast details...</div>;
  }

  // Display up to 4 cast members
  const visibleCast = cast.slice(0, 4);
  const extraCount = cast.length - visibleCast.length;

  return (
    <div className="mb-6">
      <h3 className="text-gray-400 mb-2">Cast</h3>
      <div className="flex flex-wrap gap-4">
        {visibleCast.map((actor) => (
          <div key={actor.id} className="text-center">
            <Image
              src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
              alt={actor.name}
              className="w-24 h-24 rounded-full object-cover mb-2"
              width={96} // Fixed size for width (24 * 4)
              height={96}
              // Fixed size for width (24 * 4)
              
            />
            <p className="text-sm">{actor.name}</p>
            <p className="text-xs text-gray-500">{actor.character}</p>
          </div>
        ))}
        {extraCount > 0 && (
          <div className="text-center text-gray-500 flex items-center justify-center">
            +{extraCount} more
          </div>
        )}
      </div>
    </div>
  );
}

export default Cast;
