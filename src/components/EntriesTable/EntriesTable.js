import { useState, useEffect, useContext } from "react";
import { Button, Table } from "semantic-ui-react";
import dateFormat from "dateformat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import AppContext from "../../AppContext";
import { PORTFOLIO_DISPLAY, TABLE_DENSITY } from "../../constants";
import EntriesTableColumnFilterDropdown from "./EntriesTableColumnFilterDropdown/EntriesTableColumnFilterDropdown";

import "./EntriesTable.scss";

function EntriesTable() {
  const {
    isWindowSmall,
    portfolioSettings,
    updatePortfolioSettings,
    entries,
    openNewEntryModal,
    openEditEntryModal,
  } = useContext(AppContext);

  const {
    tableDensity,
    tableColumnFilter,
    tableSortProperty,
    tableIsSortAscending,
  } = portfolioSettings;

  const [data, setData] = useState([]);

  useEffect(() => {
    if (entries) {
      let sortedEntries = [...entries];
      sortedEntries.sort((a, b) =>
        a[tableSortProperty] > b[tableSortProperty] ? 1 : -1
      );
      setData(tableIsSortAscending ? sortedEntries : sortedEntries.reverse());
    }
  }, [entries, tableSortProperty, tableIsSortAscending]);

  const handleSort = (newSortProperty) => {
    if (newSortProperty === tableSortProperty) {
      updatePortfolioSettings({ tableIsSortAscending: !tableIsSortAscending });
      setData(data.reverse());
    } else {
      updatePortfolioSettings({
        tableSortProperty: newSortProperty,
        tableIsSortAscending: true,
      });

      let sortedEntries = [...entries];
      sortedEntries.sort((a, b) =>
        a[newSortProperty] > b[newSortProperty] ? 1 : -1
      );
      setData(sortedEntries);
    }
  };

  const EditCellButton = ({ entryId, propertyToEdit }) => (
    <div
      className="editCellButton"
      onClick={() => openEditEntryModal(entryId, propertyToEdit)}
    >
      <FontAwesomeIcon icon={faPencilAlt} />
    </div>
  );

  return (
    <div className="EntriesTable">
      <div className="tableMenuBar">
        <div className="menuleft">
          <Button.Group className="displayButtons" basic size="mini">
            {Object.values(PORTFOLIO_DISPLAY).map((item, index) => (
              <Button
                key={index}
                icon
                active={item.name === PORTFOLIO_DISPLAY.TABLE.name}
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
        </div>

        <div className="menuRight">
          <span className="filterDropdown">
            <EntriesTableColumnFilterDropdown hideLabel={isWindowSmall} />
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

      <div className="content">
        <div className="tableContainer">
          <Table
            className="dataTable"
            celled
            selectable
            compact={
              tableDensity === TABLE_DENSITY.COMPACT.name ? "very" : false
            }
            size="small"
            sortable
            unstackable
          >
            <Table.Header>
              <Table.Row>
                {tableColumnFilter.map((column, index) => {
                  if (!column.isActive) {
                    return null;
                  }
                  return (
                    <Table.HeaderCell
                      key={index}
                      sorted={
                        column.property === tableSortProperty
                          ? tableIsSortAscending
                            ? "ascending"
                            : "descending"
                          : null
                      }
                      onClick={() => handleSort(column.property)}
                    >
                      {column.name}
                    </Table.HeaderCell>
                  );
                })}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((entry) => (
                <Table.Row key={entry.id}>
                  {tableColumnFilter.map((column, index) => {
                    if (!column.isActive) {
                      return null;
                    }
                    if (column.property === "color") {
                      return (
                        <Table.Cell key={index} singleLine>
                          <div className="colorCell">
                            <div
                              className="color"
                              style={{
                                backgroundColor: entry[column.property],
                              }}
                              title={entry[column.property]}
                            />
                          </div>
                        </Table.Cell>
                      );
                    }
                    if (column.property === "company") {
                      return (
                        <Table.Cell key={index} singleLine>
                          <div className="data companyCell">
                            <img
                              className="logo"
                              src={entry["logo"]}
                              alt="logo"
                            />{" "}
                            {entry[column.property]}
                          </div>
                          <EditCellButton
                            entryId={entry["id"]}
                            propertyToEdit={column.property}
                          />
                        </Table.Cell>
                      );
                    }
                    if (column.isDate && entry[column.property]) {
                      return (
                        <Table.Cell key={index} singleLine>
                          <div className="data">
                            {dateFormat(entry[column.property], "mmm dd, yyyy")}
                          </div>
                          <EditCellButton
                            entryId={entry["id"]}
                            propertyToEdit={column.property}
                          />
                        </Table.Cell>
                      );
                    }
                    return (
                      <Table.Cell key={index}>
                        <div className="data">{entry[column.property]}</div>
                        <EditCellButton
                          entryId={entry["id"]}
                          propertyToEdit={column.property}
                        />
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default EntriesTable;
