import React, { useState } from "react";
import { Textarea } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import toast from 'react-hot-toast';
import "./index.css";

function Playlist({ token, selected }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setId] = useState("");

  const create = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify({
      name: `${title}`,
      description: `${desc}`,
      public: "false",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const fetchPlaylist = fetch("https://api.spotify.com/v1/users/mfarizan/playlists", requestOptions)
      .then((response) => response.json())
      .then((data) => setId(data.id))
      .catch((error) => console.log("error", error));

      toast.promise(fetchPlaylist, {
        loading: 'Loading',
        success: 'Playlist telah dibuat',
        error: 'Playlist gagal dibuat',
      });
  };
  const addSong = async () => {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = "";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const fetchSong = fetch(
      `https://api.spotify.com/v1/playlists/${id}/tracks?uris=${selected}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error))
      .finally(() => window.location.reload());

      toast.promise(fetchSong, {
        loading: 'Loading',
        success: 'Lagu sudah masuk playlist',
        error: 'Lagu gagal masuk playlist',
      });
    };
  return (
    <div className="container-create">
      <div className="kotak-create">
        <div className="box-create">
          <form onSubmit={create}>
            <Input
              className="playlist-name"
              type="text"
              placeholder="Playlist title"
              minLength={10}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br></br>

            <Textarea
              className="playlist-desc"
              type="text"
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
            />
            <br></br>
            <div className="btn-wrapper">
              <Button type="submit" colorScheme="teal" variant="outline">
                Submit
              </Button>
              <Button onClick={addSong} colorScheme="teal" variant="outline">
                Add Song
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
