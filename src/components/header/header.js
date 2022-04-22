import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeToken } from "../api/redux/slice"
import { useDispatch } from "react-redux";
import { Button} from '@chakra-ui/react'
import "./header.css";

export default function Header() {
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();
  const validToken = () => {
    if (token) {
      return true;
    }
  };
  return (
    <>
      {validToken() ? (
        <div className="header">
          <div className="navigation">
          <NavLink to="/dashboard">
            <p>Dashboard</p>
          </NavLink>
          <NavLink to="/home">
            <p>Home</p>
          </NavLink>
          </div>
          <NavLink to="/">
          <Button onClick={() => dispatch(removeToken())}>Logout</Button>
          </NavLink>
        </div>
      ) : (
        <div className="header-nonlogin">
          <h1>Silahkan Login</h1>
        </div>
      )}
    </>
  );
}
