import DashboardCard from "../DashboardCard/DashboardCard";
import { Dropdown } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BOARD_COLUMN_OPTION_ICONS, BOARD_DENSITY } from "../../../constants";
import DashboardIconCard from "../DashboardIconCard/DashboardIconCard";
import "./DashboardColumn.scss";

const MIN_WIDTH = 280;
const MAX_WIDTH = 310;

function DashboardColumn(props) {
  return (
    <div
      className="DashboardColumn"
      style={{
        minWidth: `${MIN_WIDTH * (props.isExpanded ? 2 : 1)}px`,
        maxWidth: `${MAX_WIDTH * (props.isExpanded ? 2 : 1)}px`,
      }}
    >
      <div className="content">
        <div className="heading">
          <span>
            <span className="status">{props.status.toUpperCase()}</span>
            <span className="numEntries">({props.entries.length})</span>
          </span>

          <Dropdown
            className="options"
            icon="ellipsis horizontal"
            direction="left"
          >
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => props.onOpenNewEntry({ status: props.status })}
              >
                <FontAwesomeIcon
                  className="optionIcon"
                  icon={BOARD_COLUMN_OPTION_ICONS.ADD_ENTRY}
                />{" "}
                Add an Entry
              </Dropdown.Item>
              {props.isExpanded ? (
                <Dropdown.Item onClick={() => props.onChangeExpanded(false)}>
                  <FontAwesomeIcon
                    className="optionIcon"
                    icon={BOARD_COLUMN_OPTION_ICONS.COMPRESS}
                  />{" "}
                  Compress View
                </Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => props.onChangeExpanded(true)}>
                  <FontAwesomeIcon
                    className="optionIcon"
                    icon={BOARD_COLUMN_OPTION_ICONS.EXPAND}
                  />{" "}
                  Expand View
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={props.onHideColumn}>
                <FontAwesomeIcon
                  className="optionIcon"
                  icon={BOARD_COLUMN_OPTION_ICONS.HIDE_COLUMN}
                />{" "}
                Hide Column
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="entriesGrid">
          {props.entries.map((entry, index) => {
            if (props.density === BOARD_DENSITY.ICONS.name) {
              return (
                <div
                  className={`entryIconCard ${
                    props.isExpanded ? "entryIconCard-halfWidth" : ""
                  }`}
                  key={index}
                >
                  <DashboardIconCard
                    entry={entry}
                    onOpenEditEntry={props.onOpenEditEntry}
                  />
                </div>
              );
            } else {
              return (
                <div
                  className={`entryCard ${
                    props.isExpanded ? "entryCard-halfWidth" : ""
                  }`}
                  key={index}
                >
                  <DashboardCard
                    entry={entry}
                    onOpenEditEntry={props.onOpenEditEntry}
                    density={props.density}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default DashboardColumn;
