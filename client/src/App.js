import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import AppMenuBar from "./components/AppMenuBar/AppMenuBar";
import Portfolio from "./pages/Portfolio/Portfolio";
import About from "./pages/About/About";
import EditPortfoliosModal from "./components/EditPortfoliosModal/EditPortfoliosModal";
import EditEntryModal from "./components/EditEntryModal/EditEntryModal";
import AppContext from "./AppContext";
import {
  PORTFOLIO_DISPLAY,
  BOARD_DENSITY,
  TABLE_DENSITY,
  BOARD_SORT_BY,
  TABLE_COLUMNS,
  DEFAULT_BOARD_COLUMN_FILTER,
  DEFAULT_TABLE_COLUMN_FILTER,
} from "./utilities/constants";
import "./App.scss";

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [isWindowSmall, setIsWindowSmall] = useState(window.innerWidth <= 991);
  const [portfolioSettings, setPortfolioSettings] = useState({});
  const [portfoliosList, setPortfoliosList] = useState([]);
  const [isPortfoliosModalOpen, setIsPortfoliosModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPortfolioId, setCurrentPortfolioId] = useState("");
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
    const getCurrentUser = async () => {
      setLoading(true);

      const response = await axios.get("/api/current_user");
      const currentUser = response.data;
      if (currentUser) {
        console.log(currentUser);
        await loginUser(currentUser);
      }
      setLoading(false);
    };

    getCurrentUser();

    // TODO: GET PORTFOLIOS AND ENTRIES

    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  // Using a timer to update db every few seconds in chunks, instead of many small changes
  const updatePortfolioSettingsTimeoutRef = useRef();
  useEffect(() => {
    clearTimeout(updatePortfolioSettingsTimeoutRef.current);

    updatePortfolioSettingsTimeoutRef.current = setTimeout(async () => {
      if (!user) {
        return;
      }
      try {
        await axios.put("/api/portfolio_settings", {
          newPortfolioSettings: portfolioSettings,
        });
      } catch (e) {
        console.log(e);
      }
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioSettings]);

  // Resize portfolio menu items when window gets too small
  const resizeWindow = () => {
    setIsWindowSmall(window.innerWidth <= 991);
  };

  const loginUser = async (currentUser) => {
    setUser(currentUser);

    // Initialize portfolio settingss
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
    // Set default settings if field isn't already set in database
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

    // Initialize portfolios
    const response = await axios.get("/api/portfolios");
    setPortfoliosList(response.data);
  };

  const updatePortfolioSettings = async (settingsChange) => {
    for (const property in settingsChange) {
      // Ignore if nothing changed
      if (!_.isEqual(settingsChange[property], portfolioSettings[property])) {
        setPortfolioSettings({ ...portfolioSettings, ...settingsChange });
        return;
      }
    }
  };

  const openPortfoliosModal = () => {
    setIsPortfoliosModalOpen(true);
  };

  const updatePortfoliosList = async (newPortfoliosList) => {
    // Save to db first to get newly generated ids for new portfolios
    try {
      setLoading(true);
      const response = await axios.put("/api/portfolios", {
        newPortfoliosList: newPortfoliosList,
      });
      setPortfoliosList(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }

    // TODO: update current portfolio if there was initially no portfolio
  };

  const handlePortfolioChange = async (id) => {
    try {
      const response = await axios.get(`/api/entries/${id}`);
      setEntries(response.data);
      setCurrentPortfolioId(id);
    } catch (e) {
      console.log(e);
    }
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

  const saveNewEntry = async (values) => {
    console.log(values);
    // Save to db first to get newly generated ids for new entry
    try {
      const response = await axios.post(`/api/entry`, {
        portfolioId: currentPortfolioId,
        entry: values,
      });
      console.log(response.data);
      // Add entry on frontend as well
      setEntries([...entries, response.data]);
      // Update numEntries in portfolio list
      const portfolioIndex = portfoliosList.findIndex(
        (x) => x.id === currentPortfolioId
      );
      setPortfoliosList([
        ...portfoliosList.slice(0, portfolioIndex),
        {
          ...portfoliosList[portfolioIndex],
          numEntries: portfoliosList[portfolioIndex].numEntries + 1,
        },
        ...portfoliosList.slice(portfolioIndex + 1),
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user: user,
        isWindowSmall: isWindowSmall,
        portfolioSettings: portfolioSettings,
        updatePortfolioSettings: updatePortfolioSettings,
        portfoliosList: portfoliosList,
        openPortfoliosModal: openPortfoliosModal,
        searchValue: searchValue,
        setSearchValue: setSearchValue,
        currentPortfolioId: currentPortfolioId,
        entries: entries,
        openNewEntryModal: openNewEntryModal,
        openEditEntryModal: openEditEntryModal,
        updateEntry: updateEntry,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <AppMenuBar />

          {loading && (
            <div className="loadingPage">
              <div className="loadingText">Loading...</div>
            </div>
          )}

          {!loading && <Route exact path="/" component={About} />}

          {!loading && user && (
            <>
              <Route
                exact
                path={["/portfolio", "/portfolio/:id"]}
                render={(props) => (
                  <Portfolio
                    {...props}
                    onPortfolioChange={handlePortfolioChange}
                  />
                )}
              />
            </>
          )}

          {/* Used to edit and reorder portfolios */}
          <EditPortfoliosModal
            open={isPortfoliosModalOpen}
            onClose={() => setIsPortfoliosModalOpen(false)}
            onSave={updatePortfoliosList}
          />
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
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
