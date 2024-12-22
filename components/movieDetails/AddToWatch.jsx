"use client";

function AddToWatch({ userId, movieId ,movieTitle, ImageSrc}) {
  const handleAddToWatch = async () => {
    console.log("user__id", userId, movieId ,); // লগ চেক করতে

    try {
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, movieId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Movie added to watch list successfully!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding to watch list:", error);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleAddToWatch}
        className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-file-plus"
        >
          <path stroke="none" d="M0 0h24V24H0z" fill="none" />
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
          <path d="M12 11l0 6" />
          <path d="M9 14l6 0" />
        </svg>
        Add to Watch List
      </button>
    </div>
  );
}

export default AddToWatch;
