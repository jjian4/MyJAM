import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox } from "semantic-ui-react";

import DropdownButton from "../../DropdownButton/DropdownButton";
import "./DashboardColumnFilterDropdown.scss";
import ControlledDropdown from "../../ControlledDropdown/ControlledDropdown";
import { BOARD_COLUMN_OPTION_ICONS } from "../../../constants";

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

    const index = props.columnFilter.findIndex(
      (column) => column.status === status
    );
    if (index === -1) {
      newSettings.push({ status: status, isExpanded: false });
    } else {
      newSettings.splice(index, 1);
    }
    props.onChange(newSettings);
  };

  const handleSizeToggle = (status) => {
    const newSettings = [...props.columnFilter];

    const index = props.columnFilter.findIndex(
      (column) => column.status === status
    );
    if (index === -1) {
      return;
    }

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
      {Object.keys(props.entriesByStatus).map((status, index) => (
        <div className="dropdownRow" key={index}>
          <Checkbox
            toggle
            className="checkbox"
            label={`${status}${
              props.entriesByStatus[status].length
                ? ` (${props.entriesByStatus[status].length})`
                : ""
            }`}
            value={status}
            checked={
              props.columnFilter.findIndex(
                (column) => column.status === status
              ) !== -1
            }
            onChange={handleCheckboxToggle}
          />

          <Button
            className={`sizeButton ${
              props.columnFilter.findIndex(
                (column) => column.status === status
              ) === -1
                ? "sizeButton-hidden"
                : ""
            }`}
            title="Expand"
            basic
            size="mini"
            icon
            active={
              props.columnFilter.find((column) => column.status === status)
                ?.isExpanded
            }
            onClick={() => handleSizeToggle(status)}
          >
            <FontAwesomeIcon icon={BOARD_COLUMN_OPTION_ICONS.EXPAND} />
          </Button>
        </div>
      ))}
    </ControlledDropdown>
  );
}

export default DashboardColumnFilterDropdown;
