import { createContext } from "react";

const AppContext = createContext({
  entries: [],
  setEntries: () => {},
  openNewEntryModal: () => {},
  openEditEntryModal: () => {},
  updateEntry: () => {},
  saveNewEntry: () => {},
});

export default AppContext;
