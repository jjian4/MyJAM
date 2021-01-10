import { useState, useEffect, useContext } from "react";

import AppContext from "../../AppContext";
import Dashboard from "../../components/Dashboard/Dashboard";
import EntriesTable from "../../components/EntriesTable/EntriesTable";
import { PORTFOLIO_DISPLAY } from "../../constants";
import { LAST_PORTFOLIO_DISPLAY } from "../../settings";
import "./Portfolio.scss";

function Portfolio() {
  const { entries, updateEntry, saveNewEntry } = useContext(AppContext);

  const [isWindowSmall, setIsWindowSmall] = useState(window.innerWidth <= 991);

  // Menu options
  const [display, setDisplay] = useState(LAST_PORTFOLIO_DISPLAY);

  useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  // Resize menu items when window gets too small
  const resizeWindow = () => {
    setIsWindowSmall(window.innerWidth <= 991);
  };

  return (
    <div className="Portfolio">
      {display === PORTFOLIO_DISPLAY.BOARD.name && (
        <Dashboard isWindowSmall={isWindowSmall} onChangeDisplay={setDisplay} />
      )}

      {display === PORTFOLIO_DISPLAY.TABLE.name && (
        <EntriesTable
          isWindowSmall={isWindowSmall}
          onChangeDisplay={setDisplay}
        />
      )}
    </div>
  );
}

export default Portfolio;
