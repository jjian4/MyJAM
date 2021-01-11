import { useContext } from "react";

import AppContext from "../../AppContext";
import Dashboard from "../../components/Dashboard/Dashboard";
import EntriesTable from "../../components/EntriesTable/EntriesTable";
import { PORTFOLIO_DISPLAY } from "../../constants";
import "./Portfolio.scss";

function Portfolio() {
  const { portfolioSettings } = useContext(AppContext);

  return (
    <div className="Portfolio">
      {portfolioSettings.display === PORTFOLIO_DISPLAY.BOARD.name && (
        <Dashboard />
      )}

      {portfolioSettings.display === PORTFOLIO_DISPLAY.TABLE.name && (
        <EntriesTable />
      )}
    </div>
  );
}

export default Portfolio;
