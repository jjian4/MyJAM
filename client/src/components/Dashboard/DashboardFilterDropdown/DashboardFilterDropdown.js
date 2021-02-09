import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Dropdown } from "semantic-ui-react";
import { ReactSortable } from "react-sortablejs";
import _ from "lodash";
import AppContext from "../../../AppContext";
import DropdownButton from "../../DropdownButton/DropdownButton";
import ControlledDropdown from "../../ControlledDropdown/ControlledDropdown";
import {
  BOARD_COLUMN_OPTION_ICONS,
  BOARD_DENSITY,
  BOARD_SORT_BY,
} from "../../../utilities/constants";
import {
  faGripVertical,
  faLongArrowAltDown,
  faLongArrowAltUp,
} from "@fortawesome/free-solid-svg-icons";
import "./DashboardFilterDropdown.scss";

function DashboardFilterDropdown(props) {
  const { displaySettings, updateDisplaySettings, entries } = useContext(
    AppContext
  );
  const {
    boardDensity,
    boardSortProperty,
    boardIsSortAscending,
    boardColumnFilter,
  } = displaySettings;

  const dropdownButton = (
    <DropdownButton
      size="tiny"
      basic
      icon="filter"
      text={props.hideLabel ? null : "Display"}
    />
  );

  const handleCheckboxToggle = (e, { value }) => {
    const newSettings = _.cloneDeep(boardColumnFilter);
    const status = value;
    const index = newSettings.findIndex((column) => column.status === status);
    newSettings[index].isActive = !newSettings[index].isActive;
    updateDisplaySettings({ boardColumnFilter: newSettings });
  };

  const handleSizeToggle = (status) => {
    const newSettings = _.cloneDeep(boardColumnFilter);
    const index = newSettings.findIndex((column) => column.status === status);
    newSettings[index].isExpanded = !newSettings[index].isExpanded;
    updateDisplaySettings({ boardColumnFilter: newSettings });
  };

  const statusCounts = {};
  entries.forEach(({ status }) => {
    if (status in statusCounts) {
      ++statusCounts[status];
    } else {
      statusCounts[status] = 1;
    }
  });

  return (
    // Using custom dropdown (the default one closes on checkbox selection)
    <ControlledDropdown
      className="DashboardFilterDropdown"
      icon={false}
      direction="right"
      dropdownButton={dropdownButton}
    >
      <Dropdown.Menu className="dropdownMenu">
        <div className="dropdownMenuContent">
          <div className="leftMenuColumn">
            <div className="dropdownSectionHeader">Density</div>
            {Object.values(BOARD_DENSITY).map((item, index) => (
              <div
                className={`densityRow ${
                  boardDensity === item.name ? "densityRow-active" : ""
                }`}
                key={index}
                onClick={() =>
                  updateDisplaySettings({ boardDensity: item.name })
                }
              >
                <FontAwesomeIcon className="densityIcon" icon={item.icon} />{" "}
                {item.name}
              </div>
            ))}

            <div className="dropdownDivider" />

            <div className="dropdownSectionHeader">Sort By</div>
            {Object.values(BOARD_SORT_BY).map((option) => (
              <div
                className={`sortRow ${
                  boardSortProperty === option.property ? "sortRow-active" : ""
                }`}
                key={option.name}
                onClick={() =>
                  updateDisplaySettings({
                    boardSortProperty: option.property,
                    boardIsSortAscending:
                      boardSortProperty === option.property
                        ? !boardIsSortAscending
                        : option.isDefaultAscending,
                  })
                }
              >
                <div className="sortRowContent">
                  <div>{option.name}</div>
                  <div>
                    <FontAwesomeIcon
                      className={`sortDirectionIcon ${
                        boardSortProperty !== option.property
                          ? "sortDirectionIcon-hidden"
                          : ""
                      }`}
                      icon={
                        boardIsSortAscending
                          ? faLongArrowAltDown
                          : faLongArrowAltUp
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rightMenuColumn">
            <div className="dropdownSectionHeader">Statuses</div>
            <ReactSortable
              list={boardColumnFilter}
              setList={(x) => {
                x.forEach((item) => {
                  delete item.selected;
                  delete item.chosen;
                });
                updateDisplaySettings({ boardColumnFilter: x });
              }}
              animation={200}
              handle=".gripIcon"
            >
              {boardColumnFilter.map((column) => (
                <div className="statusRow" key={column.status}>
                  <div className="rowLeft">
                    <div className="gripIcon">
                      <FontAwesomeIcon icon={faGripVertical} />
                    </div>

                    <Checkbox
                      toggle
                      className="checkbox"
                      label={`${column.status}${
                        statusCounts[column.status]
                          ? ` (${statusCounts[column.status]})`
                          : ""
                      }`}
                      value={column.status}
                      checked={column.isActive}
                      onChange={handleCheckboxToggle}
                    />
                  </div>

                  <div
                    className={`sizeButton ${
                      column.isActive
                        ? column.isExpanded
                          ? "sizeButton-active"
                          : ""
                        : "sizeButton-hidden"
                    }`}
                    title="Expand"
                    onClick={() => handleSizeToggle(column.status)}
                  >
                    <FontAwesomeIcon icon={BOARD_COLUMN_OPTION_ICONS.EXPAND} />
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
        </div>
      </Dropdown.Menu>
    </ControlledDropdown>
  );
}

export default DashboardFilterDropdown;
