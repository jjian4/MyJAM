import { useState, useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";

import EditEntryModal from "../../components/EditEntryModal/EditEntryModal";
import EntriesTable from "../../components/EntriesTable/EntriesTable";
import { PORTFOLIO_DISPLAY, STATUS } from "../../constants";
import { LAST_PORTFOLIO_DISPLAY } from "../../settings";
import "./Portfolio.scss";

const fakeEntries3 = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    color: "seagreen",
    isStarred: false,
    company: "Facebook",
    domain: "google.com",
    logo: "https://logo.clearbit.com/facebook.com",
    jobTitle: "Software Engineer II",
    applyDate: "2020-01-01",
    deadlineDate: "",
    status: STATUS.APPLIED,
    url: "",
    notes: "",
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
  {
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
  {
    id: 16,
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
    id: 17,
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
  {
    id: 18,
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
    id: 19,
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
    id: 20,
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
    id: 21,
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

  // Entries
  const [entries, setEntries] = useState([]);

  // Edit Entry Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newModalInitialValues, setNewModalInitialValues] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalInitialValues, setEditModalInitialValues] = useState({});

  useEffect(() => {
    // TODO: fetch portfolio entries from db
    setEntries(fakeEntries3);

    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

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
      {display === PORTFOLIO_DISPLAY.BOARD.name && (
        <Dashboard
          isWindowSmall={isWindowSmall}
          onChangeDisplay={setDisplay}
          entries={entries}
          onOpenNewEntry={openNewEntry}
          onOpenEditEntry={openEditEntry}
        />
      )}

      {display === PORTFOLIO_DISPLAY.TABLE.name && (
        <EntriesTable
          isWindowSmall={isWindowSmall}
          onChangeDisplay={setDisplay}
          entries={entries}
          onOpenNewEntry={openNewEntry}
          onOpenEditEntry={openEditEntry}
        />
      )}

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
