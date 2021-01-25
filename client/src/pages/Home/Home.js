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
        <div className="appName">
          {user ? `Hi ${user.givenName || user.displayName}!` : WEBSITE_NAME}
        </div>

        {/* Explicitly checking for false because null means unknown if logged in */}
        {user === false && <GoogleOauthButton />}
      </div>
    </div>
  );
}

export default Home;
