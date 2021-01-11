import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "semantic-ui-react";
import { ReactSortable } from "react-sortablejs";
import AppContext from "../../../AppContext";
import ControlledDropdown from "../../ControlledDropdown/ControlledDropdown";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import DropdownButton from "../../DropdownButton/DropdownButton";
import "./EntriesTableColumnFilterDropdown.scss";

function EntriesTableColumnFilterDropdown(props) {
  const { portfolioSettings, updatePortfolioSettings } = useContext(AppContext);
  const { tableColumnFilter } = portfolioSettings;

  const dropdownButton = (
    <DropdownButton
      size="mini"
      basic
      icon="filter"
      text={props.hideLabel ? null : "Columns"}
    />
  );

  const handleCheckboxToggle = (e, { value }) => {
    const newSettings = [...tableColumnFilter];
    const columnName = value;

    const index = newSettings.findIndex((column) => column.name === columnName);

    newSettings[index].isActive = !newSettings[index].isActive;

    updatePortfolioSettings({ tableColumnFilter: newSettings });
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
        list={tableColumnFilter}
        setList={(x) => updatePortfolioSettings({ tableColumnFilter: x })}
        animation={200}
        handle=".gripIcon"
      >
        {tableColumnFilter.map((column) => (
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
