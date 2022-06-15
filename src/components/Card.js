import React from "react";
import "../styles/Card.css";
import { genreFinder } from "../functions/functions.js";

const Card = ({ data }) => {
  return (
    <div className="container-card">
      <div
        style={{
          backgroundImage: `url(
            "https://image.tmdb.org/t/p/w200/${data.poster_path}"
          )`,
        }}
        className="thumbnail-card"
      >
        {data.genre_ids.map((genre) => {
          return (
            <p key={genre} className="text-genre">
              {genreFinder(genre)}
            </p>
          );
        })}
      </div>

      <p className="title-movie">
        {data.original_title ? data.original_title : data.name}
      </p>
    </div>
  );
};

export default Card;
