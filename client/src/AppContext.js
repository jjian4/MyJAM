import { createContext } from "react";

const AppContext = createContext({
  user: null,
  loginUser: () => {},
  logoutUser: () => {},

  // Todo:
  // portfolios: [],
  // updatePortfolios: () => {},

  isWindowSmall: false,
  page: "", // might not need in context
  setPage: () => {},
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
