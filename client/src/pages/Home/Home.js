import { useContext } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import laptopPng from "./laptop.png";
import dashboardPng from "./dashboard.png";
import tablePng from "./table.png";
import "./Home.scss";

function Home() {
  const { user } = useContext(AppContext);

  return (
    <div className="Home">
      <div className="landing">
        <div className="landingLeft">
          <div>
            <div className="landingHeading">
              <div>My applications.</div>
              <div>Organized.</div>
              <div>Simplified.</div>
            </div>
            <div className="landingText">
              MyJAM is your personal job application manager that offers
              customizable and easy-to-use tools to help you organize your
              positions. Plan, track, update, and celebrate — all in one
              workspace.
            </div>

            <div className="landingButtonRow">
              {/* Explicitly checking for false because null means unknown if logged in */}
              {user === false && (
                <a className="oauthLink" href="/auth/google">
                  <Button className="oauthButton" size="large" circular>
                    Sign up for free
                  </Button>
                </a>
              )}

              {user && (
                <Link className="portfoliosLink" to="/portfolio">
                  <Button className="portfoliosButton" size="large" circular>
                    See my portfolio
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="landingRight">
          <img className="landingLaptop" src={laptopPng} alt="landing laptop" />
        </div>
      </div>

      <div className="section-2">
        <div className="heading">Effortless Transitions</div>

        <div className="subHeading">
          Switch between Dashboard and Table view.
        </div>

        <div className="displayExamples">
          <div className="displayExample">
            <img src={dashboardPng} alt="dashboard example" />
          </div>
          <div className="displayExample">
            <img src={tablePng} alt="table example" />
          </div>
        </div>
      </div>

      <div className="section-3">
        <div className="heading">Personalize to suit my needs</div>

        <div className="subHeading">
          Write notes, sort by deadline, expand board columns, and more!
        </div>

        <div className="personalizationExamples">TODO</div>
      </div>
    </div>
  );
}

export default Home;
