import React from "react";
import { useEffect, useState } from 'react';
import './App.css';

import AlbumName from "./components/album_name";
import ArtistName from "./components/artist_name";
import AlbumImage from "./components/image_album";
import SongTitle from "./components/song_title";
import SongDuration from "./components/time";
import SelectButton from "./components/select_btn";
import data from "./DB";

function App() {

  // const [data, setData] = useState([]);
  
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
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
  //         },
  //       )
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };  
  //   fetchData();
  // }, []);  
  // console.log(data);

  
  return (
    <div className="The-realApp">
    <div className="App">
      {data.map((v)=> {
        return (
          <div className="music-play">
        <div className="music-container">
          <AlbumImage image={v.album.images[0].url}/>
          <div className="music-text">
            <div className="music-album">
              <div className="music-album-text">
                <AlbumName album={v.album.name}/>
                <ArtistName artist={v.artists.name}/>
              </div>
              <div className="music-album-play-btn">
                <SelectButton/>
              </div>
            </div>
            <div className="music-title">
              <ol>
                <li>
                  <div className="list-music">
                    <SongTitle title={v.name}/>
                    <SongDuration time={millisToMinutesAndSeconds(v.duration_ms)}/>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>  
        );   
      })}
    </div>
    </div>
  );
}

export default App;
