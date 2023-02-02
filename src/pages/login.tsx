import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/react-learn"); // 登陆完成后返回到哪个界面
  };

  return (
    <div id="sign-in">
      <div className="sign-in">
        <div className="sign-in-block">
          <p>Sign in with Google to continue</p>
          <button className="sign-in-btn" onClick={signInWithGoogle}>
            sign in with Google
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
      </div>
    </div>
  );
};
