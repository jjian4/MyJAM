import { useContext, useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { fadeInRight } from "react-animations";
import { StyleSheet, css } from "aphrodite";
import AppContext from "../../AppContext";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import laptopPng from "./img/laptop.png";
import dashboardPng from "./img/dashboard.png";
import tablePng from "./img/table.png";
import filterPng from "./img/filter-cropped.png";
import entryPng from "./img/entry-cropped.png";
import dragDropPng from "./img/drag-and-drop-cropped.png";
import "./Home.scss";

// const animations = StyleSheet.create({
//   fadeInRight: {
//       animationName: fadeInRight,
//       animationDuration: '1.5s',
//   },
// });

function Home() {
  const { user } = useContext(AppContext);

  // Keep track of scroll position
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  const pronounToUse = user ? "my" : "your";

  return (
    <div className="Home">
      <div
        className={classnames("menuDivider", {
          "menuDivider-scrolled": scrollTop !== 0,
        })}
      />

      <div className="landing">
        <div className="landingLeft">
          <div>
            <div className="landingHeading">
              {/* Explicitly checking for false because null means unknown */}
              <div>{user ? "My" : "Your"} applications.</div>
              {/* <div>Job Applications.</div> */}
              <div>Organized.</div>
              <div>Simplified.</div>
            </div>
            <div className="landingText">
              MyJAM is a personal job application manager that offers
              customizable and easy-to-use tools to help organize {pronounToUse}{" "}
              positions. Plan, track, update, and celebrate — all in one
              workspace.
            </div>

            <div className="landingButtonRow">
              {/* Explicitly checking for false because null means unknown */}
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

      <div className="landingDivider" />

      <div className="displaySection">
        <div className="heading">Effortless Transitions</div>

        <div className="subHeading">
          Switch between Dashboard and Table view.
        </div>

        <div className="displayRows">
          <div className="displayRow dashboardRow">
            <div className="displayImgContainer dashboardImgContainer">
              <img src={dashboardPng} alt="dashboard example" />
            </div>
            <div className="displayDescContainer dashboardDescContainer">
              <div className="displayDesc dashboardDesc">
                <div className="descHeading">The dashboard</div>
                <div className="descText">
                  Oversee in the state of {pronounToUse} job search in a kanban
                  board.
                  <ul>
                    <li>
                      Reorder columns and entries with drag &amp; drop
                      functionality
                    </li>
                    <li>Sort by company, title, deadline, and more</li>
                    <li>
                      Display entries in three different card styles: Icons,
                      Compact, and Detailed
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="displayRow tableRow">
            <div className="displayImgContainer tableImgContainer">
              <img src={tablePng} alt="table example" />
            </div>
            <div className="displayDescContainer tableDescContainer">
              <div className="displayDesc tableDesc">
                <div className="descHeading">The table</div>
                <div className="descText">
                  Manage {pronounToUse} application data in a customizable
                  spreadsheet.
                  <ul>
                    <li>Edit any cell with a single click</li>
                    <li>Show and hide any field to remove clutter</li>
                    <li>
                      Display data in two different densities: Compact and
                      Comfortable
                    </li>
                    <li>
                      Download as an Excel spreadsheet to share with others
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="displaySectionDivider" />

      <div className="personalizeSection">
        <div className="heading">Personalize to suit {pronounToUse} needs</div>

        <div className="subHeading">
          Write notes, sort by deadline, expand board columns, and more!
        </div>

        <div className="personalizeExamples">
          <div className="personalizeExampleContainer">
            <div className="personalizeExample">
              <img src={entryPng} alt="entry example" />
              <div className="personalizeDesc">
                <div className="descHeading">Edit Entries</div>
                <div className="descText">
                  Save application links, record important dates, star{" "}
                  {pronounToUse} favorite positions, and more!
                </div>
              </div>
            </div>
          </div>
          <div className="personalizeExampleContainer">
            <div className="personalizeExample">
              <img src={dragDropPng} alt="drag and drop example" />
              <div className="personalizeDesc">
                <div className="descHeading">Drag &amp; Drop</div>
                <div className="descText">
                  Reorder dashboard cards, status columns, table fields, and
                  more with drag &amp; drop functionality.
                </div>
              </div>
            </div>
          </div>
          <div className="personalizeExampleContainer">
            <div className="personalizeExample">
              <img src={filterPng} alt="filter example" />
              <div className="personalizeDesc">
                <div className="descHeading">Filters &amp; Displays</div>
                <div className="descText">
                  Filter and sort entries on both the Dashboard and Table.
                  Condense or expand data to fit {pronounToUse} preferences.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottomButtonRow">
        {/* Explicitly checking for false because null means unknown */}
        {user === false && (
          <a className="oauthLink" href="/auth/google">
            <PrimaryButton className="oauthButton" size="big">
              Sign up – it's free!
            </PrimaryButton>
          </a>
        )}

        {user && (
          <Link className="portfoliosLink" to="/portfolio">
            <PrimaryButton className="portfoliosButton" size="big">
              Go to portfolio
            </PrimaryButton>
          </Link>
        )}
      </div>

      <div className="footer">
        &copy; James Jiang 2021 | All Rights Reserved
      </div>
    </div>
  );
}

export default Home;
