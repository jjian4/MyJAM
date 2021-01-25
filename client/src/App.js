import { useEffect, useRef, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import AppMenuBar from "./components/AppMenuBar/AppMenuBar";
import Portfolio from "./pages/Portfolio/Portfolio";
import Home from "./pages/Home/Home";
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
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(false);

  const [user, setUser] = useState(null);

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

  const history = useHistory();

  useEffect(() => {
    const getCurrentUser = async () => {
      setIsUserLoading(true);

      const response = await axios.get("/api/current_user");
      const currentUser = response.data;
      if (currentUser) {
        console.log(currentUser);
        await loginUser(currentUser);
      } else {
        setUser(false); // Set to false instead of null to indicate we already checked
      }
      setIsUserLoading(false);
    };

    getCurrentUser();
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

  const loginUser = async (currentUser) => {
    setUser(currentUser);

    // Initialize portfolio settings, set default values if not in database
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

  const updatePortfoliosList = async (newPortfoliosList) => {
    // Save to db first to get newly generated ids for new portfolios
    try {
      setIsPortfolioLoading(true);
      const response = await axios.put("/api/portfolios", {
        newPortfoliosList: newPortfoliosList,
      });
      setPortfoliosList(response.data);

      // Update current portfolio if it is no longer valid
      if (
        response.data.length > 0 &&
        !response.data.find((x) => x.id === currentPortfolioId)
      ) {
        history.push(`/portfolio/${response.data[0].id}`);
      }

      setIsPortfolioLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const changeCurrentPortfolio = async (id) => {
    try {
      setIsPortfolioLoading(true);
      const response = await axios.get(`/api/entries/${id}`);
      setEntries(response.data);
      setCurrentPortfolioId(id);
      setIsPortfolioLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const saveNewEntry = async (values) => {
    // Save to db first to get newly generated ids for new entry
    try {
      const response = await axios.post(`/api/entry`, {
        portfolioId: currentPortfolioId,
        entry: values,
      });
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

  const updateEntry = async (values) => {
    // values only needs to include the properties that changed (but always needs id)
    try {
      const indexToUpdate = entries.findIndex(
        (entry) => entry.id === values.id
      );
      setEntries([
        ...entries.slice(0, indexToUpdate),
        { ...entries[indexToUpdate], ...values },
        ...entries.slice(indexToUpdate + 1),
      ]);

      await axios.patch(`/api/entry`, {
        portfolioId: currentPortfolioId,
        newValues: values,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteEntry = async (entryId) => {
    try {
      const indexToDelete = entries.findIndex((entry) => entry.id === entryId);
      setEntries([
        ...entries.slice(0, indexToDelete),
        ...entries.slice(indexToDelete + 1),
      ]);

      await axios.delete(`/api/entry`, {
        data: {
          portfolioId: currentPortfolioId,
          entryId: entryId,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const loadingText = isUserLoading
    ? "Loading..."
    : isPortfolioLoading
    ? "Loading Portfolio..."
    : null;

  return (
    <AppContext.Provider
      value={{
        user: user,
        portfolioSettings: portfolioSettings,
        updatePortfolioSettings: updatePortfolioSettings,
        portfoliosList: portfoliosList,
        openPortfoliosModal: () => setIsPortfoliosModalOpen(true),
        currentPortfolioId: currentPortfolioId,
        entries: entries,
        openNewEntryModal: (initialValues) =>
          setNewEntryModal({
            isOpen: true,
            initialValues: initialValues,
            autoFocusProperty: "company",
          }),
        openEditEntryModal: (entryId, autoFocusProperty = null) =>
          setEditEntryModal({
            isOpen: true,
            initialValues: entries.find((entry) => entry.id === entryId),
            autoFocusProperty: autoFocusProperty,
          }),
        updateEntry: updateEntry,
        searchValue: searchValue,
        setSearchValue: setSearchValue,
      }}
    >
      <div className="App">
        <AppMenuBar />

        {loadingText && (
          <div className="loadingPage">
            <div className="loadingText">{loadingText}</div>
          </div>
        )}

        {!loadingText && <Route exact path="/" component={Home} />}

        {!loadingText && user && (
          <>
            <Route
              exact
              path={["/portfolio", "/portfolio/:id"]}
              render={(props) => (
                <Portfolio
                  {...props}
                  onPortfolioChange={changeCurrentPortfolio}
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
          onDelete={deleteEntry}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
