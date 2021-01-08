import { useState, useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import dateFormat from "dateformat";

import { PORTFOLIO_DISPLAY, TABLE_DENSITY } from "../../constants";
import {
  LAST_TABLE_DENSITY,
  LAST_TABLE_IS_SORT_ASCENDING,
  LAST_TABLE_SORT_PROPERTY,
} from "../../settings";
import "./EntriesTable.scss";

function EntriesTable(props) {
  const [data, setData] = useState([]);

  const [activeColumns, setActiveColumns] = useState([
    { name: "Color", property: "color" },
    { name: "Company", property: "company" },
    { name: "Job Title", property: "jobTitle" },
    { name: "Status", property: "status" },
    { name: "Notes", property: "notes" },
    { name: "Last Update", property: "lastUpdate", isDate: true },
  ]);

  // Menu
  const [density, setDensity] = useState(LAST_TABLE_DENSITY);

  // Sorting
  const [sortProperty, setSortProperty] = useState(LAST_TABLE_SORT_PROPERTY);
  const [isSortAscending, setIsSortAscending] = useState(
    LAST_TABLE_IS_SORT_ASCENDING
  );

  useEffect(() => {
    if (props.entries) {
      let entries = [...props.entries];
      entries.sort((a, b) => (a[sortProperty] > b[sortProperty] ? 1 : -1));
      setData(isSortAscending ? entries : entries.reverse());
    }
  }, [props.entries, sortProperty, isSortAscending]);

  const handleSort = (newSortProperty) => {
    if (newSortProperty === sortProperty) {
      setIsSortAscending(!isSortAscending);
      setData(data.reverse());
    } else {
      setSortProperty(newSortProperty);
      setIsSortAscending(true);

      let entries = [...props.entries];
      entries.sort((a, b) =>
        a[newSortProperty] > b[newSortProperty] ? 1 : -1
      );
      setData(entries);
    }
  };

  const handleRowClick = (entry) => {
    console.log(entry);
    console.log("TODO");
  };

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
                {activeColumns.map((column, index) => (
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
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((entry) => (
                <Table.Row key={entry.id} onClick={() => handleRowClick(entry)}>
                  {activeColumns.map((column, index) => {
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
                          <div className="companyCell">
                            <img
                              className="logo"
                              src={entry["logo"]}
                              alt="logo"
                            />{" "}
                            {entry[column.property]}
                          </div>
                        </Table.Cell>
                      );
                    }
                    if (column.isDate && entry[column.property]) {
                      return (
                        <Table.Cell key={index} singleLine>
                          {dateFormat(entry[column.property], "mmm dd, yyyy")}
                        </Table.Cell>
                      );
                    }

                    return (
                      <Table.Cell key={index}>
                        {entry[column.property]}
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
