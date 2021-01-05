import { useState, useEffect } from "react";
import { Button, Dropdown } from "semantic-ui-react";

import DashboardColumn from "../../components/DashboardColumn/DashboardColumn";
import DashboardSortDropdown from "../../components/DashboardSortDropdown/DashboardSortDropdown";
import DashboardStatusFilterDropdown from "../../components/DashboardStatusFilterDropdown/DashboardStatusFilterDropdown";
import EditEntryModal from "../../components/EditEntryModal/EditEntryModal";
import {
  PORTFOLIO_DISPLAY,
  PORTFOLIO_DENSITY,
  STATUS,
  SORT_BY,
} from "../../constants";
import {
  LAST_PORTFOLIO_DISPLAY,
  LAST_PORTFOLIO_DENSITY,
  LAST_FILTER_SETTINGS,
} from "../../settings";
import "./Portfolio.scss";

const fakeEntries3 = [
  {
    id: 1234,
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    color: "darkorchid",
    isStarred: false,
    company: "Facebook",
    domain: "google.com",
    logo: "https://logo.clearbit.com/facebook.com",
    jobTitle: "Software Engineer",
    applyDate: "2020-01-01",
    deadlineDate: "",
    status: STATUS.APPLIED,
    url: "",
    notes: "",
  },
  {
    id: 5678,
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    color: "chocolate",
    isStarred: true,
    company: "Apple",
    domain: "google.com",
    logo: "https://logo.clearbit.com/apple.com",
    jobTitle: "Mechanical Engineer Intern - Cupertino, California",
    applyDate: "2020-05-03",
    deadlineDate: "2020-01-01",
    status: STATUS.APPLIED,
    url: "https://apple.com",
    notes:
      "kjdasfnjasnvsa o jsdkfsa\njsdav inus oufjuh oudsofjof sd\nAnother line",
  },
  {
    id: 1234,
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    color: "navy",
    isStarred: true,
    company: "Doordash",
    domain: "google.com",
    logo: "https://logo.clearbit.com/doordash.com",
    jobTitle: "Software Engineer Intern",
    applyDate: "2020-01-01",
    deadlineDate: "2020-01-01",
    status: STATUS.INTERVIEW,
    url: "",
    notes: "siufha uafoidjiof oufdhsauofdj oqhwfw",
  },
  {
    id: 1234,
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    color: "seagreen",
    isStarred: false,
    company: "Facebook",
    domain: "",
    logo: "https://logo.clearbit.com/facebook.com",
    jobTitle: "Software Engineer II",
    applyDate: "2020-01-01",
    deadlineDate: "",
    status: STATUS.APPLIED,
    url: "",
    notes: "",
  },
  {
    id: 5678,
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    color: "darkgreen",
    isStarred: true,
    company: "Apple",
    domain: "google.com",
    logo: "https://logo.clearbit.com/apple.com",
    jobTitle: "Mechanical Engineer Intern - Cupertino, California",
    applyDate: "2020-01-01",
    deadlineDate: "2020-01-01",
    status: STATUS.APPLIED,
    url: "https://apple.com",
    notes: "awiufwb\n\n\n\nsfwsdhbfsi",
  },
  {
    id: 1234,
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    color: "indianred",
    isStarred: true,
    company: "Doordash",
    domain: "google.com",
    logo: "https://logo.clearbit.com/doordash.com",
    jobTitle: "Software Engineer Intern",
    applyDate: "2020-01-01",
    deadlineDate: "2020-01-01",
    status: STATUS.OFFER,
    url: "https://doordash.com",
    notes: "siufha uafoidjiof oufdhsauofdj oqhwfw",
  },
  {
    id: 1234,
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    color: "darkcyan",
    isStarred: false,
    company: "Facebook",
    domain: "google.com",
    logo: "https://logo.clearbit.com/facebook.com",
    jobTitle: "Software Engineer",
    applyDate: "2020-01-01",
    deadlineDate: "",
    status: STATUS.APPLIED,
    url: "",
    notes: "sdjk dsaiiuh\nsdui",
  },
  {
    id: 1234,
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    color: "mediumorchid",
    isStarred: false,
    company: "Microsoft",
    domain: "google.com",
    logo: "https://logo.clearbit.com/microsoft.com",
    jobTitle: "QA Engineer",
    applyDate: "2020-01-01",
    deadlineDate: "",
    status: STATUS.INTERVIEW,
    url: "https://microsoft.com",
    notes: "usf iosoidsoiaoi dsdsoa oiuh iuweq w ef",
  },
  {
    id: 1234,
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    color: "coral",
    isStarred: false,
    company: "Oracle",
    domain: "oracle.com",
    logo: "https://logo.clearbit.com/oracle.com",
    jobTitle: "QA Engineer II",
    applyDate: "2020-01-01",
    deadlineDate: "",
    status: STATUS.OFFER,
    url: "",
    notes: "usf sfs wdfs dsef",
  },
  {
    id: 1234,
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    color: "slateblue",
    isStarred: true,
    company: "Salesforce",
    domain: "salesforce.com",
    logo: "https://logo.clearbit.com/salesforce.com",
    jobTitle: "Data Analyst",
    applyDate: "2020-01-01",
    deadlineDate: "2020-01-01",
    status: STATUS.INTERVIEW,
    url: "https://salesforce.com",
    notes: "usf sfs wdfs dsef",
  },
  {
    id: 1234,
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    color: "navy",
    isStarred: false,
    company: "React",
    domain: "google.com",
    logo: "https://logo.clearbit.com/reactjs.org",
    jobTitle: "Software Engineer III",
    applyDate: "2020-01-01",
    deadlineDate: "2020-11-22",
    status: STATUS.APPLIED,
    url: "",
    notes: "",
  },
];

