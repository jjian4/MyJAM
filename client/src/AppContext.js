import { createContext } from "react";

const AppContext = createContext({
  user: null, // includes displayName, givenName, portfolioIds [], portfolioSettings {}
  isWindowSmall: false,
  portfolioSettings: {},
  updatePortfolioSettings: () => {},
  portfoliosList: [],
  openPortfoliosModal: () => {},
  searchValue: "",
  setSearchValue: () => {},
  entries: [],
  openNewEntryModal: () => {},
  openEditEntryModal: () => {},
  updateEntry: () => {},
});

export default AppContext;
