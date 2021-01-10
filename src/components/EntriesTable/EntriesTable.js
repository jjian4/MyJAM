import { useState, useEffect, useContext } from "react";
import { Button, Table } from "semantic-ui-react";
import dateFormat from "dateformat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import AppContext from "../../AppContext";
import { PORTFOLIO_DISPLAY, TABLE_DENSITY } from "../../constants";
import {
  LAST_TABLE_COLUMN_FILTER,
  LAST_TABLE_DENSITY,
  LAST_TABLE_IS_SORT_ASCENDING,
  LAST_TABLE_SORT_PROPERTY,
} from "../../settings";
import EntriesTableColumnFilterDropdown from "./EntriesTableColumnFilterDropdown/EntriesTableColumnFilterDropdown";

import "./EntriesTable.scss";

function EntriesTable(props) {
  const { entries } = useContext(AppContext);

  const [data, setData] = useState([]);

  // Menu
  const [density, setDensity] = useState(LAST_TABLE_DENSITY);
  const [columnFilter, setcolumnFilter] = useState(LAST_TABLE_COLUMN_FILTER);

  // Sorting
  const [sortProperty, setSortProperty] = useState(LAST_TABLE_SORT_PROPERTY);
  const [isSortAscending, setIsSortAscending] = useState(
    LAST_TABLE_IS_SORT_ASCENDING
  );

  useEffect(() => {
    if (entries) {
      let sortedEntries = [...entries];
      sortedEntries.sort((a, b) =>
        a[sortProperty] > b[sortProperty] ? 1 : -1
      );
      setData(isSortAscending ? sortedEntries : sortedEntries.reverse());
    }
  }, [entries, sortProperty, isSortAscending]);

  const handleSort = (newSortProperty) => {
    if (newSortProperty === sortProperty) {
      setIsSortAscending(!isSortAscending);
      setData(data.reverse());
    } else {
      setSortProperty(newSortProperty);
      setIsSortAscending(true);

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
      onClick={() => props.onOpenEditCell(entryId, propertyToEdit)}
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
            {Object.values(TABLE_DENSITY).map((item, index) => (
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
            <EntriesTableColumnFilterDropdown
              hideLabel={props.isWindowSmall}
              columnFilter={columnFilter}
              onChange={setcolumnFilter}
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

      <div className="content">
        <div className="tableContainer">
          <Table
            className="dataTable"
            celled
            selectable
            compact={density === TABLE_DENSITY.COMPACT.name ? "very" : false}
            size="small"
            sortable
            unstackable
          >
            <Table.Header>
              <Table.Row>
                {columnFilter.map((column, index) => {
                  if (!column.isActive) {
                    return null;
                  }
                  return (
                    <Table.HeaderCell
                      key={index}
                      sorted={
                        column.property === sortProperty
                          ? isSortAscending
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
                  {columnFilter.map((column, index) => {
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
