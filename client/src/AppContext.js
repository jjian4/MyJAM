import { createContext } from "react";

const AppContext = createContext({
  user: null, // includes displayName, givenName, portfolioIds [], portfolioSettings {}
  portfolioSettings: {}, // includes display, isCardColorOn, boardDensity, boardColumnFilter [], boardSortProperty, boardIsSortAscending, tableDensity, tableColumnFilter [], tableSortProperty, tableIsSortAscending
  updatePortfolioSettings: () => {},
  portfoliosList: [], // includes id, name, numEntries
  openPortfoliosModal: () => {},
  currentPortfolioId: "",
  entries: [], // includes id, dateCreated, lastUpdate, color, isStarred, company, domain, logo, jobTitle, applyDate, deadlineDate, status, url, notes
  openNewEntryModal: () => {},
  openEditEntryModal: () => {},
  updateEntry: () => {},
  searchValue: "",
  setSearchValue: () => {},
});

export default AppContext;
