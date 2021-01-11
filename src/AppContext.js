import { createContext } from "react";

const AppContext = createContext({
  isWindowSmall: false,
  portfolioSettings: {
    display: "",
    isCardColorOn: false,
    boardDensity: "",
    boardColumnFilter: [],
    boardSortProperty: "",
    boardIsSortAscending: true,
    tableDensity: "",
    tableColumnFilter: [],
    tableSortProperty: "",
    tableIsSortAscending: true,
  },
  updatePortfolioSettings: () => {},
  entries: [],
  openNewEntryModal: () => {},
  openEditEntryModal: () => {},
  updateEntry: () => {},
  saveNewEntry: () => {},
});

export default AppContext;
