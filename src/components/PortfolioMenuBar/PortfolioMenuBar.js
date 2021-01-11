import { useContext } from "react";
import { Button } from "semantic-ui-react";
import AppContext from "../../AppContext";
import DashboardColumnFilterDropdown from "../Dashboard/DashboardColumnFilterDropdown/DashboardColumnFilterDropdown";
import EntriesTableColumnFilterDropdown from "../EntriesTable/EntriesTableColumnFilterDropdown/EntriesTableColumnFilterDropdown";
import DashboardSortDropdown from "../Dashboard/DashboardSortDropdown/DashboardSortDropdown";
import {
  BOARD_DENSITY,
  PORTFOLIO_DISPLAY,
  TABLE_DENSITY,
} from "../../constants";
import "./PortfolioMenuBar.scss";

function PortfolioMenuBar(props) {
  const {
    isWindowSmall,
    portfolioSettings,
    updatePortfolioSettings,
    openNewEntryModal,
  } = useContext(AppContext);

  const { display, boardDensity, tableDensity } = portfolioSettings;

  return (
    <div className="PortfolioMenuBar">
      <div className="menuleft">
        <Button.Group className="menuItem" basic size="mini">
          {Object.values(PORTFOLIO_DISPLAY).map((item, index) => (
            <Button
              key={index}
              icon
              active={item.name === display}
              onClick={() => updatePortfolioSettings({ display: item.name })}
            >
              {item.icon}
              {!isWindowSmall && (
                <span className="buttonLabel">{item.name}</span>
              )}
            </Button>
          ))}
        </Button.Group>

        {props.display === PORTFOLIO_DISPLAY.BOARD.name && (
          <Button.Group className="menuItem" basic size="mini">
            {Object.values(BOARD_DENSITY).map((item, index) => (
              <Button
                key={index}
                icon
                active={boardDensity === item.name}
                onClick={() =>
                  updatePortfolioSettings({ boardDensity: item.name })
                }
              >
                {item.icon}
                {!isWindowSmall && (
                  <span className="buttonLabel">{item.name}</span>
                )}
              </Button>
            ))}
          </Button.Group>
        )}

        {props.display === PORTFOLIO_DISPLAY.TABLE.name && (
          <Button.Group className="menuItem" basic size="mini">
            {Object.values(TABLE_DENSITY).map((item, index) => (
              <Button
                key={index}
                icon
                active={tableDensity === item.name}
                onClick={() =>
                  updatePortfolioSettings({ tableDensity: item.name })
                }
              >
                {item.icon}
                {!isWindowSmall && (
                  <span className="buttonLabel">{item.name}</span>
                )}
              </Button>
            ))}
          </Button.Group>
        )}
      </div>

      <div className="menuRight">
        {props.display === PORTFOLIO_DISPLAY.BOARD.name && (
          <span className="menuItem">
            <DashboardColumnFilterDropdown hideLabel={isWindowSmall} />
          </span>
        )}

        {props.display === PORTFOLIO_DISPLAY.BOARD.name && (
          <span className="menuItem">
            <DashboardSortDropdown hideLabel={isWindowSmall} />
          </span>
        )}

        {props.display === PORTFOLIO_DISPLAY.TABLE.name && (
          <span className="menuItem">
            <EntriesTableColumnFilterDropdown hideLabel={isWindowSmall} />
          </span>
        )}

        <Button
          className="newEntryButton"
          positive
          size="mini"
          icon="plus"
          content={isWindowSmall ? null : "New Entry"}
          onClick={() => openNewEntryModal({})}
        />
      </div>
    </div>
  );
}

export default PortfolioMenuBar;
