import { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import AppContext from "../../AppContext";
import Dashboard from "../../components/Dashboard/Dashboard";
import EntriesTable from "../../components/EntriesTable/EntriesTable";
import PortfolioMenuBar from "../../components/PortfolioMenuBar/PortfolioMenuBar";
import { PORTFOLIO_DISPLAY } from "../../utilities/constants";
import "./Portfolio.scss";

function Portfolio() {
  const {
    user,
    portfolioSettings,
    portfoliosList,
    openPortfoliosModal,
  } = useContext(AppContext);

  let { id } = useParams();
  const history = useHistory();
  if (
    portfoliosList.length > 0 &&
    !(id && portfoliosList.find((x) => x.id === id))
  ) {
    history.push(`/portfolio/${portfoliosList[0].id}`);
  }

  return (
    <div className="Portfolio">
      {user && <PortfolioMenuBar />}

      {portfoliosList.length === 0 && (
        <div className="makePortfolioPrompt">
          <div>You do not have any portfolios.</div>
          <Button
            positive
            circular
            className="makePortfolioButton"
            onClick={openPortfoliosModal}
          >
            Make Portfolio
          </Button>
        </div>
      )}

      <div className="content">
        {portfoliosList.length > 0 &&
          portfolioSettings.display === PORTFOLIO_DISPLAY.BOARD.name && (
            <Dashboard />
          )}

        {portfoliosList.length > 0 &&
          portfolioSettings.display === PORTFOLIO_DISPLAY.TABLE.name && (
            <EntriesTable />
          )}
      </div>
    </div>
  );
}

export default Portfolio;
