import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox } from "semantic-ui-react";
import { ReactSortable } from "react-sortablejs";

import DropdownButton from "../../DropdownButton/DropdownButton";
import "./DashboardColumnFilterDropdown.scss";
import ControlledDropdown from "../../ControlledDropdown/ControlledDropdown";
import { BOARD_COLUMN_OPTION_ICONS } from "../../../constants";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

function DashboardColumnFilterDropdown(props) {
  const dropdownButton = (
    <DropdownButton
      size="mini"
      basic
      icon="filter"
      text={props.hideLabel ? null : "Columns"}
    />
  );

  const handleCheckboxToggle = (e, { value }) => {
    const newSettings = [...props.columnFilter];
    const status = value;

    const index = newSettings.findIndex((column) => column.status === status);

    newSettings[index].isActive = !newSettings[index].isActive;

    props.onChange(newSettings);
  };

  const handleSizeToggle = (status) => {
    const newSettings = [...props.columnFilter];

    const index = newSettings.findIndex((column) => column.status === status);

    newSettings[index].isExpanded = !newSettings[index].isExpanded;
    props.onChange(newSettings);
  };

  return (
    // Using custom dropdown (the default one closes on checkbox selection)
    <ControlledDropdown
      className="DashboardColumnFilterDropdown"
      icon={false}
      direction={props.hideLabel ? "left" : "right"}
      dropdownButton={dropdownButton}
    >
      <ReactSortable
        list={props.columnFilter}
        setList={props.onChange}
        animation={200}
        handle=".gripIcon"
      >
        {props.columnFilter.map((column) => (
          <div className="dropdownRow" key={column.status}>
            <div className="rowLeft">
              <div className="gripIcon">
                <FontAwesomeIcon icon={faGripVertical} />
              </div>

              <Checkbox
                toggle
                className="checkbox"
                label={`${column.status}${
                  props.entriesByStatus[column.status]?.length
                    ? ` (${props.entriesByStatus[column.status].length})`
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
    </ControlledDropdown>
  );
}

export default DashboardColumnFilterDropdown;
