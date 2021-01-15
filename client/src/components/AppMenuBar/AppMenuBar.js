import { useContext } from "react";
import { Menu, Dropdown, Image, Button } from "semantic-ui-react";
import AppContext from "../../AppContext";
import { PAGE } from "../../utilities/constants";
import "./AppMenuBar.scss";

function AppMenuBar() {
  const { user, logoutUser, setPage } = useContext(AppContext);

  return (
    <Menu className="AppMenuBar" fixed="top" borderless inverted>
      <Menu.Item as="a">
        <Image className="appLogo" src="https://logo.clearbit.com/umich.edu" />
        <span className="appName">Website Name</span>
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
          <Dropdown.Item>Edit Portfolios</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Menu position="right">
        <Menu.Item as="a" onClick={() => console.log(user)}>
          USER
        </Menu.Item>
        <Menu.Item as="a" onClick={() => setPage(PAGE.PORTFOLIO)}>
          PORTFOLIO
        </Menu.Item>
        <Menu.Item as="a" onClick={() => setPage(PAGE.ABOUT)}>
          ABOUT
        </Menu.Item>

        {user ? (
          <Dropdown text="Username" pointing className="link item" icon={false}>
            <Dropdown.Menu>
              <Dropdown.Item>Portfolios</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
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
