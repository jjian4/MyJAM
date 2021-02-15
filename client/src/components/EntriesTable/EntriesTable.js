import { useState, useEffect, useContext } from "react";
import { Table } from "semantic-ui-react";
import dateFormat from "dateformat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import prependHttp from "prepend-http";
import AppContext from "../../AppContext";
import {
  ENTRY_SEARCH_PROPERTIES,
  TABLE_DENSITY,
} from "../../utilities/constants";
import StarButton from "../StarButton/StarButton";
import LogoCircle from "../LogoCircle/LogoCircle";
import "./EntriesTable.scss";

const maxUrlLength = 50;

function EntriesTable() {
  const {
    displaySettings,
    updateDisplaySettings,
    entries,
    openEntryModal,
    updateEntry,
    searchValue,
  } = useContext(AppContext);

  const {
    tableDensity,
    tableColumnFilter,
    tableSortProperty,
    tableIsSortAscending,
  } = displaySettings;

  // the portfolio entries sorted
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
      updateDisplaySettings({ tableIsSortAscending: !tableIsSortAscending });
      setData(data.reverse());
    } else {
      updateDisplaySettings({
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
      onClick={() => openEntryModal(entryId, propertyToEdit)}
    >
      <FontAwesomeIcon icon={faPencilAlt} />
    </div>
  );

  const passesEntrySearch = (entry) => {
    if (!searchValue) {
      return true;
    }
    const trimmedValue = searchValue.trim().toLowerCase();

    for (const property of ENTRY_SEARCH_PROPERTIES) {
      if (entry[property].toLowerCase().includes(trimmedValue)) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className="EntriesTable">
      <div className="tableContainer">
        <Table
          className="dataTable"
          celled
          selectable
          compact={tableDensity === TABLE_DENSITY.COMPACT.name ? "very" : false}
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
            {data.map((entry) => {
              if (!passesEntrySearch(entry)) {
                return null;
              }
              return (
                <Table.Row key={entry.id}>
                  {tableColumnFilter.map((column, index) => {
                    if (!column.isActive) {
                      return null;
                    }
                    if (column.property === "isStarred") {
                      return (
                        <Table.Cell key={index} singleLine>
                          <div className="starCell">
                            <span
                              className={
                                entry[column.property] ? "" : "unselectedStar"
                              }
                            >
                              <StarButton
                                isStarred={entry[column.property]}
                                onClick={() =>
                                  updateEntry({
                                    id: entry.id,
                                    isStarred: !entry[column.property],
                                  })
                                }
                              />
                            </span>
                          </div>
                        </Table.Cell>
                      );
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
                            <a
                              className="logoWrapper"
                              href={
                                entry.domain ? prependHttp(entry.domain) : null
                              }
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                borderColor: displaySettings.isCardColorOn
                                  ? entry["color"]
                                  : null,
                              }}
                            >
                              <LogoCircle entry={entry} />
                            </a>
                            <span>{entry[column.property]}</span>
                          </div>
                          <EditCellButton
                            entryId={entry["id"]}
                            propertyToEdit={column.property}
                          />
                        </Table.Cell>
                      );
                    }
                    if (column.property === "url") {
                      let truncatedUrl = entry[column.property];
                      if (truncatedUrl.length > maxUrlLength) {
                        truncatedUrl =
                          truncatedUrl.substr(0, maxUrlLength) + "\u2026";
                      }
                      return (
                        <Table.Cell key={index} singleLine>
                          <a
                            className="data urlCell"
                            href={prependHttp(entry[column.property])}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {truncatedUrl}
                          </a>
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
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default EntriesTable;
