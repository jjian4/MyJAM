import { Menu, Container, Dropdown, Image } from 'semantic-ui-react'

import Portfolio from "./pages/Portfolio/Portfolio";
import DashboardColumn from "./components/DashboardColumn/DashboardColumn";
import "./App.scss";


function App() {
  return (
    <div className="App">
      <Menu className='menuBar' fixed='top' borderless inverted>
        <Container>
          <Menu.Item as='a'>
            <Image className='menuBarLogo' src='https://logo.clearbit.com/umich.edu' />
            <span className='menuBarName'>Website Name</span>
          </Menu.Item>

          <Menu.Item as='a'>Portfolio</Menu.Item>
          <Menu.Item as='a'>Find More Jobs</Menu.Item>

          <Menu.Menu position='right'>
            <Dropdown text='Username' pointing className='link item' icon={false}>
              <Dropdown.Menu>
                {/* <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider /> */}
                <Dropdown.Item>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>

      <Portfolio />

      <DashboardColumn />
    </div>
  );
}

export default App;
