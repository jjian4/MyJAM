import { useContext } from "react";
import { Button } from "semantic-ui-react";
import AppContext from "../../AppContext";
import Dashboard from "../../components/Dashboard/Dashboard";
import EntriesTable from "../../components/EntriesTable/EntriesTable";
import PortfolioMenuBar from "../../components/PortfolioMenuBar/PortfolioMenuBar";
import { PORTFOLIO_DISPLAY } from "../../utilities/constants";
import "./Portfolio.scss";

function Portfolio() {
  const { user, portfolioSettings } = useContext(AppContext);

  return (
    <div className="Portfolio">
      {user && <PortfolioMenuBar />}

      {user.portfolios.length === 0 && (
        <div className="makePortfolioPrompt">
          <div>You do not have any portfolios.</div>
          <Button positive circular className="makePortfolioButton">
            Make Portfolio
          </Button>
        </div>
      )}

      <div className="content">
        {user.portfolios.length > 0 &&
          portfolioSettings.display === PORTFOLIO_DISPLAY.BOARD.name && (
            <Dashboard />
          )}

        {user.portfolios.length > 0 &&
          portfolioSettings.display === PORTFOLIO_DISPLAY.TABLE.name && (
            <EntriesTable />
          )}
      </div>
    </div>
  );
}

export default Portfolio;
