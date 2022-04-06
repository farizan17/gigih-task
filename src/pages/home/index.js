import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";

import AlbumName from "../../components/album_name";
import ArtistName from "../../components/artist_name";
import AlbumImage from "../../components/image_album";
import SongTitle from "../../components/song_title";
import SongDuration from "../../components/time";
import SelectButton from "../../components/select_btn";
import Playlist from "../playlist";

export default function Home() {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    // getToken()

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const handleSelect = (uri) => {
    setSelected([...selected, uri]);
  };

  const handleDelete = (uri) => {
    setSelected(selected.filter((item) => item !== uri));
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const getDataAndRender = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${name}&type=album`,
      {
        headers: {
          Authorization: `Bearer BQChs5EbkTelT6hUSOyBVpAgaIhnaD8uDt5kW2r2DkW7Z6wkq-FJeWUlkhD4pW-01hiDJL8D2r-zV5M44wmcxgjNWqDpBNuQlUfURYfrsI22w22JCrI526_F8_l9meVIshPNnePb_kXC6LYqMxNTNwInK44AzIR21hpaeVSj`,
        },
      }
    ).then((response) => response.json());
    // .then((data) => console.log(data.albums.items));

    setData(res.albums.items);
  };
  
  console.log(data);
  return (
    <div className="The-realApp">
      <form className="search-form" onSubmit={getDataAndRender}>
        <input
          type="text"
          placeholder="Search by album/track"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* <div className="btn-create">
          <NavLink to="/playlist">
            <button onClick={() => <Playlist token={token} />}>Create Playlist</button>
          </NavLink>
        </div> */}
        <Playlist token={token} selected={selected}/>
      <div className="App">
        {data &&
          data.map((v, index) => {
            return (
              <div className="music-play" key={index}>
                <div className="music-container">
                  <AlbumImage image={v.images[0].url} />
                  <div className="music-text">
                    <div className="music-album">
                      <div className="music-album-text">
                        <AlbumName album={v.name} />
                        <ArtistName artist={v.artists[0].name} />
                      </div>
                      <div className="music-album-play-btn">
                      <div>
                      {selected.includes(v.uri) ? (
                        <button
                          className="btn3"
                          onClick={() => handleDelete(v.uri)}
                        >
                          Selected
                        </button>
                      ) : (
                        <button
                          className="btn2"
                          onClick={() => handleSelect(v.uri)}
                        >
                          Select
                        </button>
                      )}
                    </div>                      
                    </div>
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
