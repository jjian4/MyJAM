import { useState, useEffect, useContext } from "react";

import AppContext from "../../AppContext";
import Dashboard from "../../components/Dashboard/Dashboard";
import EditEntryModal from "../../components/EditEntryModal/EditEntryModal";
import EntriesTable from "../../components/EntriesTable/EntriesTable";
import { PORTFOLIO_DISPLAY } from "../../constants";
import { LAST_PORTFOLIO_DISPLAY } from "../../settings";
import "./Portfolio.scss";

function Portfolio() {
  const { entries, updateEntry, saveNewEntry } = useContext(AppContext);

  const [isWindowSmall, setIsWindowSmall] = useState(window.innerWidth <= 991);

  // Menu options
  const [display, setDisplay] = useState(LAST_PORTFOLIO_DISPLAY);

  // Edit Entry Modals
  const [newEntryModal, setNewEntryModal] = useState({
    isOpen: false,
    initialValues: {},
    autoFocusProperty: null,
  });
  const [editEntryModal, setEditEntryModal] = useState({
    isOpen: false,
    initialValues: {},
    autoFocusProperty: null,
  });

  useEffect(() => {
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
    setNewEntryModal({
      isOpen: true,
      initialValues: initialValues,
      autoFocusProperty: "company",
    });
  };

  const openEditEntry = (entryId, autoFocusProperty = null) => {
    setEditEntryModal({
      isOpen: true,
      initialValues: entries.find((entry) => entry.id === entryId),
      autoFocusProperty: autoFocusProperty,
    });
  };

  return (
    <div className="Portfolio">
      {display === PORTFOLIO_DISPLAY.BOARD.name && (
        <Dashboard
          isWindowSmall={isWindowSmall}
          onChangeDisplay={setDisplay}
          onOpenNewEntry={openNewEntry}
          onOpenEditEntry={openEditEntry}
        />
      )}

      {display === PORTFOLIO_DISPLAY.TABLE.name && (
        <EntriesTable
          isWindowSmall={isWindowSmall}
          onChangeDisplay={setDisplay}
          onOpenNewEntry={openNewEntry}
          onOpenEditCell={openEditEntry}
        />
      )}

      {/* Used to add new entries */}
      <EditEntryModal
        open={newEntryModal.isOpen}
        onClose={() =>
          setNewEntryModal({
            isOpen: false,
            initialValues: {},
            autoFocusProperty: null,
          })
        }
        heading="New Entry"
        initialValues={newEntryModal.initialValues}
        autoFocusProperty={newEntryModal.autoFocusProperty}
        onSave={saveNewEntry}
      />
      {/* Used to edit existing entries */}
      <EditEntryModal
        open={editEntryModal.isOpen}
        onClose={() =>
          setEditEntryModal({
            isOpen: false,
            initialValues: {},
            autoFocusProperty: null,
          })
        }
        heading={`${editEntryModal.initialValues.company} - ${editEntryModal.initialValues.jobTitle}`}
        initialValues={editEntryModal.initialValues}
        autoFocusProperty={editEntryModal.autoFocusProperty}
        onSave={updateEntry}
      />
    </div>
  );
}

export default Portfolio;
