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
  //         },
  //       )
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };  
  //   fetchData();
  // }, []);  
  // console.log(data);

  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  useEffect(() => {
      const getDataAndRender = async () => {
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/search?q=${name}&type=album`, {
              headers: {
                Authorization: `Bearer BQA6sNZn4VPNZwoY2ErjtyUYNzP3FuWQYjnU3OcAyVZX1nYbUwEUqh3co6IPc9Bt_9igybYiJy5LAVjiFfvMgi7V3SJxD1t2UkichlfViwnC8tyhdZt68PykeSPmTpgJBn6amHhWGrn8RVAHu8tIYW9iBwNNzEViT70tQixhV7Jt3tOoeBo`
              },
              params: {
                q:"queen",
                type:"album"
              }
            }
          );
          if (!response.ok) throw new Error("Error");
          const results = await response.json();
          console.log("using async", results);
          setData(results);
        } 
        catch (error) {
          console.log(error);
        }
      };
      getDataAndRender();
    }, [name]);
  
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
