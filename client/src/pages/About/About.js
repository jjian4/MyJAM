import { Button } from "semantic-ui-react";
import "./About.scss";

function About() {
  return (
    <div className="About">
      <div className="content">
        <div className="appName">Testing Auth</div>

        <a href="/auth/google">
          <Button basic circular>
            Sign in with Google
          </Button>
        </a>
      </div>
    </div>
  );
}

export default About;
