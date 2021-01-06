import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";

import { PORTFOLIO_DISPLAY, TABLE_DENSITY } from "../../constants";
import { LAST_TABLE_DENSITY } from "../../settings";

import "./EntriesTable.scss";

function EntriesTable(props) {
  // Menu
  const [density, setDensity] = useState(LAST_TABLE_DENSITY);

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

      <div className="dataTable"></div>
    </div>
  );
}

export default EntriesTable;
