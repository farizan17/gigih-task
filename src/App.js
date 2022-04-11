import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { connect } from "react-redux";

import Home from "./pages/home";
import Playlist from "./pages/playlist";
import Login from "./pages/implicit_grant/App";
import Auth from "./components/api/auth";

class App extends Component {
  componentDidMount() {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    let foundToken = hash.access_token;
    if (foundToken) {
      this.props.setToken(foundToken);
    }
  }

  isValidToken = () => {
    if (this.props.state.token) {
      return true;
    }
  };

  render() {
  return (
    <>
    <Router>
      <Routes>
      <Route  path="/" element={<Auth/>} />
      <Route  path="/home" element={this.isValidToken() ? <Home token={this.props.token}/> : <Navigate to ="/" />}/>
      <Route  path="/playlist" element={this.isValidToken() ? <Playlist token={this.props.token}/> : <Navigate to ="/" />} />
      <Route  path="*" element={<Auth/>} />

      </Routes>
    </Router>
    </>
  );
}
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (tokenText) =>
      dispatch({ type: "SET_TOKEN", payload: tokenText }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);