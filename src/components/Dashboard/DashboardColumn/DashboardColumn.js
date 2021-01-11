import { useContext } from "react";
import { Dropdown } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDrop } from "react-dnd";

import AppContext from "../../../AppContext";
import {
  BOARD_COLUMN_OPTION_ICONS,
  BOARD_DENSITY,
  DRAG_DROP_ITEMS,
} from "../../../constants";
import DashboardCard from "../DashboardCard/DashboardCard";
import DashboardIconCard from "../DashboardIconCard/DashboardIconCard";
import "./DashboardColumn.scss";

const MIN_WIDTH = 280;
const MAX_WIDTH = 310;

function DashboardColumn(props) {
  const {
    portfolioSettings,
    updatePortfolioSettings,
    openNewEntryModal,
    updateEntry,
  } = useContext(AppContext);

  const { boardDensity, boardColumnFilter } = portfolioSettings;

  // Used to receive cards that are drag-dropped from another column
  const handleCardDrop = (item) => {
    if (props.columnEntries.findIndex((entry) => entry.id === item.id) === -1) {
      updateEntry({ id: item.id, status: props.status });
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
        <div className="columnHeading">
          <span>
            <span className="status">{props.status.toUpperCase()}</span>
            <span className="numEntries">({props.columnEntries.length})</span>
          </span>

          <Dropdown
            className="options"
            icon="ellipsis horizontal"
            direction="left"
          >
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => openNewEntryModal({ status: props.status })}
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
                    const newColumnFilter = [...boardColumnFilter];
                    newColumnFilter[props.index].isExpanded = false;
                    updatePortfolioSettings({
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
                    const newColumnFilter = [...boardColumnFilter];
                    newColumnFilter[props.index].isExpanded = true;
                    updatePortfolioSettings({
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
                  const newColumnFilter = [...boardColumnFilter];
                  newColumnFilter[props.index].isActive = false;
                  updatePortfolioSettings({
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
          className={`entriesGrid ${
            props.isExpanded ? "entriesGrid-expanded" : ""
          }`}
        >
          {props.columnEntries.map((entry) => {
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
