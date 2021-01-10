import { createContext } from "react";

const AppContext = createContext({
  entries: [],
  setEntries: () => {},
  updateEntryStatus: () => {},
  updateEntry: () => {},
  saveNewEntry: () => {},
});

export default AppContext;
