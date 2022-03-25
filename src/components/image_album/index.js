import React from "react";
import "../../App.css";

export default function AlbumImage ({image}) {
    return (
        <img alt="music-img" id="album-photo" src={image} />

    );
}