import { useState, useEffect, useContext } from "react";
import { ReactSortable } from "react-sortablejs";
import AppContext from "../../AppContext";
import DashboardColumn from "./DashboardColumn/DashboardColumn";
import "./Dashboard.scss";

function Dashboard() {
  const { displaySettings, updateDisplaySettings, entries } = useContext(
    AppContext
  );

  const {
    boardColumnFilter,
    boardSortProperty,
    boardIsSortAscending,
  } = displaySettings;

  const [entriesByStatus, setEntriesByStatus] = useState({});

  useEffect(() => {
    if (entries) {
      const statusToEntries = {};
      Object.values(boardColumnFilter).forEach((x) => {
        statusToEntries[x.status] = [];
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
  }, [entries, boardColumnFilter, boardSortProperty, boardIsSortAscending]);

  return (
    <div className="Dashboard">
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
