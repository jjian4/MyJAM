import { useState, useEffect, useContext } from "react";
import { ReactSortable } from "react-sortablejs";
import _ from "lodash";
import { Dropdown } from "semantic-ui-react";
import classnames from "classnames";
import AppContext from "../../AppContext";
import DashboardColumn from "./DashboardColumn/DashboardColumn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.scss";

function Dashboard() {
  const { displaySettings, updateDisplaySettings, entries } =
    useContext(AppContext);

  const { boardColumnFilter, boardSortProperty, boardIsSortAscending } =
    displaySettings;

  const [entriesByStatusId, setEntriesByStatusId] = useState({});
  const [isAddColumnDropdownOpen, setIsAddColumnDropdownOpen] = useState(false);

  useEffect(() => {
    if (entries) {
      const statusIdToEntries = {};
      Object.values(boardColumnFilter).forEach((x) => {
        statusIdToEntries[x.statusId] = [];
      });

      entries.forEach((entry) => {
        statusIdToEntries[entry.statusId].push(entry);
      });

      Object.values(statusIdToEntries).forEach((entries) => {
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

      setEntriesByStatusId(statusIdToEntries);
    } else {
      setEntriesByStatusId({});
    }
  }, [entries, boardColumnFilter, boardSortProperty, boardIsSortAscending]);

  const isDashboardFull = !boardColumnFilter.some((x) => !x.isActive);

  return (
    <div className="Dashboard">
      <div className="dashboardContent">
        <ReactSortable
          className="dashboardColumns"
          list={boardColumnFilter}
          setList={(x) => {
            x.forEach((item) => {
              delete item.selected;
              delete item.chosen;
            });
            updateDisplaySettings({ boardColumnFilter: x });
          }}
          animation={200}
          handle=".columnHeading"
        >
          {boardColumnFilter.map((column, index) => {
            if (!column.isActive) {
              // Just returns empty div since Sortable doesn't allow null
              return <div key={column.statusId} />;
            }
            return (
              <DashboardColumn
                key={column.statusId}
                index={index}
                statusId={column.statusId}
                isExpanded={column.isExpanded}
                columnEntries={entriesByStatusId[column.statusId] || []}
              />
            );
          })}
        </ReactSortable>

        {!isDashboardFull && (
          <Dropdown
            className="addColumnDropdown"
            trigger={
              <div
                className={classnames("addColumnButton", {
                  "addColumnButton-open": isAddColumnDropdownOpen,
                })}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            }
            icon={false}
            direction={"left"}
            onOpen={() => setIsAddColumnDropdownOpen(true)}
            onClose={() => setIsAddColumnDropdownOpen(false)}
          >
            <Dropdown.Menu className="dropdownMenu">
              {boardColumnFilter.map((column, index) => {
                if (!column.isActive) {
                  return (
                    <Dropdown.Item
                      key={index}
                      onClick={() => {
                        const newColumnFilter = _.cloneDeep(boardColumnFilter);
                        newColumnFilter[index].isActive = true;
                        updateDisplaySettings({
                          boardColumnFilter: newColumnFilter,
                        });
                      }}
                    >
                      <div className="dropdownRow">
                        <span className="statusName">{column.status}</span>
                        <span className="numEntries">
                          ({entriesByStatusId[column.statusId]?.length})
                        </span>
                      </div>
                    </Dropdown.Item>
                  );
                }
                return null;
              })}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
