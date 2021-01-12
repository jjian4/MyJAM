import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltDown,
  faLongArrowAltUp,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "semantic-ui-react";
import AppContext from "../../../AppContext";
import { BOARD_SORT_BY } from "../../../constants";
import "./DashboardSortDropdown.scss";
import DropdownButton from "../../DropdownButton/DropdownButton";

function DashboardSortDropdown(props) {
  const { portfolioSettings, updatePortfolioSettings } = useContext(AppContext);
  const { boardSortProperty, boardIsSortAscending } = portfolioSettings;

  const dropdownButton = (
    <DropdownButton
      size="mini"
      basic
      icon={boardIsSortAscending ? "sort amount up" : "sort amount down"}
      text={
        props.hideLabel ? null : "Sort"
        // : `Sort by ${
        //     Object.values(BOARD_SORT_BY).find(
        //       (x) => x.property === boardSortProperty
        //     ).name
        //   }`
      }
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
        {Object.values(BOARD_SORT_BY).map((option) => (
          <Dropdown.Item
            key={option.name}
            selected={boardSortProperty === option.property}
            onClick={() =>
              updatePortfolioSettings({
                boardSortProperty: option.property,
                boardIsSortAscending:
                  boardSortProperty === option.property
                    ? !boardIsSortAscending
                    : option.isDefaultAscending,
              })
            }
          >
            <div className="itemContent">
              <div>{option.name}</div>
              <div>
                <FontAwesomeIcon
                  className={`menuIcon ${
                    boardSortProperty !== option.property
                      ? "menuIcon-hidden"
                      : ""
                  }`}
                  icon={
                    boardIsSortAscending ? faLongArrowAltDown : faLongArrowAltUp
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
