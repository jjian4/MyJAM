import { createContext } from "react";

const AppContext = createContext({
  user: null, // includes creationDate, lastLoginDate, displayName, familyName, givenName, email, photo, portfolioIds [], displaySettings {},
  openProfileModal: () => {},
  portfoliosList: null, // includes id, name, numEntries
  openPortfoliosModal: () => {},
  currentPortfolioId: "",
  displaySettings: {}, // Specific to each portfolio; includes display, isCardColorOn, boardDensity, boardColumnFilter [], boardSortProperty, boardIsSortAscending, tableDensity, tableColumnFilter [], tableSortProperty, tableIsSortAscending
  updateDisplaySettings: () => {},
  entries: null, // includes id, dateCreated, lastUpdate, color, isStarred, company, domain, logo, jobTitle, applyDate, deadlineDate, status, url, notes
  openNewEntryModal: () => {},
  openEntryModal: () => {},
  updateEntry: () => {},
  searchValue: "",
  setSearchValue: () => {},
});

export default AppContext;
