import {
  faCommentDots,
  faFolder,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, Dropdown, Button } from "semantic-ui-react";
import AppContext from "../../AppContext";
import { WEBSITE_NAME } from "../../utilities/constants";
import DropdownButton from "../DropdownButton/DropdownButton";
import "./AppMenuBar.scss";

function AppMenuBar() {
  const history = useHistory();

  const {
    user,
    portfoliosList,
    openPortfoliosModal,
    currentPortfolioId,
  } = useContext(AppContext);

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const currentPortfolio = portfoliosList.find(
    (x) => x.id === currentPortfolioId
  );

  return (
    <div className="AppMenuBar">
      <div className="menuLeft">
        <Link className="appLogoAndName" to={user ? "/portfolio" : "/"}>
          <img
            className="appLogo"
            src="https://logo.clearbit.com/reactjs.org"
            alt="appLogo"
          />
          <span className="appName">{WEBSITE_NAME}</span>
        </Link>

        {currentPortfolio && (
          <Dropdown
            className="portfolioSelector"
            trigger={
              <DropdownButton
                className="dropdownButton"
                size="small"
                inverted
                icon={"folder"}
                text={currentPortfolio.name}
              />
            }
            icon={false}
            direction={"right"}
          >
            <Dropdown.Menu className="dropdownMenu">
              {portfoliosList.map((portfolio, index) => (
                <Dropdown.Item
                  key={index}
                  active={portfolio.id === currentPortfolioId}
                  onClick={() => history.push(`/portfolio/${portfolio.id}`)}
                >
                  <div className="dropdownRow">
                    <span className="portfolioName">{portfolio.name}</span>
                    <span className="numEntries">({portfolio.numEntries})</span>
                  </div>
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item onClick={openPortfoliosModal}>
                Edit Portfolios
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      <div className="menuRight">
        {user ? (
          <Dropdown
            className="userDropdown"
            trigger={
              <DropdownButton
                className={`dropdownButton ${
                  isUserDropdownOpen ? "dropdownButton-open" : ""
                }`}
                size="medium"
                icon="user"
                text={user.displayName}
              />
            }
            icon={false}
            direction="left"
            onOpen={() => setIsUserDropdownOpen(true)}
            onClose={() => setIsUserDropdownOpen(false)}
          >
            <Dropdown.Menu className="dropdownMenu">
              <Dropdown.Item
                className="dropdownHeading"
                // onClick={(e) => e.stopPropagation()}
              >
                <div className="userCircle">
                  <FontAwesomeIcon icon={faUserCircle} />
                </div>
                <div className="displayName">{user.displayName}</div>
                <div className="email">fake@email.com</div>
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item>
                <FontAwesomeIcon className="optionIcon" icon={faUser} /> My
                Profile
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon className="optionIcon" icon={faFolder} /> My
                Portfolios
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon className="optionIcon" icon={faCommentDots} />
                Give us Feedback
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="a" href="/api/logout">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Menu.Item>
            <a href="/auth/google">
              <Button basic circular inverted>
                Sign in with Google
              </Button>
            </a>
          </Menu.Item>
        )}
      </div>
    </div>
  );
}

export default AppMenuBar;
