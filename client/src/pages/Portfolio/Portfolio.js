import { useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import AppContext from "../../AppContext";
import Dashboard from "../../components/Dashboard/Dashboard";
import EntriesTable from "../../components/EntriesTable/EntriesTable";
import PortfolioMenuBar from "../../components/PortfolioMenuBar/PortfolioMenuBar";
import { PORTFOLIO_DISPLAY } from "../../utilities/constants";
import "./Portfolio.scss";

function Portfolio(props) {
  const {
    portfoliosList,
    openPortfoliosModal,
    currentPortfolioId,
    displaySettings,
  } = useContext(AppContext);

  let { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    // If id is undefined or invalid, reroute to a valid portfolio
    if (
      portfoliosList.length > 0 &&
      !(id && portfoliosList.find((x) => x.id === id))
    ) {
      history.push(`/portfolio/${portfoliosList[0].id}`);
    }

    // If new id is valid, update current portfolio
    else if (
      id &&
      id !== currentPortfolioId &&
      portfoliosList.find((x) => x.id === id)
    ) {
      props.onPortfolioChange(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, portfoliosList]);

  return (
    <div className="Portfolio">
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

      {currentPortfolioId && <PortfolioMenuBar />}

      <div className="content">
        {currentPortfolioId &&
          displaySettings.display === PORTFOLIO_DISPLAY.BOARD.name && (
            <Dashboard />
          )}

        {currentPortfolioId &&
          displaySettings.display === PORTFOLIO_DISPLAY.TABLE.name && (
            <EntriesTable />
          )}
      </div>
    </div>
  );
}

export default Portfolio;
