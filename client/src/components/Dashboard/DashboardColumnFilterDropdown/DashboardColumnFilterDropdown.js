import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox } from "semantic-ui-react";
import { ReactSortable } from "react-sortablejs";
import _ from "lodash";
import AppContext from "../../../AppContext";
import DropdownButton from "../../DropdownButton/DropdownButton";
import ControlledDropdown from "../../ControlledDropdown/ControlledDropdown";
import { BOARD_COLUMN_OPTION_ICONS } from "../../../utilities/constants";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import "./DashboardColumnFilterDropdown.scss";

function DashboardColumnFilterDropdown(props) {
  const { portfolioSettings, updatePortfolioSettings, entries } = useContext(
    AppContext
  );
  const { boardColumnFilter } = portfolioSettings;

  const dropdownButton = (
    <DropdownButton
      size="mini"
      basic
      icon="filter"
      text={props.hideLabel ? null : "Columns"}
    />
  );

  const handleCheckboxToggle = (e, { value }) => {
    const newSettings = _.cloneDeep(boardColumnFilter);
    const status = value;
    const index = newSettings.findIndex((column) => column.status === status);
    newSettings[index].isActive = !newSettings[index].isActive;
    updatePortfolioSettings({ boardColumnFilter: newSettings });
  };

  const handleSizeToggle = (status) => {
    const newSettings = _.cloneDeep(boardColumnFilter);
    const index = newSettings.findIndex((column) => column.status === status);
    newSettings[index].isExpanded = !newSettings[index].isExpanded;
    updatePortfolioSettings({ boardColumnFilter: newSettings });
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
      className="DashboardColumnFilterDropdown"
      icon={false}
      direction={props.hideLabel ? "left" : "right"}
      dropdownButton={dropdownButton}
    >
      <ReactSortable
        list={boardColumnFilter}
        setList={(x) => {
          x.forEach((item) => {
            delete item.selected;
            delete item.chosen;
          });
          updatePortfolioSettings({ boardColumnFilter: x });
        }}
        animation={200}
        handle=".gripIcon"
      >
        {boardColumnFilter.map((column) => (
          <div className="dropdownRow" key={column.status}>
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
    </ControlledDropdown>
  );
}

export default DashboardColumnFilterDropdown;
