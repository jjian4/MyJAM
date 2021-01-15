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
  portfolioSettings: {
    // display: "",
    // isCardColorOn: false,
    // boardDensity: "",
    // boardColumnFilter: [],
    // boardSortProperty: "",
    // boardIsSortAscending: true,
    // tableDensity: "",
    // tableColumnFilter: [],
    // tableSortProperty: "",
    // tableIsSortAscending: true,
  },
  updatePortfolioSettings: () => {},
  entries: [],
  searchValue: "",
  setSearchValue: () => {},
  openNewEntryModal: () => {},
  openEditEntryModal: () => {},
  updateEntry: () => {},
});

export default AppContext;
