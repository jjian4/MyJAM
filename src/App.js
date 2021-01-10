import { useEffect, useState } from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";

import Portfolio from "./pages/Portfolio/Portfolio";
import "./App.scss";
import AppContext from "./AppContext";
import { fakeEntries } from "./settings";

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // TODO: fetch portfolio entries from db
    setEntries(fakeEntries);
  }, []);

  // Used when a card is drag-dropped to a new column in the dashboard
  const updateEntryStatus = (entryId, newStatus) => {
    const updatedEntries = [...entries];
    updatedEntries.find((entry) => entry.id === entryId).status = newStatus;
    setEntries(updatedEntries);
    // TODO
    console.log("TODO: Update database");
  };

  const updateEntry = (values) => {
    const updatedEntries = [...entries];
    const index = updatedEntries.findIndex((entry) => entry.id === values.id);
    updatedEntries[index] = values;
    setEntries(updatedEntries);
    // TODO: get values.entryId and update id in database
    console.log("TODO: Update database");
  };

  const saveNewEntry = (values) => {
    console.log(values);
    // TODO: add to database, add generated id to values, insert entry into column
    console.log("TODO: Update database");
  };

  return (
    <AppContext.Provider
      value={{
        entries: entries,
        updateEntryStatus: updateEntryStatus,
        updateEntry: updateEntry,
        saveNewEntry: saveNewEntry,
      }}
    >
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

            <Dropdown
              text="Username"
              pointing
              className="link item"
              icon={false}
            >
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
    </AppContext.Provider>
  );
}

export default App;
