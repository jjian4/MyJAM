import { useState } from "react";
import { Button, Table } from "semantic-ui-react";
import dateFormat from "dateformat";

import { PORTFOLIO_DISPLAY, TABLE_DENSITY } from "../../constants";
import { LAST_TABLE_DENSITY } from "../../settings";
import "./EntriesTable.scss";

function EntriesTable(props) {
  // Menu
  const [density, setDensity] = useState(LAST_TABLE_DENSITY);

  const [dataOrder, setDataOrder] = useState([
    { name: "Color", property: "color" },
    { name: "Company", property: "company" },
    { name: "Job Title", property: "jobTitle" },
    { name: "Status", property: "status" },
    { name: "Notes", property: "notes" },
    { name: "Date Created", property: "dateCreated", isDate: true },
    { name: "Last Update", property: "lastUpdate", isDate: true },
    { name: "Application Date", property: "applyDate", isDate: true },
    { name: "Deadline Date", property: "deadlineDate", isDate: true },
  ]);

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

      <div className="dataTableContainer">
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
              {dataOrder.map((column, index) => (
                <Table.HeaderCell
                  key={index}
                  // sorted={column === "name" ? direction : null}
                  // onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
                >
                  {column.name}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.entries.map((entry) => (
              <Table.Row key={entry.id} onClick={() => handleRowClick(entry)}>
                {dataOrder.map((column, index) => {
                  if (column.property === "color") {
                    return (
                      <Table.Cell key={index} singleLine>
                        <div className="colorCell">
                          <div
                            className="color"
                            style={{ backgroundColor: entry[column.property] }}
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
  );
}

export default EntriesTable;
