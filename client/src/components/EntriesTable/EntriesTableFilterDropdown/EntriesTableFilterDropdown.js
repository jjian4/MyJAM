import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Dropdown } from "semantic-ui-react";
import { ReactSortable } from "react-sortablejs";
import _ from "lodash";
import AppContext from "../../../AppContext";
import ControlledDropdown from "../../ControlledDropdown/ControlledDropdown";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import DropdownButton from "../../DropdownButton/DropdownButton";
import "./EntriesTableFilterDropdown.scss";
import { TABLE_DENSITY } from "../../../utilities/constants";

function EntriesTableFilterDropdown(props) {
  const { displaySettings, updateDisplaySettings } = useContext(AppContext);
  const { tableColumnFilter, tableDensity } = displaySettings;

  const dropdownButton = (
    <DropdownButton
      size="tiny"
      basic
      icon="filter"
      text={props.hideLabel ? null : "Display"}
    />
  );

  const handleCheckboxToggle = (e, { value }) => {
    const newSettings = _.cloneDeep(tableColumnFilter);
    const columnName = value;

    const index = newSettings.findIndex((column) => column.name === columnName);

    newSettings[index].isActive = !newSettings[index].isActive;

    updateDisplaySettings({ tableColumnFilter: newSettings });
  };

  return (
    // Using custom dropdown (the default one closes on checkbox selection)
    <ControlledDropdown
      className="EntriesTableFilterDropdown"
      icon={false}
      direction="right"
      dropdownButton={dropdownButton}
    >
      <Dropdown.Menu className="dropdownMenu">
        <div className="dropdownMenuContent">
          <div className="dropdownSectionHeader">Density</div>

          <div className="densitySection">
            {Object.values(TABLE_DENSITY).map((item, index) => (
              <div
                className={`densityRow ${
                  tableDensity === item.name ? "densityRow-active" : ""
                }`}
                key={index}
                onClick={() =>
                  updateDisplaySettings({ tableDensity: item.name })
                }
              >
                <FontAwesomeIcon className="densityIcon" icon={item.icon} />{" "}
                {item.name}
              </div>
            ))}
          </div>

          <div className="thickDivider" />

          <div className="dropdownSectionHeader">Columns</div>

          <ReactSortable
            className="columnSorter"
            list={tableColumnFilter}
            setList={(x) => {
              x.forEach((item) => {
                delete item.selected;
                delete item.chosen;
              });
              updateDisplaySettings({ tableColumnFilter: x });
            }}
            animation={200}
            handle=".gripIcon"
          >
            {tableColumnFilter.map((column) => (
              <div className="columnsRow" key={column.property}>
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
        </div>
      </Dropdown.Menu>
    </ControlledDropdown>
  );
}

export default EntriesTableFilterDropdown;
