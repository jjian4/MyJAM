import { createContext } from "react";

const AppContext = createContext({
  user: null, // includes displayName, givenName, portfolioIds [], portfolioSettings {}
  portfolioSettings: {},
  updatePortfolioSettings: () => {},
  portfoliosList: [], // includes id, name, numEntries
  openPortfoliosModal: () => {},
  currentPortfolioId: "",
  entries: [],
  openNewEntryModal: () => {},
  openEditEntryModal: () => {},
  updateEntry: () => {},
  searchValue: "",
  setSearchValue: () => {},
});

export default AppContext;
