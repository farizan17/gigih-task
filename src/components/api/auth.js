// import React, { Component } from "react";
// import { connect } from "react-redux";
// import Login from "../../pages/implicit_grant/App";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Home from "../../pages/home";
// import Dashboard from "../../pages/dashboard/dashboard";

// class Auth extends Component {
//   componentDidMount() {
//     const hash = window.location.hash
//       .substring(1)
//       .split("&")
//       .reduce(function (initial, item) {
//         if (item) {
//           var parts = item.split("=");
//           initial[parts[0]] = decodeURIComponent(parts[1]);
//         }
//         return initial;
//       }, {});
//     let foundToken = hash.access_token;
//     if (foundToken) {
//       this.props.setToken(foundToken);
//     }
//   }
//   isValidToken = () => {
//     if (this.props.state.token) {
//       return true;
//     }
//   };
//   render() {
//     return (
//       <>
//       {this.isValidToken? (<Dashboard /> ) : (<Login />)}
//       </>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//     return {
//       state,
//     };
//   };
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       setToken: (tokenText) =>
//         dispatch({ type: "SET_TOKEN", payload: tokenText }),
//     };
//   };
  
//   export default connect(mapStateToProps, mapDispatchToProps)(Auth);