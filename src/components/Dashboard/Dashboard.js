import { useState, useEffect, useContext } from "react";
import { Button } from "semantic-ui-react";
import { ReactSortable } from "react-sortablejs";

import AppContext from "../../AppContext";
import DashboardColumn from "./DashboardColumn/DashboardColumn";
import DashboardSortDropdown from "./DashboardSortDropdown/DashboardSortDropdown";
import DashboardColumnFilterDropdown from "./DashboardColumnFilterDropdown/DashboardColumnFilterDropdown";
import { PORTFOLIO_DISPLAY, BOARD_DENSITY, STATUS } from "../../constants";
import "./Dashboard.scss";

function Dashboard() {
  const {
    isWindowSmall,
    portfolioSettings,
    updatePortfolioSettings,
    entries,
    openNewEntryModal,
  } = useContext(AppContext);

  const {
    boardDensity,
    boardColumnFilter,
    boardSortProperty,
    boardIsSortAscending,
  } = portfolioSettings;

  const [entriesByStatus, setEntriesByStatus] = useState({});

  useEffect(() => {
    if (entries) {
      const statusToEntries = {};
      Object.values(STATUS).forEach((status) => {
        statusToEntries[status] = [];
      });

      entries.forEach((entry) => {
        statusToEntries[entry.status].push(entry);
      });

      Object.values(statusToEntries).forEach((entries) => {
        if (boardIsSortAscending) {
          entries.sort((a, b) => {
            // Show the cards that have a value first, even though empty string technically comes first
            if (!(a[boardSortProperty] && b[boardSortProperty])) {
              return !a[boardSortProperty] ? 1 : -1;
            }
            return a[boardSortProperty] > b[boardSortProperty] ? 1 : -1;
          });
        } else {
          entries.sort((a, b) =>
            a[boardSortProperty] < b[boardSortProperty] ? 1 : -1
          );
        }
      });

      setEntriesByStatus(statusToEntries);
    } else {
      setEntriesByStatus({});
    }
  }, [entries, boardSortProperty, boardIsSortAscending]);

  return (
    <div className="Dashboard">
      <div className="dashboardMenuBar">
        <div className="menuleft">
          <Button.Group className="displayButtons" basic size="mini">
            {Object.values(PORTFOLIO_DISPLAY).map((item, index) => (
              <Button
                key={index}
                icon
                active={item.name === PORTFOLIO_DISPLAY.BOARD.name}
                onClick={() => updatePortfolioSettings({ display: item.name })}
              >
                {item.icon}
                {!isWindowSmall && (
                  <span className="buttonLabel">{item.name}</span>
                )}
              </Button>
            ))}
          </Button.Group>

          <Button.Group className="densityButtons" basic size="mini">
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
        </div>

        <div className="menuRight">
          <span className="filterDropdown">
            <DashboardColumnFilterDropdown
              hideLabel={isWindowSmall}
              entriesByStatus={entriesByStatus}
            />
          </span>

          <span className="sortDropdown">
            <DashboardSortDropdown hideLabel={isWindowSmall} />
          </span>

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

      <ReactSortable
        className="dashboardColumns"
        list={boardColumnFilter}
        setList={(x) => updatePortfolioSettings({ boardColumnFilter: x })}
        animation={200}
        handle=".columnHeading"
      >
        {boardColumnFilter.map((column, index) => {
          if (!column.isActive) {
            // Just returns empty div since Sortable doesn't allow null
            return <div key={column.status} />;
          }
          return (
            <DashboardColumn
              key={column.status}
              index={index}
              status={column.status}
              isExpanded={column.isExpanded}
              columnEntries={entriesByStatus[column.status] || []}
            />
          );
        })}
      </ReactSortable>
    </div>
  );
}

export default Dashboard;
