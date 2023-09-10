import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import "../styles/Home.css";
import axios from "axios";
import Category from "../components/Category";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
      )
      .then((res) => setTrending(res.data.results.slice(0, 8)));

    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => setUpcoming(res.data.results.slice(0, 8)));

    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => setPopularMovies(res.data.results.slice(0, 8)));

    axios
      .get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => setPopularSeries(res.data.results.slice(0, 8)));
  }, []);
  return (
    <div>
      <Navigation />
      <div className="bg-home">
        <h1 className="title">Movie Finder - React</h1>
      </div>
      <div className="container-content">
        <Category data={trending} title={"Trending Movies"} type={"movie"} />

        <Category data={upcoming} title={"Upcoming Soon"} type={"movie"} />

        <Category
          data={popularMovies}
          title={"Popular Movies"}
          type={"movie"}
        />

        <Category data={popularSeries} title={"Popular Series"} type={"tv"} />
      </div>
    </div>
  );
};

export default Home;

// 70b615d6c1721910135b6883c89ee447
