import { useContext, useState, useRef, useEffect } from "react";
import { Button, Dropdown, Input } from "semantic-ui-react";
import AppContext from "../../AppContext";
import DashboardFilterDropdown from "../Dashboard/DashboardFilterDropdown/DashboardFilterDropdown";
import EntriesTableFilterDropdown from "../EntriesTable/EntriesTableFilterDropdown/EntriesTableFilterDropdown";
import { PORTFOLIO_DISPLAY } from "../../utilities/constants";
import "./PortfolioMenuBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faTint,
  faTintSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Parser } from "json2csv";
import dateFormat from "dateformat";

function PortfolioMenuBar() {
  const {
    displaySettings,
    searchValue,
    setSearchValue,
    updateDisplaySettings,
    portfoliosList,
    currentPortfolioId,
    entries,
    openNewEntryModal,
  } = useContext(AppContext);

  const { display, isCardColorOn } = displaySettings;

  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [tempSearchValue, setTempSearchValue] = useState(searchValue);
  const [isWindowSmall, setIsWindowSmall] = useState(window.innerWidth <= 991);

  const json2csvParser = new Parser();

  useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);
  // Resize portfolio menu items when window gets too small
  const resizeWindow = () => {
    setIsWindowSmall(window.innerWidth <= 991);
  };

  const searchTimeoutRef = useRef();
  const updateSearchValue = (newSearchValue) => {
    clearTimeout(searchTimeoutRef.current);
    setIsSearchLoading(true);
    setTempSearchValue(newSearchValue);
    // Update the real searchValue when there are no more changes
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearchLoading(false);
      setTempSearchValue(newSearchValue);
      setSearchValue(newSearchValue);
    }, 300);
  };

  const exportToCsv = () => {
    const portfolioName = portfoliosList.find(
      (x) => x.id === currentPortfolioId
    ).name;
    const filename = portfolioName.replace(/[^a-z0-9]/gi, "_").toLowerCase();

    // Make a new list to omit some properties (_id, color, etc) and capitalize column names
    const listToExport = [];
    entries.forEach((entry) => {
      listToExport.push({
        ID: entry.id,
        "Date Created": dateFormat(entry.dateCreated, "mmm dd, yyyy"),
        "Last Update": dateFormat(entry.lastUpdate, "mmm dd, yyyy"),
        "Starred?": entry.isStarred ? "Yes" : "No",
        Company: entry.company,
        Domain: entry.domain,
        "Job Title": entry.jobTitle,
        "Application Date": dateFormat(entry.applyDate, "mmm dd, yyyy"),
        "Next Deadline": dateFormat(entry.deadlineDate, "mmm dd, yyyy"),
        Status: entry.statusId,
        URL: entry.url,
        Notes: entry.notes,
      });
    });
    const csvString = json2csvParser.parse(listToExport);
    const file = new Blob([csvString], { type: "text/csv" });
    const tempElement = document.createElement("a");
    tempElement.download = filename;
    tempElement.href = URL.createObjectURL(file);
    document.body.appendChild(tempElement);
    tempElement.click();
    tempElement.remove();
  };

  return (
    <div className="PortfolioMenuBar">
      <div className="menuleft">
        <div className="menuItem displaySelector">
          {Object.values(PORTFOLIO_DISPLAY).map((item, index) => (
            <div
              className={`displayButton ${
                item.name === display ? "displayButton-active" : ""
              }`}
              key={index}
              onClick={() => updateDisplaySettings({ display: item.name })}
            >
              <FontAwesomeIcon className="displayIcon" icon={item.icon} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {display === PORTFOLIO_DISPLAY.BOARD.name && (
          <span className="menuItem">
            <DashboardFilterDropdown hideLabel={isWindowSmall} />
          </span>
        )}

        {display === PORTFOLIO_DISPLAY.TABLE.name && (
          <span className="menuItem">
            <EntriesTableFilterDropdown hideLabel={isWindowSmall} />
          </span>
        )}
      </div>

      <div className="menuRight">
        <span className="menuItem">
          <Input
            className="searchBar"
            icon="search"
            iconPosition="left"
            size="mini"
            placeholder="Search Entries..."
            loading={isSearchLoading}
            value={tempSearchValue}
            onChange={(e) => updateSearchValue(e.target.value)}
          />
        </span>

        <Button
          className="menuItem newEntryButton"
          size="mini"
          icon="plus"
          content={isWindowSmall ? null : "New Entry"}
          onClick={() => openNewEntryModal({})}
        />

        <Dropdown
          className="optionsDropdown"
          icon="ellipsis vertical"
          direction="left"
        >
          <Dropdown.Menu className="optionsMenu">
            {isCardColorOn ? (
              <Dropdown.Item
                onClick={() => updateDisplaySettings({ isCardColorOn: false })}
              >
                <FontAwesomeIcon className="optionIcon" icon={faTintSlash} />{" "}
                Hide Entry Colors
              </Dropdown.Item>
            ) : (
              <Dropdown.Item
                onClick={() => updateDisplaySettings({ isCardColorOn: true })}
              >
                <FontAwesomeIcon className="optionIcon" icon={faTint} /> Show
                Entry Colors
              </Dropdown.Item>
            )}
            <Dropdown.Item onClick={exportToCsv}>
              <FontAwesomeIcon className="optionIcon" icon={faDownload} />{" "}
              Export to CSV
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default PortfolioMenuBar;
