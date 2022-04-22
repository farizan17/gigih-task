import { useSelector } from "react-redux";
import "./dashboard.css";
import Login from "../implicit_grant/App";


export default function Dashboard() {
  const token = useSelector((state) => state.token.token);
  const validToken = () => {
    if (token) {
      return true;
    }
  };
  return (
      <div className="container">
        {validToken() ? (
          <>
            <div className="main">
              <h1>Selamat Datang</h1>
            </div>
            
          </>
        ) : (
          <Login />
        )}
      </div>
  );
}
