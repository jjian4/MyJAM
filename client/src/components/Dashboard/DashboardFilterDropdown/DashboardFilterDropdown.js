import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Dropdown } from "semantic-ui-react";
import { ReactSortable } from "react-sortablejs";
import _ from "lodash";
import AppContext from "../../../AppContext";
import DropdownButton from "../../DropdownButton/DropdownButton";
import ControlledDropdown from "../../ControlledDropdown/ControlledDropdown";
import {
  BOARD_COLUMN_OPTION_ICONS,
  BOARD_DENSITY,
} from "../../../utilities/constants";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import "./DashboardFilterDropdown.scss";

function DashboardFilterDropdown(props) {
  const { displaySettings, updateDisplaySettings, entries } = useContext(
    AppContext
  );
  const { boardDensity, boardColumnFilter } = displaySettings;

  const dropdownButton = (
    <DropdownButton
      size="mini"
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
      direction="left"
      dropdownButton={dropdownButton}
    >
      <Dropdown.Menu className="dropdownMenu">
        <Dropdown.Header className="dropdownHeader" content="Density" />
        {Object.values(BOARD_DENSITY).map((item, index) => (
          <Dropdown.Item
            className="densityRow"
            key={index}
            active={boardDensity === item.name}
            onClick={() => updateDisplaySettings({ boardDensity: item.name })}
          >
            <FontAwesomeIcon className="densityIcon" icon={item.icon} />{" "}
            {item.name}
          </Dropdown.Item>
        ))}

        <Dropdown.Divider />

        <Dropdown.Header className="dropdownHeader" content="Columns" />
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

              <Button
                className={`sizeButton ${
                  column.isActive ? "" : "sizeButton-hidden"
                }`}
                title="Expand"
                basic
                size="mini"
                icon
                toggle
                circular
                active={column.isExpanded}
                onClick={() => handleSizeToggle(column.status)}
              >
                <FontAwesomeIcon icon={BOARD_COLUMN_OPTION_ICONS.EXPAND} />
              </Button>
            </div>
          ))}
        </ReactSortable>
      </Dropdown.Menu>
    </ControlledDropdown>
  );
}

export default DashboardFilterDropdown;
