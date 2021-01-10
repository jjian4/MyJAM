import { useEffect, useState } from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";

import Portfolio from "./pages/Portfolio/Portfolio";
import EditEntryModal from "./components/EditEntryModal/EditEntryModal";
import AppContext from "./AppContext";
import { fakeEntries } from "./settings";
import "./App.scss";

function App() {
  const [entries, setEntries] = useState([]);

  // Edit Entry Modals
  const [newEntryModal, setNewEntryModal] = useState({
    isOpen: false,
    initialValues: {},
    autoFocusProperty: null,
  });
  const [editEntryModal, setEditEntryModal] = useState({
    isOpen: false,
    initialValues: {},
    autoFocusProperty: null,
  });

  useEffect(() => {
    // TODO: fetch portfolio entries from db
    setEntries(fakeEntries);
  }, []);

  const openNewEntryModal = (initialValues) => {
    setNewEntryModal({
      isOpen: true,
      initialValues: initialValues,
      autoFocusProperty: "company",
    });
  };

  const openEditEntryModal = (entryId, autoFocusProperty = null) => {
    setEditEntryModal({
      isOpen: true,
      initialValues: entries.find((entry) => entry.id === entryId),
      autoFocusProperty: autoFocusProperty,
    });
  };

  const updateEntry = (values) => {
    // values only needs to include the properties that changed (but always needs id)
    const indexToUpdate = entries.findIndex((entry) => entry.id === values.id);
    setEntries([
      ...entries.slice(0, indexToUpdate),
      { ...entries[indexToUpdate], ...values },
      ...entries.slice(indexToUpdate + 1),
    ]);
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
        openNewEntryModal: openNewEntryModal,
        openEditEntryModal: openEditEntryModal,
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

        {/* Used to add new entries */}
        <EditEntryModal
          open={newEntryModal.isOpen}
          onClose={() =>
            setNewEntryModal({
              isOpen: false,
              initialValues: {},
              autoFocusProperty: null,
            })
          }
          heading="New Entry"
          initialValues={newEntryModal.initialValues}
          autoFocusProperty={newEntryModal.autoFocusProperty}
          onSave={saveNewEntry}
        />
        {/* Used to edit existing entries */}
        <EditEntryModal
          open={editEntryModal.isOpen}
          onClose={() =>
            setEditEntryModal({
              isOpen: false,
              initialValues: {},
              autoFocusProperty: null,
            })
          }
          heading={`${editEntryModal.initialValues.company} - ${editEntryModal.initialValues.jobTitle}`}
          initialValues={editEntryModal.initialValues}
          autoFocusProperty={editEntryModal.autoFocusProperty}
          onSave={updateEntry}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
