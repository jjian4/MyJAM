import { useEffect, useRef, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import AppMenuBar from "./components/AppMenuBar/AppMenuBar";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import Portfolio from "./pages/Portfolio/Portfolio";
import Home from "./pages/Home/Home";
import ProfileModal from "./components/ProfileModal/ProfileModal";
import PortfoliosModal from "./components/PortfoliosModal/PortfoliosModal";
import EntryModal from "./components/EntryModal/EntryModal";
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
import StatusListModal from "./components/StatusListModal/StatusListModal";

function App() {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [isPortfolioLoading, setIsPortfolioLoading] = useState(false);
  const [portfoliosList, setPortfoliosList] = useState(null);
  const [isPortfoliosModalOpen, setIsPortfoliosModalOpen] = useState(false);
  const [currentPortfolioId, setCurrentPortfolioId] = useState("");
  const [displaySettings, setDisplaySettings] = useState({});
  const [isStatusListModalOpen, setIsStatusListModalOpen] = useState(false);
  const [entries, setEntries] = useState(null);
  const [newEntryModal, setNewEntryModal] = useState({
    isOpen: false,
    initialValues: {},
    autoFocusProperty: null,
  });
  const [editEntryModal, setEntryModal] = useState({
    isOpen: false,
    initialValues: {},
    autoFocusProperty: null,
  });
  const [searchValue, setSearchValue] = useState("");

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
  const updateDisplaySettingsTimeoutRef = useRef();
  useEffect(() => {
    clearTimeout(updateDisplaySettingsTimeoutRef.current);

    updateDisplaySettingsTimeoutRef.current = setTimeout(async () => {
      if (!user) {
        return;
      }
      try {
        await axios.put("/api/display_settings", {
          portfolioId: currentPortfolioId,
          newDisplaySettings: displaySettings,
        });
      } catch (e) {
        console.log(e);
      }
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displaySettings]);

  const loginUser = async (currentUser) => {
    setUser(currentUser);

    // Initialize portfolios
    const response = await axios.get("/api/portfolios_summary");
    setPortfoliosList(response.data);
  };

  const deleteAccount = async () => {
    try {
      await axios.delete("/api/current_user");
    } catch (e) {
      console.log(e);
    }
    // history.push doesn't work bc it's only for react router routes
    window.location.href = "/api/logout";
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
      const response = await axios.get(`/api/portfolio/${id}`);
      setCurrentPortfolioId(id);
      setEntries(response.data.entries);

      // Set portfolio's display settings, use default values if not in database
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
      } = response.data.displaySettings;
      setDisplaySettings({
        display: display ?? PORTFOLIO_DISPLAY.BOARD.name,
        isCardColorOn: isCardColorOn ?? true,
        // Dashboard
        boardDensity: boardDensity ?? BOARD_DENSITY.COMPACT.name,
        boardColumnFilter:
          boardColumnFilter.length === 0
            ? DEFAULT_BOARD_COLUMN_FILTER
            : boardColumnFilter,
        boardSortProperty:
          boardSortProperty ?? BOARD_SORT_BY.LAST_UPDATE.property,
        boardIsSortAscending:
          boardIsSortAscending ?? BOARD_SORT_BY.LAST_UPDATE.isDefaultAscending,
        // TABLE
        tableDensity: tableDensity ?? TABLE_DENSITY.COMFORTABLE.name,
        tableColumnFilter:
          tableColumnFilter.length === 0
            ? DEFAULT_TABLE_COLUMN_FILTER
            : tableColumnFilter,
        tableSortProperty: tableSortProperty ?? TABLE_COLUMNS.COMPANY.property,
        tableIsSortAscending: tableIsSortAscending ?? true,
      });

      setIsPortfolioLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const updateDisplaySettings = async (settingsChange) => {
    for (const property in settingsChange) {
      // Ignore if nothing changed
      if (!_.isEqual(settingsChange[property], displaySettings[property])) {
        setDisplaySettings({ ...displaySettings, ...settingsChange });
        return;
      }
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
        openProfileModal: () => setIsProfileModalOpen(true),
        portfoliosList: portfoliosList,
        openPortfoliosModal: () => setIsPortfoliosModalOpen(true),
        currentPortfolioId: currentPortfolioId,
        displaySettings: displaySettings,
        updateDisplaySettings: updateDisplaySettings,
        openStatusListModal: () => setIsStatusListModalOpen(true),
        entries: entries,
        openNewEntryModal: (initialValues) =>
          setNewEntryModal({
            isOpen: true,
            initialValues: initialValues,
            autoFocusProperty: "company",
          }),
        openEntryModal: (entryId, autoFocusProperty = null) =>
          setEntryModal({
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

        {loadingText && <LoadingPage loadingText={loadingText} />}

        {!loadingText && <Route exact path="/" component={Home} />}

        {!loadingText && user && (
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
        )}

        {/* Used to edit and view user's profile */}
        <ProfileModal
          open={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onDeleteAccount={deleteAccount}
        />
        {/* Used to edit and reorder portfolios */}
        <PortfoliosModal
          open={isPortfoliosModalOpen}
          onClose={() => setIsPortfoliosModalOpen(false)}
          onSave={updatePortfoliosList}
        />
        {/* Used to edit and reorder current portfolio's statuses */}
        {currentPortfolioId && (
          <StatusListModal
            open={isStatusListModalOpen}
            onClose={() => setIsStatusListModalOpen(false)}
          />
        )}
        {/* Used to add new entries */}
        <EntryModal
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
        <EntryModal
          open={editEntryModal.isOpen}
          onClose={() =>
            setEntryModal({
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
