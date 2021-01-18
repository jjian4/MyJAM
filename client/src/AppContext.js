import { createContext } from "react";

const AppContext = createContext({
  user: null, // includes displayName, givenName, portfolios [{portfolioId, portfolioName}], portfolioSettings {}
  isWindowSmall: false,
  portfolioSettings: {},
  updatePortfolioSettings: () => {},
  entries: [],
  searchValue: "",
  setSearchValue: () => {},
  openNewEntryModal: () => {},
  openEditEntryModal: () => {},
  updateEntry: () => {},
});

export default AppContext;
