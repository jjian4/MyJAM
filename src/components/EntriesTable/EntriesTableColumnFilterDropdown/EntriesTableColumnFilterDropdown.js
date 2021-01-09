import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox } from "semantic-ui-react";
import { ReactSortable } from "react-sortablejs";

import ControlledDropdown from "../../ControlledDropdown/ControlledDropdown";
import { BOARD_COLUMN_OPTION_ICONS } from "../../../constants";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import DropdownButton from "../../DropdownButton/DropdownButton";
import "./EntriesTableColumnFilterDropdown.scss";

function EntriesTableColumnFilterDropdown(props) {
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
    const columnName = value;

    const index = newSettings.findIndex((column) => column.name === columnName);

    newSettings[index].isActive = !newSettings[index].isActive;

    props.onChange(newSettings);
  };

  return (
    // Using custom dropdown (the default one closes on checkbox selection)
    <ControlledDropdown
      className="EntriesTableColumnFilterDropdown"
      icon={false}
      direction={props.hideLabel ? "left" : "right"}
      dropdownButton={dropdownButton}
    >
      <ReactSortable
        className="columnSorter"
        list={props.columnFilter}
        setList={props.onChange}
        animation={200}
        handle=".gripIcon"
      >
        {props.columnFilter.map((column) => (
          <div className="dropdownRow" key={column.property}>
            <div className="gripIcon">
              <FontAwesomeIcon icon={faGripVertical} />
            </div>

            <Checkbox
              toggle
              className="checkbox"
              label={column.name}
              value={column.name}
              checked={column.isActive}
              onChange={handleCheckboxToggle}
            />
          </div>
        ))}
      </ReactSortable>
    </ControlledDropdown>
  );
}

export default EntriesTableColumnFilterDropdown;
