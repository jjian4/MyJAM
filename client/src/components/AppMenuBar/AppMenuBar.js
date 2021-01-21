import { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Image, Button } from "semantic-ui-react";
import AppContext from "../../AppContext";
import "./AppMenuBar.scss";

function AppMenuBar() {
  const { user, openPortfoliosModal } = useContext(AppContext);

  return (
    <Menu className="AppMenuBar" fixed="top" borderless inverted>
      <Menu.Item>
        <Image className="appLogo" src="https://logo.clearbit.com/umich.edu" />
        <Link className="appName" to={user ? "/portfolio" : "/"}>
          Job App Tool
        </Link>
      </Menu.Item>

      <Dropdown
        className="portfolioSelector link item"
        text="Summer Internships 2019"
        pointing
      >
        <Dropdown.Menu>
          <Dropdown.Item>Summer Internships 2019</Dropdown.Item>
          <Dropdown.Item>Summer 2018</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={openPortfoliosModal}>
            Edit Portfolios
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

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
