import { useState } from "react";
import googleButton from "./btn_google_signin_light_normal_web.png";
import googleButtonPressed from "./btn_google_signin_light_pressed_web.png";
import "./GoogleOauthButton.scss";

function GoogleOauthButton() {
  const [isGoogleButtonPressed, setIsGoogleButtonPressed] = useState(false);

  return (
    <a className="GoogleOauthButton" href="/auth/google">
      <img
        src={isGoogleButtonPressed ? googleButtonPressed : googleButton}
        onMouseDown={() => setIsGoogleButtonPressed(true)}
        onMouseOut={() => setIsGoogleButtonPressed(false)}
        alt="Log in with google"
      />
    </a>
  );
}

export default GoogleOauthButton;
