import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";

import "../styles/People.css";
import Category from "../components/Category";

const People = () => {
  const { id } = useParams();

  const [details, setDetails] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${id}?api_key=70b615d6c1721910135b6883c89ee447&language=en-US`
      )
      .then((res) => setDetails(res.data));

    axios
      .get(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=70b615d6c1721910135b6883c89ee447&language=en-US`
      )
      .then((res) => setMovies(res.data.cast.slice(0, 7)));

    axios
      .get(
        `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=70b615d6c1721910135b6883c89ee447&language=en-US`
      )
      .then((res) => setTv(res.data.cast.slice(0, 7)));
  }, []);

  return (
    <div className="container-people">
      <Navigation />
      {details.name ? (
        <div className="content-people">
          <img
            src={`https://image.tmdb.org/t/p/w300/${details.profile_path}`}
            className="picture"
            alt="actor"
          />
          <h1 className="name-people">{details.name}</h1>
          <p className="born">Born : {details.birthday}</p>

          <div className="container-bio">
            <h2>Biography</h2>
            <p>{details.biography}</p>
          </div>
          <div className="container-acting">
            {movies[0] ? (
              <Category data={movies} title={"Movies"} type={"movie"} />
            ) : (
              ""
            )}

            {tv[0] ? <Category data={tv} title={"TV SHows"} type={"tv"} /> : ""}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default People;
