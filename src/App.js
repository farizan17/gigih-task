import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import './App.css';

import AlbumName from "./components/album_name";
import ArtistName from "./components/artist_name";
import AlbumImage from "./components/image_album";
import SongTitle from "./components/song_title";
import SongDuration from "./components/time";
import SelectButton from "./components/select_btn";
import data from "./DB";

import WebApp from "./pages/implicit_grant/App";
import Home from "./pages/home";

function App() {

  // const [data, setData] = useState([]);
  
  // function millisToMinutesAndSeconds(millis) {
  //   var minutes = Math.floor(millis / 60000);
  //   var seconds = ((millis % 60000) / 1000).toFixed(0);
  //   return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  // }
  // fetching data//
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://gist.githubusercontent.com/aryapradipta9/e6492383477803b233916e01f36d5465/raw/66942c739d66d3774303f84071696aa865a07077/single-sample.json"
  //       )
  //       .then(res => res.json())
  //       .then(
  //         (result) => {
  //           setData(result);
  //         }
  //       )
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };  
  //   fetchData();
  // }, []);  
  // console.log(data);
  return (
    <>
    <Router>
      <Routes>
      <Route exact path="/" element={<WebApp />} />
      <Route exact path="/home" element={<Home />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
