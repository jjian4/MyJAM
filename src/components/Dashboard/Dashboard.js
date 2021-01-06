import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";

import DashboardColumn from "./DashboardColumn/DashboardColumn";
import DashboardSortDropdown from "./DashboardSortDropdown/DashboardSortDropdown";
import DashboardColumnFilterDropdown from "./DashboardColumnFilterDropdown/DashboardColumnFilterDropdown";
import {
  PORTFOLIO_DISPLAY,
  BOARD_DENSITY,
  STATUS,
  BOARD_SORT_BY,
} from "../../constants";
import {
  LAST_BOARD_DENSITY,
  LAST_BOARD_COLUMN_FILTER,
  LAST_BOARD_SORT,
} from "../../settings";

import "./Dashboard.scss";

function Dashboard(props) {
  const [entriesByStatus, setEntriesByStatus] = useState({});

  // Menu
  const [density, setDensity] = useState(LAST_BOARD_DENSITY);
  const [sortBy, setSortBy] = useState(LAST_BOARD_SORT.name);
  const [isSortAscending, setIsSortAscending] = useState(
    LAST_BOARD_SORT.isDefaultAscending
  );
  const [isColumnFilterOpen, setisColumnFilterOpen] = useState(false);
  const [columnFilter, setcolumnFilter] = useState(LAST_BOARD_COLUMN_FILTER);

  useEffect(() => {
    if (props.entries) {
      const statusToEntries = {};
      Object.values(STATUS).forEach((status) => {
        statusToEntries[status] = [];
      });

      props.entries.forEach((entry) => {
        statusToEntries[entry.status].push(entry);
      });

      const entryProperty = Object.values(BOARD_SORT_BY).find(
        (x) => x.name === sortBy
      ).entryProperty;
      Object.values(statusToEntries).forEach((entries) => {
        if (isSortAscending) {
          entries.sort((a, b) =>
            a[entryProperty] > b[entryProperty] ? 1 : -1
          );
        } else {
          entries.sort((a, b) =>
            a[entryProperty] < b[entryProperty] ? 1 : -1
          );
        }
      });

      setEntriesByStatus(statusToEntries);
    } else {
      setEntriesByStatus({});
    }
  }, [props.entries, sortBy, isSortAscending]);

  const sortDashboardEntries = (sortBy, isSortAscending) => {
    setSortBy(sortBy);
    setIsSortAscending(isSortAscending);
  };

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
                onClick={() => props.onChangeDisplay(item.name)}
              >
                {item.icon}
                {!props.isWindowSmall && (
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
                active={density === item.name}
                onClick={() => setDensity(item.name)}
              >
                {item.icon}
                {!props.isWindowSmall && (
                  <span className="buttonLabel">{item.name}</span>
                )}
              </Button>
            ))}
          </Button.Group>
        </div>

        <div className="menuRight">
          <span className="filterDropdown">
            {/* Controlling this dropdown the hard way because checkbox clicks close the menu by default */}
            <DashboardColumnFilterDropdown
              hideLabel={props.isWindowSmall}
              open={isColumnFilterOpen}
              onOpen={() => setisColumnFilterOpen(true)}
              onClose={() => setisColumnFilterOpen(false)}
              entriesByStatus={entriesByStatus}
              columnFilter={columnFilter}
              onChange={(x) => setcolumnFilter(x)}
            />
          </span>

          <span className="sortDropdown">
            <DashboardSortDropdown
              hideLabel={props.isWindowSmall}
              value={sortBy}
              isSortAscending={isSortAscending}
              onSelect={sortDashboardEntries}
            />
          </span>

          <Button
            className="newEntryButton"
            positive
            size="mini"
            icon="plus"
            content={props.isWindowSmall ? null : "New Entry"}
            onClick={() => props.onOpenNewEntry({})}
          />
        </div>
      </div>

      <div className="dashboardColumns">
        {Object.values(STATUS).map((status, index) => {
          if (columnFilter[status]?.isActive) {
            return (
              <DashboardColumn
                key={index}
                status={status}
                isExpanded={columnFilter[status].isExpanded}
                entries={entriesByStatus[status] || []}
                density={density}
                onOpenNewEntry={props.onOpenNewEntry}
                onOpenEditEntry={props.onOpenEditEntry}
                onChangeExpanded={(isExpanded) => {
                  const newSettings = Object.assign({}, columnFilter);
                  newSettings[status].isExpanded = isExpanded;
                  setcolumnFilter(newSettings);
                }}
                onHideColumn={() => {
                  const newSettings = Object.assign({}, columnFilter);
                  newSettings[status].isActive = false;
                  setcolumnFilter(newSettings);
                }}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Dashboard;
