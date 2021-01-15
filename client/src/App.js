import { useEffect, useState } from "react";
import axios from "axios";

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
  IS_USER_LOGGED_IN,
} from "./utilities/settings";
import { PAGE } from "./utilities/constants";
import About from "./pages/About/About";
import "./App.scss";

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [isWindowSmall, setIsWindowSmall] = useState(window.innerWidth <= 991);
  const [page, setPage] = useState("");
  const [portfolioSettings, setPortfolioSettings] = useState({});
  const [entries, setEntries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
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
    const getCurrentUser = async () => {
      setLoading(true);

      const response = await axios.get("/api/current_user");
      const currentUser = response.data;
      if (currentUser) {
        setPage(PAGE.PORTFOLIO);
        loginUser(currentUser);
      } else {
        setPage(PAGE.ABOUT);
      }
      setLoading(false);
    };

    getCurrentUser();

    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  // Resize portfolio menu items when window gets too small
  const resizeWindow = () => {
    setIsWindowSmall(window.innerWidth <= 991);
  };

  const loginUser = (currentUser) => {
    // TODO: if new user, give default values
    setUser(currentUser);

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
  };

  const logoutUser = async () => {
    await axios.get("/api/logout");
    setUser(null);
    setPortfolioSettings({});
    setEntries([]);
    setPage(PAGE.ABOUT);
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
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        isWindowSmall: isWindowSmall,
        page: page,
        setPage: setPage,
        portfolioSettings: portfolioSettings,
        updatePortfolioSettings: updatePortfolioSettings,
        entries: entries,
        searchValue: searchValue,
        setSearchValue: setSearchValue,
        openNewEntryModal: openNewEntryModal,
        openEditEntryModal: openEditEntryModal,
        updateEntry: updateEntry,
      }}
    >
      <div className="App">
        <AppMenuBar />

        {loading && (
          <div className="loadingPage">
            <div className="loadingText">Loading...</div>
          </div>
        )}

        {page === PAGE.ABOUT && <About />}

        {page === PAGE.PORTFOLIO && (
          <>
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
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
