import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltDown,
  faLongArrowAltUp,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "semantic-ui-react";

import { SORT_BY } from "../../constants";
import "./DashboardSortDropdown.scss";
import DropdownButton from "../DropdownButton/DropdownButton";

function DashboardSortDropdown(props) {
  const dropdownButton = (
    <DropdownButton
      size="mini"
      basic
      icon={props.isSortAscending ? "sort amount up" : "sort amount down"}
      text={props.hideLabel ? null : `Sort by ${props.value}`}
    />
  );

  return (
    <Dropdown
      className="DashboardSortDropdown"
      trigger={dropdownButton}
      icon={false}
      direction={props.hideLabel ? "left" : "right"}
    >
      <Dropdown.Menu className="dropdownMenu">
        {Object.values(SORT_BY).map((option) => (
          <Dropdown.Item
            key={option.name}
            onClick={() =>
              props.onSelect(
                option.name,
                props.value === option.name
                  ? !props.isSortAscending
                  : option.isDefaultAscending
              )
            }
          >
            <div className="itemContent">
              <div>{option.name}</div>
              <div>
                <FontAwesomeIcon
                  className={`menuIcon ${
                    props.value !== option.name ? "menuIcon-hidden" : ""
                  }`}
                  icon={
                    props.isSortAscending
                      ? faLongArrowAltDown
                      : faLongArrowAltUp
                  }
                />
              </div>
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DashboardSortDropdown;
