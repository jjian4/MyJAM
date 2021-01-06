import { Menu, Dropdown, Image } from "semantic-ui-react";

import Portfolio from "./pages/Portfolio/Portfolio";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Menu className="menuBar" fixed="top" borderless inverted>
        <Menu.Item as="a">
          <Image
            className="menuBarLogo"
            src="https://logo.clearbit.com/umich.edu"
          />
          <span className="menuBarName">Website Name</span>
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
          <Menu.Item as="a">Find More Jobs</Menu.Item>

          <Dropdown text="Username" pointing className="link item" icon={false}>
            <Dropdown.Menu>
              {/* <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider /> */}
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>

      <Portfolio />
    </div>
  );
}

export default App;
