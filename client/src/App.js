import { useEffect, useState } from "react";
import axios from "axios";

import AppMenuBar from "./components/AppMenuBar/AppMenuBar";
import Portfolio from "./pages/Portfolio/Portfolio";
import EditEntryModal from "./components/EditEntryModal/EditEntryModal";
import AppContext from "./AppContext";
import { fakeEntries } from "./utilities/settings";
import {
  PORTFOLIO_DISPLAY,
  BOARD_DENSITY,
  TABLE_DENSITY,
  BOARD_SORT_BY,
  PAGE,
  TABLE_COLUMNS,
  DEFAULT_BOARD_COLUMN_FILTER,
  DEFAULT_TABLE_COLUMN_FILTER,
} from "./utilities/constants";
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
        console.log(currentUser);
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

    const {
      display,
      isCardColorOn,
      boardDensity,
      boardColumnFilter,
      boardSortProperty,
      boardIsSortAscending,
      tableDensity,
      tableColumnFilter,
      tableSortProperty,
      tableIsSortAscending,
    } = currentUser.portfolioSettings;

    // Use default setting if one isn't already set in database
    setPortfolioSettings({
      display: display || PORTFOLIO_DISPLAY.BOARD.name,
      isCardColorOn: isCardColorOn || true,
      // Dashboard
      boardDensity: boardDensity || BOARD_DENSITY.COMPACT.name,
      boardColumnFilter:
        boardColumnFilter.length === 0
          ? DEFAULT_BOARD_COLUMN_FILTER
          : boardColumnFilter,
      boardSortProperty:
        boardSortProperty || BOARD_SORT_BY.LAST_UPDATE.property,
      boardIsSortAscending:
        boardIsSortAscending || BOARD_SORT_BY.LAST_UPDATE.isDefaultAscending,
      // TABLE
      tableDensity: tableDensity || TABLE_DENSITY.COMFORTABLE.name,
      tableColumnFilter:
        tableColumnFilter.length === 0
          ? DEFAULT_TABLE_COLUMN_FILTER
          : tableColumnFilter,
      tableSortProperty: tableSortProperty || TABLE_COLUMNS.COMPANY.property,
      tableIsSortAscending: tableIsSortAscending || true,
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

    // TODO: use a timer to limit number of api calls / db changes
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

        {!loading && page === PAGE.ABOUT && <About />}

        {!loading && page === PAGE.PORTFOLIO && (
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
