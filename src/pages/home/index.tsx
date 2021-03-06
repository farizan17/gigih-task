import React from "react";
import "./home.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { RootState } from "../../components/api/redux/store";
import toast from 'react-hot-toast';


import AlbumName from "../../components/album_name";
import ArtistName from "../../components/artist_name";
import AlbumImage from "../../components/image_album";

import Playlist from "../playlist";
import Login from "../implicit_grant/App";

export default function Home() {
  const token = useSelector((state: RootState) => state.token.token);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);

  const validToken = () => {
    if (token) {
      return true;
    }
  };

  const handleSelect = (uri) => {
    setSelected([...selected, uri],);
  };

  useEffect(() => {
    toast.success(`${selected.length} lagu telah ditambahkan`); 
 }, [selected]);

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
  console.log(selected.length)
  return (
    <div className="The-realApp">
      {validToken() ? (
        <>
          <Heading className="Title" as="h3" size="lg">
            Create Playlist
          </Heading>
          <form className="search-form" onSubmit={getDataAndRender}>
            <Input
              type="text"
              placeholder="Search by album/track"
              onChange={(e) => setName(e.target.value)}
            />

            <IconButton
              variant="filled"
              aria-label="Search database"
              icon={<SearchIcon />}
              type="submit"
            />
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
                                <Button
                                  className="btn3"
                                  onClick={() => handleDelete(v.uri)}
                                >
                                  Selected
                                </Button>
                              ) : (
                                <Button
                                  colorScheme="teal"
                                  className="btn2"
                                  onClick={() => handleSelect(v.uri)}
                                >
                                  Select
                                </Button>
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
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
