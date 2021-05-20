import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripVertical,
  faLongArrowAltDown,
  faLongArrowAltUp,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Checkbox, Dropdown } from "semantic-ui-react";
import { ReactSortable } from "react-sortablejs";
import _ from "lodash";
import classnames from "classnames";
import AppContext from "../../../AppContext";
import DropdownButton from "../../DropdownButton/DropdownButton";
import ControlledDropdown from "../../ControlledDropdown/ControlledDropdown";
import {
  BOARD_COLUMN_OPTION_ICONS,
  BOARD_DENSITY,
  BOARD_SORT_BY,
} from "../../../utilities/constants";
import "./DashboardFilterDropdown.scss";

function DashboardFilterDropdown(props) {
  const {
    displaySettings,
    updateDisplaySettings,
    openStatusListModal,
    entries,
  } = useContext(AppContext);
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
    const statusId = value;
    const index = newSettings.findIndex(
      (column) => column.statusId === statusId
    );
    newSettings[index].isActive = !newSettings[index].isActive;
    updateDisplaySettings({ boardColumnFilter: newSettings });
  };

  const handleSizeToggle = (statusId) => {
    const newSettings = _.cloneDeep(boardColumnFilter);
    const index = newSettings.findIndex(
      (column) => column.statusId === statusId
    );
    newSettings[index].isExpanded = !newSettings[index].isExpanded;
    updateDisplaySettings({ boardColumnFilter: newSettings });
  };

  const statusCounts = {};
  entries.forEach(({ statusId }) => {
    if (statusId in statusCounts) {
      ++statusCounts[statusId];
    } else {
      statusCounts[statusId] = 1;
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
                className={classnames("densityRow", {
                  "densityRow-active": boardDensity === item.name,
                })}
                key={index}
                onClick={() =>
                  updateDisplaySettings({ boardDensity: item.name })
                }
              >
                <FontAwesomeIcon className="densityIcon" icon={item.icon} />{" "}
                {item.name}
              </div>
            ))}

            <div className="thickDivider" />

            <div className="dropdownSectionHeader">Sort By</div>
            {Object.values(BOARD_SORT_BY).map((option) => (
              <div
                className={classnames("sortRow", {
                  "sortRow-active": boardSortProperty === option.property,
                })}
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
                      className={classnames("sortDirectionIcon", {
                        "sortDirectionIcon-hidden":
                          boardSortProperty !== option.property,
                      })}
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
            <div className="dropdownSectionHeader">Status</div>
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
                <div className="statusRow" key={column.statusId}>
                  <div className="rowLeft">
                    <div className="gripIcon">
                      <FontAwesomeIcon icon={faGripVertical} />
                    </div>

                    <Checkbox
                      toggle
                      className="checkbox"
                      label={`${
                        boardColumnFilter.find(
                          (x) => x.statusId === column.statusId
                        ).status
                      }${
                        statusCounts[column.statusId]
                          ? ` (${statusCounts[column.statusId]})`
                          : ""
                      }`}
                      value={column.statusId}
                      checked={column.isActive}
                      onChange={handleCheckboxToggle}
                    />
                  </div>

                  <div
                    className={classnames("sizeButton", {
                      "sizeButton-active": column.isActive && column.isExpanded,
                      "sizeButton-hidden":
                        !column.isActive && !column.isExpanded,
                    })}
                    title="Expand"
                    onClick={() => handleSizeToggle(column.statusId)}
                  >
                    <FontAwesomeIcon icon={BOARD_COLUMN_OPTION_ICONS.EXPAND} />
                  </div>
                </div>
              ))}
            </ReactSortable>
            <Dropdown.Divider />
            <div className="editStatusButton" onClick={openStatusListModal}>
              <FontAwesomeIcon className="addStatusIcon" icon={faPencilAlt} />
              Edit Status List
            </div>
          </div>
        </div>
      </Dropdown.Menu>
    </ControlledDropdown>
  );
}

export default DashboardFilterDropdown;
