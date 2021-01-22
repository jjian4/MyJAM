import { createContext } from "react";

const AppContext = createContext({
  user: null, // includes displayName, givenName, portfolioIds [], portfolioSettings {}
  isWindowSmall: false,
  portfolioSettings: {},
  updatePortfolioSettings: () => {},
  portfoliosList: [], // includes id, name, numEntries
  openPortfoliosModal: () => {},
  searchValue: "",
  setSearchValue: () => {},
  currentPortfolioId: "",
  entries: [],
  openNewEntryModal: () => {},
  openEditEntryModal: () => {},
  updateEntry: () => {},
});

export default AppContext;
