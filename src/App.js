import React from "react";
import { useEffect, useState } from 'react';
import './App.css';

import AlbumName from "./components/album_name";
import ArtistName from "./components/artist_name";
import AlbumImage from "./components/image_album";
import SongTitle from "./components/song_title";
import SongDuration from "./components/time";
import SelectButton from "./components/select_btn";

function App() {

  const [data, setData] = useState([]);
  
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://gist.githubusercontent.com/aryapradipta9/e6492383477803b233916e01f36d5465/raw/66942c739d66d3774303f84071696aa865a07077/single-sample.json"
        )
        .then(res => res.json())
        .then(
          (result) => {
            setData(result);
          },
        )
      } catch (error) {
        console.log(error);
      }
    };  
    fetchData();
  }, []);  
  console.log(data);

  
  return (
    
    <div className="App">
      <div className="music-play">
        <div className="music-container">
          <AlbumImage image={data.album?.images[0].url}/>
          <div className="music-text">
            <div className="music-album">
              <div className="music-album-text">
                <AlbumName album={data.album?.name}/>
                <ArtistName artist={data.artists?.[0].name}/>
              </div>
              <div class="music-album-play-btn">
                <SelectButton/>
              </div>
            </div>
            <div className="music-title">
              <ol>
                <li>
                  <div className="list-music">
                    <SongTitle title={data.name}/>
                    <SongDuration time={millisToMinutesAndSeconds(data.duration_ms)}/>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>     
    </div>
  );
}

export default App;
