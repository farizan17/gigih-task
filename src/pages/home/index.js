import React from 'react';
import "./index.css";
import { useEffect, useState } from 'react';

import AlbumName from "../../components/album_name";
import ArtistName from "../../components/artist_name";
import AlbumImage from "../../components/image_album";
import SongTitle from "../../components/song_title";
import SongDuration from "../../components/time";
import SelectButton from "../../components/select_btn";


export default function Home () {
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
                Authorization: `Bearer ${token}`
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
            <input type="text" placeholder="Search.." onChange={(e) => setName(e.target.value)}/>
            <button>Search</button>
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
                    {/* <SongDuration time={millisToMinutesAndSeconds(v.duration_ms)}/> */}
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
