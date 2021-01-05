import DashboardCard from "../DashboardCard/DashboardCard";
import { Dropdown } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompressAlt,
  faExpand,
  faMinus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

import "./DashboardColumn.scss";
import { PORTFOLIO_DENSITY } from "../../constants";
import DashboardIconCard from "../DashboardIconCard/DashboardIconCard";

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
                <FontAwesomeIcon className="optionIcon" icon={faPlusCircle} />{" "}
                Add an Entry
              </Dropdown.Item>
              {props.isExpanded ? (
                <Dropdown.Item onClick={() => props.onChangeExpanded(false)}>
                  <FontAwesomeIcon
                    className="optionIcon"
                    icon={faCompressAlt}
                  />{" "}
                  Compress View
                </Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => props.onChangeExpanded(true)}>
                  <FontAwesomeIcon className="optionIcon" icon={faExpand} />{" "}
                  Expand View
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={props.onHideColumn}>
                <FontAwesomeIcon className="optionIcon" icon={faMinus} /> Hide
                Column
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="entriesGrid">
          {props.entries.map((entry, index) => (
            <>
              {props.density === PORTFOLIO_DENSITY.ICONS.name ? (
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
              ) : (
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
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardColumn;
