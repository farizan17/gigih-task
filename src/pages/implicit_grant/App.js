import React from "react";
import "./App.css";
import { Button } from '@chakra-ui/react'
import { useDispatch } from "react-redux";
import {setToken} from "../../components/api/redux/slice"

// import SpotifyGetPlaylists from "./components/SpotifyGetPlaylists/SpotifyGetPlaylists";
const CLIENT_ID = "4367530b949f4ae8888dcc4a7a1872f8"; // insert your client id here from spotify
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/dashboard";
const SCOPES = "playlist-modify-private";

/* 
http://localhost:3000/webapp#access_token=ABCqxL4Y&token_type=Bearer&expires_in=3600
*/
// const getReturnedParamsFromSpotifyAuth = (hash) => {
//   const stringAfterHashtag = hash.substring(1);
//   const paramsInUrl = stringAfterHashtag.split("&");
//   const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
//     console.log(currentValue);
//     const [key, value] = currentValue.split("=");
//     accumulater[key] = value;
//     return accumulater;
//   }, {});

//   return paramsSplitUp;
// };

const Login = () => {
  // useEffect(() => {
  //   if (window.location.hash) {
  //     const { access_token, expires_in, token_type } =
  //       getReturnedParamsFromSpotifyAuth(window.location.hash);

  //     localStorage.clear();

  //     localStorage.setItem("accessToken", access_token);
  //     localStorage.setItem("tokenType", token_type);
  //     localStorage.setItem("expiresIn", expires_in);
  //   }
  // });
  const dispatch = useDispatch();

  let accessToken = window.location.hash
    .substring(1, window.location.hash.length - 1)
    .split("&")[0]
    .split("=")[1];

  if (accessToken) {
    dispatch(setToken(accessToken));
  }

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="container">
      <Button onClick={handleLogin} className="btn-login">login to spotify</Button>
    </div>
  );
};

export default Login;