import { useContext } from "react";
import { Button } from "semantic-ui-react";
import AppContext from "../../AppContext";
import "./About.scss";

function About() {
  const { user } = useContext(AppContext);

  return (
    <div className="About">
      <div className="content">
        <div className="appName">
          {user ? `Hi ${user.givenName || user.displayName}!` : "Job App Tool"}
        </div>

        {!user && (
          <a href="/auth/google">
            <Button basic circular>
              Sign in with Google
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}

export default About;
