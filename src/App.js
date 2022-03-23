import React from "react";
import { useEffect, useState } from 'react';
import './App.css';



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
          <img alt="music-img" id="album-photo" src={data.album?.images[0].url} />
          <div className="music-text">
            <div className="music-album">
              <div className="music-album-text">
                <h2 id="album-name">{data.album?.name}</h2>
                <p id="artist-name">{data.artists?.[0].name}</p>
              </div>
              <div class="music-album-play-btn">
                <button>Select</button>
              </div>
            </div>
            <div className="music-title">
              <ol>
                <li>
                  <div className="list-music">
                    <p id="track-name">{data.name}</p>
                    <p id="time">{millisToMinutesAndSeconds(data.duration_ms)}</p>
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
