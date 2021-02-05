import { useContext } from "react";
import AppContext from "../../AppContext";
import GoogleOauthButton from "../../components/GoogleOauthButton/GoogleOauthButton";
import { WEBSITE_NAME } from "../../utilities/constants";
import "./Home.scss";

function Home() {
  const { user } = useContext(AppContext);

  return (
    <div className="Home">
      <div className="content">
        <div className="appName">{WEBSITE_NAME}</div>

        {/* Explicitly checking for false because null means unknown if logged in */}
        {user === false && (
          <div>
            <div className="loginPrompt">Log in or make an account!</div>
            <GoogleOauthButton />
          </div>
        )}

        {user && <div>Hi {user.givenName ?? user.displayName}!</div>}
      </div>
    </div>
  );
}

export default Home;
