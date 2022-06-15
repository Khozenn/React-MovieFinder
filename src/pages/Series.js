import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import "../styles/find.css";
import axios from "axios";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Category from "../components/Category";

const Series = ({ type }) => {
  const [popularSeries, setPopularSeries] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [adventure, setAdventure] = useState([]);
  const [documentary, setDocumentary] = useState([]);
  const [scifi, setScifi] = useState([]);

  const [search, setSearch] = useState([]);
  const getSearch = (research) => {
    if (research.length < 1) {
      setSearch([]);
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/search/tv?api_key=70b615d6c1721910135b6883c89ee447&language=en-US&query=${research}&page=1&include_adult=false`
        )
        .then((res) => setSearch(res.data.results));
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/tv/popular?api_key=70b615d6c1721910135b6883c89ee447&language=en-US&page=1"
      )
      .then((res) => setPopularSeries(res.data.results.slice(0, 8)));

    axios
      .get(
        "https://api.themoviedb.org/3/discover/tv?api_key=70b615d6c1721910135b6883c89ee447&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=16&with_watch_monetization_types=flatrate"
      )
      .then((res) => setAnimation(res.data.results.slice(0, 8)));

    axios
      .get(
        "https://api.themoviedb.org/3/discover/tv?api_key=70b615d6c1721910135b6883c89ee447&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35&with_watch_monetization_types=flatrate"
      )
      .then((res) => setComedy(res.data.results.slice(0, 8)));

    axios
      .get(
        "https://api.themoviedb.org/3/discover/tv?api_key=70b615d6c1721910135b6883c89ee447&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=10759&with_watch_monetization_types=flatrate"
      )
      .then((res) => setAdventure(res.data.results.slice(0, 8)));

    axios
      .get(
        "https://api.themoviedb.org/3/discover/tv?api_key=70b615d6c1721910135b6883c89ee447&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=99&with_watch_monetization_types=flatrate"
      )
      .then((res) => setDocumentary(res.data.results.slice(0, 8)));

    axios
      .get(
        "https://api.themoviedb.org/3/discover/tv?api_key=70b615d6c1721910135b6883c89ee447&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=10765&with_watch_monetization_types=flatrate"
      )
      .then((res) => setScifi(res.data.results.slice(0, 8)));
  }, []);

  return (
    <div className="container-films">
      <Navigation />
      <input
        type="text"
        className="search"
        placeholder="Search..."
        id="search"
        onChange={(e) => {
          getSearch(e.target.value);
        }}
      />

      {search[0] ? (
        <div className="container-research">
          <div className="content-research">
            {search.map((item) => {
              return (
                <Link to={`/${type}/${item.id}`}>
                  <Card data={item} key={item.id} />
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="container-content-films">
          <Category data={popularSeries} title={"Popular Series"} type={"tv"} />

          <Category data={animation} title={"Animation"} type={"tv"} />

          <Category data={comedy} title={"Comedy"} type={"tv"} />

          <Category data={adventure} title={"Action & Adventure"} type={"tv"} />

          <Category data={documentary} title={"Documentary"} type={"tv"} />

          <Category data={scifi} title={"Sci-Fi & Fantasy"} type={"tv"} />
        </div>
      )}
    </div>
  );
};

export default Series;

// 70b615d6c1721910135b6883c89ee447

// list by genre : https://developers.themoviedb.org/3/discover/movie-discover
// horror : https://api.themoviedb.org/3/discover/movie?api_key=70b615d6c1721910135b6883c89ee447&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&with_watch_monetization_types=flatrate
