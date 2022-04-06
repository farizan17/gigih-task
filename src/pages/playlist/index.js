import React, { useState } from "react";

function Playlist({ token, selected }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const create = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer BQChs5EbkTelT6hUSOyBVpAgaIhnaD8uDt5kW2r2DkW7Z6wkq-FJeWUlkhD4pW-01hiDJL8D2r-zV5M44wmcxgjNWqDpBNuQlUfURYfrsI22w22JCrI526_F8_l9meVIshPNnePb_kXC6LYqMxNTNwInK44AzIR21hpaeVSj`);

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

    fetch(
      "https://api.spotify.com/v1/users/mfarizan/playlists",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="container-create">
      <div className="kotak-create">
        <div className="box-create">
          <h1>Create Playlist</h1>
          <form onSubmit={create}>
            <input
              type="text"
              placeholder="Playlist title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <br></br>
            <input
              type="text"
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
            />
            <br></br>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Playlist;