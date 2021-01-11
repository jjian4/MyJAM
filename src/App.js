import { useEffect, useState } from "react";

import AppMenuBar from "./components/AppMenuBar/AppMenuBar";
import Portfolio from "./pages/Portfolio/Portfolio";
import EditEntryModal from "./components/EditEntryModal/EditEntryModal";
import AppContext from "./AppContext";
import {
  fakeEntries,
  IS_CARD_COLORS_ON,
  LAST_BOARD_COLUMN_FILTER,
  LAST_BOARD_DENSITY,
  LAST_BOARD_SORT_PROPERTY,
  LAST_BOARD_IS_SORT_ASCENDING,
  LAST_PORTFOLIO_DISPLAY,
  LAST_TABLE_COLUMN_FILTER,
  LAST_TABLE_DENSITY,
  LAST_TABLE_SORT_PROPERTY,
  LAST_TABLE_IS_SORT_ASCENDING,
} from "./settings";
import "./App.scss";

function App() {
  const [isWindowSmall, setIsWindowSmall] = useState(window.innerWidth <= 991);
  const [portfolioSettings, setPortfolioSettings] = useState({});
  const [entries, setEntries] = useState([]);
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
    // TODO: fetch user's portfolio settings from db
    setPortfolioSettings({
      display: LAST_PORTFOLIO_DISPLAY,
      // Dashboard
      isCardColorOn: IS_CARD_COLORS_ON,
      boardDensity: LAST_BOARD_DENSITY,
      boardColumnFilter: LAST_BOARD_COLUMN_FILTER,
      boardSortProperty: LAST_BOARD_SORT_PROPERTY,
      boardIsSortAscending: LAST_BOARD_IS_SORT_ASCENDING,

      // TABLE
      tableDensity: LAST_TABLE_DENSITY,
      tableColumnFilter: LAST_TABLE_COLUMN_FILTER,
      tableSortProperty: LAST_TABLE_SORT_PROPERTY,
      tableIsSortAscending: LAST_TABLE_IS_SORT_ASCENDING,
    });

    // TODO: fetch portfolio entries from db
    setEntries(fakeEntries);

    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  // Resize portfolio menu items when window gets too small
  const resizeWindow = () => {
    setIsWindowSmall(window.innerWidth <= 991);
  };

  const updatePortfolioSettings = (settingsChange) => {
    setPortfolioSettings({ ...portfolioSettings, ...settingsChange });
    // TODO: update db
  };

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
        isWindowSmall: isWindowSmall,
        portfolioSettings: portfolioSettings,
        updatePortfolioSettings: updatePortfolioSettings,
        entries: entries,
        openNewEntryModal: openNewEntryModal,
        openEditEntryModal: openEditEntryModal,
        updateEntry: updateEntry,
      }}
    >
      <div className="App">
        <AppMenuBar />

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