function Portfolio() {
  const [isWindowSmall, setIsWindowSmall] = useState(window.innerWidth <= 991);

  // Menu options
  const [display, setDisplay] = useState(LAST_PORTFOLIO_DISPLAY);
  const [density, setDensity] = useState(LAST_PORTFOLIO_DENSITY);
  const [sortBy, setSortBy] = useState(SORT_BY.LAST_UPDATED.name);
  const [isSortAscending, setIsSortAscending] = useState(
    SORT_BY.LAST_UPDATED.isDefaultAscending
  );
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [filterSettings, setFilterSettings] = useState(LAST_FILTER_SETTINGS);

  // Entries
  const [entriesByStatus, setEntriesByStatus] = useState({});

  // Edit Entry Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newModalInitialValues, setNewModalInitialValues] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalInitialValues, setEditModalInitialValues] = useState({});

  useEffect(() => {
    // TODO: fetch portfolio entries from db
    const statusToEntry = {};
    Object.values(STATUS).forEach((status) => {
      statusToEntry[status] = [];
    });
    fakeEntries3.forEach((entry) => {
      statusToEntry[entry.status].push(entry);
    });
    setEntriesByStatus(statusToEntry);

    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  const sortDashboardEntries = (sortBy, isSortAscending) => {
    setSortBy(sortBy);
    setIsSortAscending(isSortAscending);

    const entryProperty = Object.values(SORT_BY).find((x) => x.name === sortBy)
      .entryProperty;
    const statusToEntry = Object.assign({}, entriesByStatus);
    Object.values(statusToEntry).forEach((entries) => {
      if (isSortAscending) {
        entries.sort((a, b) => (a[entryProperty] > b[entryProperty] ? 1 : -1));
      } else {
        entries.sort((a, b) => (a[entryProperty] < b[entryProperty] ? 1 : -1));
      }
    });
    setEntriesByStatus(statusToEntry);
  };

  // Resize menu items when window gets too small
  const resizeWindow = () => {
    setIsWindowSmall(window.innerWidth <= 991);
  };

  const openNewEntry = (initialValues) => {
    setNewModalInitialValues(initialValues);
    setIsNewModalOpen(true);
  };

  const saveNewEntry = (values) => {
    console.log(values);
    console.log("TODO");

    // TODO: add to database, add generated id to values, insert entry into column
  };

  const openEditEntry = (initialValues) => {
    setEditModalInitialValues(initialValues);
    setIsEditModalOpen(true);
  };

  const saveEditEntry = (values) => {
    console.log(values);
    console.log("TODO");

    // TODO: get values.entryId and update id in database
  };

  return (
    <div className="Portfolio">
      <div className="portfolioMenuBar">
        <div className="content">
          <div className="menuleft">
            <Button.Group className="displayButtons" basic size="mini">
              {Object.values(PORTFOLIO_DISPLAY).map((item, index) => (
                <Button
                  key={index}
                  icon
                  active={display === item.name}
                  onClick={() => setDisplay(item.name)}
                >
                  {item.icon}
                  {!isWindowSmall && (
                    <span className="buttonLabel">{item.name}</span>
                  )}
                </Button>
              ))}
            </Button.Group>

            <Button.Group className="densityButtons" basic size="mini">
              {Object.values(PORTFOLIO_DENSITY).map((item, index) => (
                <Button
                  key={index}
                  icon
                  active={density === item.name}
                  onClick={() => setDensity(item.name)}
                >
                  {item.icon}
                  {!isWindowSmall && (
                    <span className="buttonLabel">{item.name}</span>
                  )}
                </Button>
              ))}
            </Button.Group>
          </div>

          <Dropdown
            className="portfolioSelector"
            text="Summer Internships 2019"
            pointing
          >
            <Dropdown.Menu>
              <Dropdown.Item>Summer Internships 2019</Dropdown.Item>
              <Dropdown.Item>Summer 2018</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Edit Portfolios</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="menuRight">
            <span className="filterDropdown">
              {/* Controlling this dropdown the hard way because checkbox clicks close the menu by default */}
              <DashboardStatusFilterDropdown
                hideLabel={isWindowSmall}
                open={isStatusFilterOpen}
                onOpen={() => setIsStatusFilterOpen(true)}
                onClose={() => setIsStatusFilterOpen(false)}
                entriesByStatus={entriesByStatus}
                filterSettings={filterSettings}
                onChange={(x) => setFilterSettings(x)}
              />
            </span>

            <span className="sortDropdown">
              <DashboardSortDropdown
                hideLabel={isWindowSmall}
                value={sortBy}
                isSortAscending={isSortAscending}
                onSelect={sortDashboardEntries}
              />
            </span>

            <Button
              className="newEntryButton"
              positive
              size="mini"
              icon="plus"
              content={isWindowSmall ? null : "New Entry"}
              onClick={() => {
                setNewModalInitialValues({});
                setIsNewModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      {display === PORTFOLIO_DISPLAY.BOARD.name && (
        <div className="dashboardColumns">
          {Object.values(STATUS).map((status, index) => {
            if (filterSettings[status]?.isActive) {
              return (
                <DashboardColumn
                  key={index}
                  status={status}
                  isExpanded={filterSettings[status].isExpanded}
                  entries={entriesByStatus[status] || []}
                  density={density}
                  onOpenNewEntry={openNewEntry}
                  onOpenEditEntry={openEditEntry}
                  onChangeExpanded={(isExpanded) => {
                    const newSettings = Object.assign({}, filterSettings);
                    newSettings[status].isExpanded = isExpanded;
                    setFilterSettings(newSettings);
                  }}
                  onHideColumn={() => {
                    const newSettings = Object.assign({}, filterSettings);
                    newSettings[status].isActive = false;
                    setFilterSettings(newSettings);
                  }}
                />
              );
            }
            return null;
          })}
        </div>
      )}

      {display === PORTFOLIO_DISPLAY.TABLE.name && <div>TODO</div>}

      {/* Used to add new entries */}
      <EditEntryModal
        open={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        heading="New Entry"
        initialValues={newModalInitialValues}
        onSave={saveNewEntry}
      />

      {/* Used to edit existing entries */}
      <EditEntryModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        heading={`${editModalInitialValues.company} - ${editModalInitialValues.jobTitle}`}
        initialValues={editModalInitialValues}
        onSave={saveEditEntry}
      />
    </div>
  );
}

export default Portfolio;
