import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faCompressAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Checkbox } from "semantic-ui-react";

import DropdownButton from "../../DropdownButton/DropdownButton";
import "./DashboardColumnFilterDropdown.scss";
import ControlledDropdown from "../../ControlledDropdown/ControlledDropdown";

function DashboardColumnFilterDropdown(props) {
  const dropdownButton = (
    <DropdownButton
      size="mini"
      basic
      icon="filter"
      text={props.hideLabel ? null : "Columns"}
    />
  );

  const handleCheckboxChange = (e, { value }) => {
    const newSettings = Object.assign({}, props.columnFilter);
    const status = value;

    if (newSettings[status]?.isActive) {
      newSettings[status].isActive = false;
    } else if (newSettings[status]) {
      newSettings[status].isActive = true;
    } else {
      newSettings[status] = { isActive: true, isExpanded: false };
    }
    props.onChange(newSettings);
  };

  const handleSizeChange = (status, isExpanded) => {
    if (props.columnFilter?.isExpanded === isExpanded) {
      return;
    }
    const newSettings = Object.assign({}, props.columnFilter);

    if (newSettings[status]) {
      newSettings[status].isExpanded = isExpanded;
    } else {
      newSettings[status] = { isActive: false, isExpanded: isExpanded };
    }

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
            checked={props.columnFilter[status]?.isActive}
            onChange={handleCheckboxChange}
          />

          <Button.Group className="sizeButtons" basic size="mini">
            <Button
              title="Compress"
              icon
              active={!props.columnFilter[status]?.isExpanded}
              onClick={() => handleSizeChange(status, false)}
            >
              <FontAwesomeIcon icon={faCompressAlt} />
            </Button>
            <Button
              title="Expand"
              icon
              active={props.columnFilter[status]?.isExpanded}
              onClick={() => handleSizeChange(status, true)}
            >
              <FontAwesomeIcon icon={faExpand} />
            </Button>
          </Button.Group>
        </div>
      ))}
    </ControlledDropdown>
  );
}

export default DashboardColumnFilterDropdown;
