import { useContext, useState, useRef } from "react";
import { Button, Input } from "semantic-ui-react";
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

function PortfolioMenuBar() {
  const {
    isWindowSmall,
    portfolioSettings,
    searchValue,
    setSearchValue,
    updatePortfolioSettings,
    openNewEntryModal,
  } = useContext(AppContext);

  const { display, boardDensity, tableDensity } = portfolioSettings;

  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [tempSearchValue, setTempSearchValue] = useState(searchValue);

  const searchTimeoutRef = useRef();
  const updateSearchValue = (newSearchValue) => {
    clearTimeout(searchTimeoutRef.current);
    setIsSearchLoading(true);
    setTempSearchValue(newSearchValue);
    // Update the real searchValue when there are no more changes
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearchLoading(false);
      setTempSearchValue(newSearchValue);
      setSearchValue(newSearchValue);
    }, 300);
  };

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

        {display === PORTFOLIO_DISPLAY.BOARD.name && (
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

        {display === PORTFOLIO_DISPLAY.TABLE.name && (
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
        <span className="menuItem">
          <Input
            icon="search"
            size="mini"
            placeholder="Search Entries..."
            loading={isSearchLoading}
            value={tempSearchValue}
            onChange={(e) => updateSearchValue(e.target.value)}
          />
        </span>

        {display === PORTFOLIO_DISPLAY.BOARD.name && (
          <span className="menuItem">
            <DashboardColumnFilterDropdown hideLabel={isWindowSmall} />
          </span>
        )}

        {display === PORTFOLIO_DISPLAY.BOARD.name && (
          <span className="menuItem">
            <DashboardSortDropdown hideLabel={isWindowSmall} />
          </span>
        )}

        {display === PORTFOLIO_DISPLAY.TABLE.name && (
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
