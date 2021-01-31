import { createContext } from "react";

const AppContext = createContext({
  user: null, // includes creationDate, lastLoginDate, displayName, familyName, givenName, email, photo, portfolioIds [], portfolioSettings {},
  openProfileModal: () => {},
  portfolioSettings: {}, // includes display, isCardColorOn, boardDensity, boardColumnFilter [], boardSortProperty, boardIsSortAscending, tableDensity, tableColumnFilter [], tableSortProperty, tableIsSortAscending
  updatePortfolioSettings: () => {},
  portfoliosList: [], // includes id, name, numEntries
  openPortfoliosModal: () => {},
  currentPortfolioId: "",
  entries: [], // includes id, dateCreated, lastUpdate, color, isStarred, company, domain, logo, jobTitle, applyDate, deadlineDate, status, url, notes
  openNewEntryModal: () => {},
  openEntryModal: () => {},
  updateEntry: () => {},
  searchValue: "",
  setSearchValue: () => {},
});

export default AppContext;
