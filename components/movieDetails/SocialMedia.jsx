import React from "react";

function SocialMedia({ movie }) {
  if (!movie) return null;

  const { title, overview, poster_path, homepage } = movie;
  const movieUrl = homepage || window.location.href; // Use homepage or fallback to the current page
  const movieImageUrl = `https://image.tmdb.org/t/p/original${poster_path}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    movieUrl
  )}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${title}: ${overview}`
  )}&url=${encodeURIComponent(movieUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    movieUrl
  )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
    overview
  )}&source=LinkedIn`;

  return (
    <div className="mb-6">
      <h3 className="text-gray-400 mb-2">Share on social media</h3>
      <div className="flex flex-wrap gap-4">
        {/* Facebook Button */}
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center cursor-pointer"
        >
          <img
            src="http://facebook.com/favicon.ico"
            alt="Facebook"
            className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
          />
          <p className="text-sm">Facebook</p>
        </a>

        {/* Twitter Button */}
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center cursor-pointer"
        >
          <img
            src="http://x.com/favicon.ico"
            alt="Twitter"
            className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
          />
          <p className="text-sm">X (Twitter)</p>
        </a>

        {/* LinkedIn Button */}
        <a
          href={linkedinShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center cursor-pointer"
        >
          <img
            src="http://linkedin.com/favicon.ico"
            alt="LinkedIn"
            className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
          />
          <p className="text-sm">LinkedIn</p>
        </a>
      </div>
    </div>
  );
}

export default SocialMedia;
