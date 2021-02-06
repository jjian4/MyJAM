import { useState } from "react";
import googleButton from "./btn_google_signin_light_normal_web.png";
import googleButtonHovered from "./btn_google_signin_light_pressed_web.png";
import "./GoogleOauthButton.scss";

function GoogleOauthButton() {
  const [isGoogleButtonHovered, setIsGoogleButtonHovered] = useState(false);

  return (
    <a className="GoogleOauthButton" href="/auth/google">
      <img
        src={isGoogleButtonHovered ? googleButtonHovered : googleButton}
        onMouseEnter={() => setIsGoogleButtonHovered(true)}
        onMouseOut={() => setIsGoogleButtonHovered(false)}
        alt="Log in with google"
      />
    </a>
  );
}

export default GoogleOauthButton;
