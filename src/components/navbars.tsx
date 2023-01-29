import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Home</Link>
        {user ? (
          <Link to='/createpost'>Post</Link>
        ) :(
          <Link to="/login">Login</Link>
        )}
      </div>
      <div className="user">
        {user && (
          <div>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || ""} />
            <button className="cssbuttons-io-button" onClick={signUserOut}>
              Logout
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
