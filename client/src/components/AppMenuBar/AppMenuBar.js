import { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button, Dropdown } from "semantic-ui-react";
import classnames from "classnames";
import {
  faCommentDots,
  faFolder,
  faPencilAlt,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppContext from "../../AppContext";
import { WEBSITE_NAME } from "../../utilities/constants";
import DropdownButton from "../DropdownButton/DropdownButton";
import "./AppMenuBar.scss";

function AppMenuBar() {
  const history = useHistory();
  const location = useLocation();

  const {
    user,
    openProfileModal,
    portfoliosList,
    openPortfoliosModal,
    currentPortfolioId,
  } = useContext(AppContext);

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const currentPortfolio = portfoliosList?.find(
    (x) => x.id === currentPortfolioId
  );

  return (
    <div className="AppMenuBar">
      <div className="menuLeft">
        <Link className="appLogoAndName" to="/">
          <div className="appLogo">J</div>
          <span className="appName">{WEBSITE_NAME}</span>
        </Link>

        {currentPortfolio && (
          <Dropdown
            className="portfolioSelector"
            trigger={
              <Link to={`/portfolio/${currentPortfolio.id}`}>
                <DropdownButton
                  className="dropdownButton"
                  size="small"
                  circular
                  icon={"folder"}
                  text={currentPortfolio.name}
                />
              </Link>
            }
            icon={false}
            direction={"right"}
          >
            <Dropdown.Menu className="dropdownMenu">
              {portfoliosList.map((portfolio, index) => (
                <Dropdown.Item
                  key={index}
                  active={portfolio.id === currentPortfolio.id}
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
                <FontAwesomeIcon className="editIcon" icon={faPencilAlt} /> Edit
                Portfolios
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}

        {!currentPortfolio && user && location.pathname === "/" && (
          <Link className="portfoliosLink" to="/portfolio">
            <Button className="portfoliosButton" size="small" circular>
              My Portfolios
            </Button>
          </Link>
        )}
      </div>

      <div className="menuRight">
        {user && (
          <Dropdown
            className="userDropdown"
            trigger={
              <>
                <DropdownButton
                  className={classnames("dropdownButton", {
                    "dropdownButton-open": isUserDropdownOpen,
                  })}
                  size="medium"
                  icon="user"
                  circular
                  text={user.displayName}
                />

                {user.photo ? (
                  <img
                    className={classnames("dropdownCircleButton", {
                      "dropdownCircleButton-open": isUserDropdownOpen,
                    })}
                    src={user.photo}
                    alt="profile"
                  />
                ) : (
                  <FontAwesomeIcon
                    className={classnames("dropdownCircleButton", {
                      "dropdownCircleButton-open": isUserDropdownOpen,
                    })}
                    icon={faUserCircle}
                  />
                )}
              </>
            }
            icon={false}
            direction="left"
            onOpen={() => setIsUserDropdownOpen(true)}
            onClose={() => setIsUserDropdownOpen(false)}
          >
            <Dropdown.Menu className="dropdownMenu">
              <Dropdown.Item
                className="dropdownHeading"
                onClick={openProfileModal}
                // onClick={(e) => e.stopPropagation()}
              >
                <div className="userPhotoRow">
                  {user.photo ? (
                    <img className="photo" src={user.photo} alt="profile" />
                  ) : (
                    <FontAwesomeIcon className="photo" icon={faUserCircle} />
                  )}
                </div>
                <div className="displayName">{user.displayName}</div>
                {user.email && <div className="email">{user.email}</div>}
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item onClick={openProfileModal}>
                <FontAwesomeIcon className="optionIcon" icon={faUser} /> My
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={openPortfoliosModal}>
                <FontAwesomeIcon className="optionIcon" icon={faFolder} /> My
                Portfolios
              </Dropdown.Item>
              <Dropdown.Item onClick={() => alert("TODO")}>
                <FontAwesomeIcon className="optionIcon" icon={faCommentDots} />
                Give us Feedback
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="a" href="/api/logout">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {/* Explicitly checking for false because null means unknown */}
        {user === false && (
          // <GoogleOauthButton />
          <a className="oauthLink" href="/auth/google">
            <Button className="oauthButton" size="small" circular>
              Login
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}

export default AppMenuBar;
