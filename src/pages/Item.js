import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Category from "../components/Category";
import Navigation from "../components/Navigation";
import "../styles/Item.css";

const Item = () => {
  const { id } = useParams();
  const { type } = useParams();
  const [details, setDetails] = useState([]);
  const [casting, setCasting] = useState([]);
  const [video, setVideo] = useState([]);
  const [similar, setSimilar] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY


  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`
      )
      .then((res) => setDetails(res.data));

    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}&language=en-US`
      )
      .then((res) => setCasting(res.data.cast.slice(0, 6)));

    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}&language=en-US`
      )
      .then((res) => setVideo(res.data.results.slice(0, 1)));

    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => setSimilar(res.data.results.slice(0, 8)));
  }, [id, type]);
  return (
    <div className="container-film">
      <Navigation />
      {details.original_name || details.title ? (
        <div className="container-details">
          <div
            className="bg-header"
            style={
              details.belongs_to_collection
                ? {
                  backgroundImage: `url("https://image.tmdb.org/t/p/original/${details.belongs_to_collection.backdrop_path}")`,
                }
                : {
                  backgroundImage: `url("https://image.tmdb.org/t/p/original/${details.backdrop_path}")`,
                }
            }
          ></div>
          <img
            src={`https://image.tmdb.org/t/p/w400/${details.poster_path}`}
            alt="poster movie"
            className="poster-movie"
          />
          <h1 className="movie-title">
            {details.title || details.original_name}
          </h1>
          <p className="movie-date">{details.release_date}</p>
          <div className="container-category-film">
            {details.genres.map((genre) => {
              return (
                <p key={genre.id} className="text-category">
                  {genre.name}
                </p>
              );
            })}
          </div>
          <div className="container-overview-cast">
            <div className="container-overview">
              <p className="movie-overview">{details.overview}</p>
              <p className="movie-tagline">- {details.tagline}</p>
            </div>
            <div className="container-cast">
              <h2 className="cast-title">Casts</h2>
              <div className="container-actors">
                {casting.map((actor) => {
                  return actor.profile_path ? (
                    <div className="container-actor" key={actor.id}>
                      <NavLink to={`/people/${actor.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                          className="picture-actor"
                          alt="actor"
                        />
                      </NavLink>

                      <p className="name-actor">{actor.name}</p>
                    </div>
                  ) : (
                    ""
                  );
                })}
              </div>
            </div>
          </div>
          {video[0] ? (
            <div className="container-video">
              <iframe
                className="video"
                src={`https://www.youtube.com/embed/${video[0].key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
          ) : (
            ""
          )}
          <div className="container-similar">
            {type === "movie" ? (
              <h1 className="title-similar">Similar Movies</h1>
            ) : (
              <h1 className="title-similar">Similar TV Shows</h1>
            )}
            <Category data={similar} type={type} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Item;
