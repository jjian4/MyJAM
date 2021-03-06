import { useContext } from "react";
import { Dropdown } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDrop } from "react-dnd";
import _ from "lodash";
import classnames from "classnames";
import AppContext from "../../../AppContext";
import {
  ENTRY_SEARCH_PROPERTIES,
  BOARD_COLUMN_OPTION_ICONS,
  BOARD_DENSITY,
  DRAG_DROP_ITEMS,
} from "../../../utilities/constants";
import DashboardCard from "../DashboardCard/DashboardCard";
import DashboardIconCard from "../DashboardIconCard/DashboardIconCard";
import "./DashboardColumn.scss";

// const MIN_WIDTH = 280;
// const MAX_WIDTH = 310;
const MIN_WIDTH = 295;
const MAX_WIDTH = 295;

function DashboardColumn(props) {
  const {
    displaySettings,
    updateDisplaySettings,
    searchValue,
    openNewEntryModal,
    updateEntry,
  } = useContext(AppContext);

  const { boardDensity, boardColumnFilter } = displaySettings;

  // Used to receive cards that are drag-dropped from another column
  const handleCardDrop = (item) => {
    if (props.columnEntries.findIndex((entry) => entry.id === item.id) === -1) {
      updateEntry({ id: item.id, statusId: props.statusId });
    }
  };
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DRAG_DROP_ITEMS.DASHBOARD_CARD,
    drop: handleCardDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

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
    <div
      className="DashboardColumn"
      style={{
        minWidth: `${MIN_WIDTH * (props.isExpanded ? 2 : 1)}px`,
        maxWidth: `${MAX_WIDTH * (props.isExpanded ? 2 : 1)}px`,
      }}
    >
      <div
        ref={drop}
        className="content"
        style={{
          opacity: `${canDrop ? "0.9" : "1"}`,
          border: `${isOver ? "2px dashed gray" : "2px solid transparent"}`,
        }}
      >
        <div
          className="columnHeading"
          onDoubleClick={() => {
            const newColumnFilter = _.cloneDeep(boardColumnFilter);
            newColumnFilter[props.index].isExpanded =
              !newColumnFilter[props.index].isExpanded;
            updateDisplaySettings({
              boardColumnFilter: newColumnFilter,
            });
          }}
        >
          <span>
            <span className="status">
              {boardColumnFilter
                .find((x) => x.statusId === props.statusId)
                .status.toUpperCase()}
            </span>
            <span className="numEntries">({props.columnEntries.length})</span>
          </span>

          <Dropdown
            className="options"
            icon="ellipsis horizontal"
            direction="left"
          >
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => openNewEntryModal({ statusId: props.statusId })}
              >
                <FontAwesomeIcon
                  className="optionIcon"
                  icon={BOARD_COLUMN_OPTION_ICONS.ADD_ENTRY}
                />{" "}
                Add an Entry
              </Dropdown.Item>
              {props.isExpanded ? (
                <Dropdown.Item
                  onClick={() => {
                    const newColumnFilter = _.cloneDeep(boardColumnFilter);
                    newColumnFilter[props.index].isExpanded = false;
                    updateDisplaySettings({
                      boardColumnFilter: newColumnFilter,
                    });
                  }}
                >
                  <FontAwesomeIcon
                    className="optionIcon"
                    icon={BOARD_COLUMN_OPTION_ICONS.COMPRESS}
                  />{" "}
                  Compress View
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  onClick={() => {
                    const newColumnFilter = _.cloneDeep(boardColumnFilter);
                    newColumnFilter[props.index].isExpanded = true;
                    updateDisplaySettings({
                      boardColumnFilter: newColumnFilter,
                    });
                  }}
                >
                  <FontAwesomeIcon
                    className="optionIcon"
                    icon={BOARD_COLUMN_OPTION_ICONS.EXPAND}
                  />{" "}
                  Expand View
                </Dropdown.Item>
              )}
              <Dropdown.Item
                onClick={() => {
                  const newColumnFilter = _.cloneDeep(boardColumnFilter);
                  newColumnFilter[props.index].isActive = false;
                  updateDisplaySettings({
                    boardColumnFilter: newColumnFilter,
                  });
                }}
              >
                <FontAwesomeIcon
                  className="optionIcon"
                  icon={BOARD_COLUMN_OPTION_ICONS.HIDE_COLUMN}
                />{" "}
                Hide Column
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div
          className={classnames("entriesGrid", {
            "entriesGrid-expanded": props.isExpanded,
          })}
        >
          {props.columnEntries.map((entry) => {
            if (!passesEntrySearch(entry)) {
              return null;
            }

            if (boardDensity === BOARD_DENSITY.ICONS.name) {
              return (
                <div className="entryIconCard" key={entry.id}>
                  <DashboardIconCard entry={entry} />
                </div>
              );
            } else {
              return (
                <div className="entryCard" key={entry.id}>
                  <DashboardCard entry={entry} />
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
