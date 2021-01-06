import { useState } from "react";
import { Button } from "semantic-ui-react";
import DataTable, { createTheme } from "react-data-table-component";
import dateFormat from "dateformat";

import {
  MENU_HEIGHT,
  PORTFOLIO_DISPLAY,
  PORTFOLIO_MENU_HEIGHT,
  TABLE_DENSITY,
} from "../../constants";
import { LAST_TABLE_DENSITY } from "../../settings";
import "./EntriesTable.scss";

// createTheme("myTheme", {
//   text: {
//     primary: "black",
//     secondary: "gray",
//   },
//   background: {
//     default: "transparant",
//   },
//   action: {
//     hover: "rgba(0,0,0,.08)",
//   },
// });

const columns = [
  {
    name: "Date Created",
    selector: "dateCreated",
    sortable: true,
    format: (row) => dateFormat(row.dateCreated, "mmm dd, yyyy"),
  },
  {
    name: "Last Update",
    selector: "lastUpdate",
    sortable: true,
    format: (row) => dateFormat(row.lastUpdate, "mmm dd, yyyy"),
  },
  {
    name: "Color",
    selector: "color",
    sortable: true,
    cell: (row) => (
      <div className="colorCell">
        <div
          className="color"
          style={{ backgroundColor: row.color }}
          title={row.color}
        />
      </div>
    ),
    grow: 0,
  },
  {
    name: "Company",
    selector: "company",
    sortable: true,
    cell: (row) => (
      <div className="companyCell">
        <img className="logo" src={row.logo} alt="logo" /> {row.company}
      </div>
    ),
    grow: 1.5,
  },
  {
    name: "Job Title",
    selector: "jobTitle",
    sortable: true,
    grow: 1.5,
    wrap: true,
  },
  {
    name: "Application Date",
    selector: "applyDate",
    sortable: true,
    format: (row) => dateFormat(row.applyDate, "mmm dd, yyyy"),
  },

  {
    name: "Deadline Date",
    selector: "deadlineDate",
    sortable: true,
    format: (row) => dateFormat(row.deadlineDate, "mmm dd, yyyy"),
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
  },
  {
    name: "Notes",
    selector: "notes",
    sortable: true,
    grow: 1.5,
    wrap: true,
  },
];

function EntriesTable(props) {
  // Menu
  const [density, setDensity] = useState(LAST_TABLE_DENSITY);

  const handleRowClick = (e) => {
    console.log(e);
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
        <DataTable
          className="dataTable"
          // title="Summer Internships 2019"
          noHeader
          // fixedHeader
          // fixedHeaderScrollHeight={`calc(100vh - ${MENU_HEIGHT} - ${PORTFOLIO_MENU_HEIGHT} - 56px)`}
          columns={columns}
          data={props.entries}
          onRowClicked={handleRowClick}
          highlightOnHover
          pointerOnHover
          dense={density === TABLE_DENSITY.COMPACT.name}
          // theme="myTheme"
        />
      </div>
    </div>
  );
}

export default EntriesTable;
