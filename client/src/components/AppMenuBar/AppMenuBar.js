import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, Dropdown, Image, Button } from "semantic-ui-react";
import AppContext from "../../AppContext";
import "./AppMenuBar.scss";

function AppMenuBar() {
  const history = useHistory();

  const {
    user,
    portfoliosList,
    openPortfoliosModal,
    currentPortfolioId,
  } = useContext(AppContext);

  const currentPortfolio = portfoliosList.find(
    (x) => x.id === currentPortfolioId
  );

  return (
    <Menu className="AppMenuBar" fixed="top" borderless inverted>
      <Menu.Item>
        <Image className="appLogo" src="https://logo.clearbit.com/umich.edu" />
        <Link className="appName" to={user ? "/portfolio" : "/"}>
          Job App Tool
        </Link>
      </Menu.Item>

      {currentPortfolio && (
        <Dropdown
          className="portfolioSelector link item"
          text={currentPortfolio.name}
          pointing
        >
          <Dropdown.Menu>
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

      <Menu.Menu position="right">
        <Menu.Item as="a" onClick={() => console.log(user)}>
          USER
        </Menu.Item>
        <Menu.Item>
          <Link to="/portfolio">PORTFOLIO</Link>
        </Menu.Item>

        <Menu.Item>
          <Link to="/">ABOUT</Link>
        </Menu.Item>

        {user ? (
          <Dropdown
            text={user.displayName || user.givenName}
            pointing
            className="link item"
            icon={false}
          >
            <Dropdown.Menu>
              <Dropdown.Item>Portfolios</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
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
      </Menu.Menu>
    </Menu>
  );
}

export default AppMenuBar;
