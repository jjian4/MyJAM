import { useContext, useState, useRef, useEffect } from "react";
import { Button, Dropdown, Input } from "semantic-ui-react";
import AppContext from "../../AppContext";
import DashboardColumnFilterDropdown from "../Dashboard/DashboardColumnFilterDropdown/DashboardColumnFilterDropdown";
import EntriesTableColumnFilterDropdown from "../EntriesTable/EntriesTableColumnFilterDropdown/EntriesTableColumnFilterDropdown";
import DashboardSortDropdown from "../Dashboard/DashboardSortDropdown/DashboardSortDropdown";
import {
  BOARD_DENSITY,
  PORTFOLIO_DISPLAY,
  TABLE_DENSITY,
} from "../../utilities/constants";
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
    portfolioSettings,
    searchValue,
    setSearchValue,
    updatePortfolioSettings,
    portfoliosList,
    currentPortfolioId,
    entries,
    openNewEntryModal,
  } = useContext(AppContext);

  const {
    display,
    isCardColorOn,
    boardDensity,
    tableDensity,
  } = portfolioSettings;

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
        Status: entry.status,
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
        <Button.Group className="menuItem" basic size="mini">
          {Object.values(PORTFOLIO_DISPLAY).map((item, index) => (
            <Button
              key={index}
              icon
              active={item.name === display}
              onClick={() => updatePortfolioSettings({ display: item.name })}
            >
              {item.icon}
              {!isWindowSmall && (
                <span className="buttonLabel">{item.name}</span>
              )}
            </Button>
          ))}
        </Button.Group>
        {display === PORTFOLIO_DISPLAY.BOARD.name && (
          <Button.Group className="menuItem" basic size="mini">
            {Object.values(BOARD_DENSITY).map((item, index) => (
              <Button
                key={index}
                icon
                active={boardDensity === item.name}
                onClick={() =>
                  updatePortfolioSettings({ boardDensity: item.name })
                }
              >
                {item.icon}
                {!isWindowSmall && (
                  <span className="buttonLabel">{item.name}</span>
                )}
              </Button>
            ))}
          </Button.Group>
        )}
        {display === PORTFOLIO_DISPLAY.TABLE.name && (
          <Button.Group className="menuItem" basic size="mini">
            {Object.values(TABLE_DENSITY).map((item, index) => (
              <Button
                key={index}
                icon
                active={tableDensity === item.name}
                onClick={() =>
                  updatePortfolioSettings({ tableDensity: item.name })
                }
              >
                {item.icon}
                {!isWindowSmall && (
                  <span className="buttonLabel">{item.name}</span>
                )}
              </Button>
            ))}
          </Button.Group>
        )}
      </div>

      <div className="menuRight">
        <span className="menuItem">
          <Input
            icon="search"
            size="mini"
            placeholder="Search Entries..."
            loading={isSearchLoading}
            value={tempSearchValue}
            onChange={(e) => updateSearchValue(e.target.value)}
          />
        </span>

        {display === PORTFOLIO_DISPLAY.BOARD.name && (
          <span className="menuItem">
            <DashboardColumnFilterDropdown hideLabel={isWindowSmall} />
          </span>
        )}

        {display === PORTFOLIO_DISPLAY.BOARD.name && (
          <span className="menuItem">
            <DashboardSortDropdown hideLabel={isWindowSmall} />
          </span>
        )}

        {display === PORTFOLIO_DISPLAY.TABLE.name && (
          <span className="menuItem">
            <EntriesTableColumnFilterDropdown hideLabel={isWindowSmall} />
          </span>
        )}

        <Button
          className="menuItem"
          positive
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
              <Dropdown.Item onClick={() => console.log("TODO")}>
                <FontAwesomeIcon className="optionIcon" icon={faTintSlash} />{" "}
                Hide Card Colors
              </Dropdown.Item>
            ) : (
              <Dropdown.Item onClick={() => console.log("TODO")}>
                <FontAwesomeIcon className="optionIcon" icon={faTint} /> Show
                Card Colors
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
