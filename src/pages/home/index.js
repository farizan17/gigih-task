import React from "react";
import "./home.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AlbumName from "../../components/album_name";
import ArtistName from "../../components/artist_name";
import AlbumImage from "../../components/image_album";

import Playlist from "../playlist";

export default function Home() {
  const token = useSelector((state) => state.token);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);

  // useEffect(() => {
  //   const hash = window.location.hash;
  //   let token = window.localStorage.getItem("token");

  //   // getToken()

  //   if (!token && hash) {
  //     token = hash
  //       .substring(1)
  //       .split("&")
  //       .find((elem) => elem.startsWith("access_token"))
  //       .split("=")[1];

  //     window.location.hash = "";
  //     window.localStorage.setItem("token", token);
  //   }

  //   setToken(token);
  // }, []);

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
      `https://api.spotify.com/v1/search?q=${name}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => response.json());
    // .then((data) => console.log(data.albums.items));

    setData(res.tracks.items);
  };

  console.log(data);
  return (
    <div className="The-realApp">
      <h1>Create Playlist</h1>
      <form className="search-form" onSubmit={getDataAndRender}>
        <input
          type="text"
          placeholder="Search by album/track"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Playlist token={token} selected={selected} />
      <div className="App">
        {data &&
          data.map((v, index) => {
            return (
              <div className="music-play" key={index}>
                <div className="music-container">
                  <AlbumImage image={v.album.images[0].url} />
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
