import { useState, useEffect, useContext } from "react";
import {
  Button,
  Modal,
  Dropdown,
  Input,
  Message,
  Form,
} from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import AppContext from "../../AppContext";
import "./StatusListModal.scss";
import { ReactSortable } from "react-sortablejs";

function StatusListModal(props) {
  const {
    portfoliosList,
    currentPortfolioId,
    displaySettings,
    updateDisplaySettings,
    entries,
  } = useContext(AppContext);

  const boardColumnFilter = displaySettings.boardColumnFilter ?? [];

  const [editId, setEditId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isEditingNewStatus, setIsEditingNewStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Initialize values everytime modal reopens
    if (props.open) {
      setEditId(null);
      setInputValue("");
      setIsEditingNewStatus(false);
      setIsSaveClicked(false);
      setErrorMessage("");
    }
  }, [props.open]);

  const currentPortfolioName = portfoliosList?.find(
    (x) => x.id === currentPortfolioId
  )?.name;

  const statusCounts = {};
  entries?.forEach(({ statusId }) => {
    if (statusId in statusCounts) {
      ++statusCounts[statusId];
    } else {
      statusCounts[statusId] = 1;
    }
  });

  const changeEditId = (statusId) => {
    setEditId(statusId);
    setIsEditingNewStatus(false);
    if (statusId == null) {
      setInputValue("");
    } else {
      setInputValue(
        boardColumnFilter.find((x) => x.statusId === statusId).status
      );
    }
  };

  const showNewStatusInput = () => {
    setEditId(null);
    setIsEditingNewStatus(true);
    setInputValue("");
  };

  const handleEditSave = async () => {
    setIsSaveClicked(true);

    // Check if empty
    if (inputValue.trim().length === 0) {
      setErrorMessage("Status name cannot be empty.");
      return;
    }

    // Check if no chaange
    if (
      boardColumnFilter
        .find((x) => x.statusId === editId)
        .status.trim()
        .toLowerCase() === inputValue.trim().toLowerCase()
    ) {
      return;
    }

    // Don't allow duplicate statuses
    for (const statusInfo of boardColumnFilter) {
      if (
        statusInfo.status.trim().toLowerCase() ===
        inputValue.trim().toLowerCase()
      ) {
        setErrorMessage("Two statuses cannot share the same name.");
        return;
      }
    }

    setIsSaving(true);

    // Update status name
    const newColumnFilter = _.cloneDeep(boardColumnFilter);
    const statusIndex = newColumnFilter.findIndex((x) => x.statusId === editId);
    newColumnFilter[statusIndex].status = inputValue;
    updateDisplaySettings({
      boardColumnFilter: newColumnFilter,
    });

    setErrorMessage("");
    setEditId(null);
    setIsSaving(false);
  };

  const handleNewStatusSave = () => {
    setIsSaveClicked(true);

    // Check if empty
    if (inputValue.trim().length === 0) {
      setErrorMessage("Status name cannot be empty.");
      return;
    }

    // Don't allow duplicate statuses
    for (const statusInfo of boardColumnFilter) {
      if (
        statusInfo.status.trim().toLowerCase() ===
        inputValue.trim().toLowerCase()
      ) {
        setErrorMessage("Two statuses cannot share the same name.");
        return;
      }
    }

    console.log("TODO");
    setErrorMessage("");
    setEditId(null);
  };

  return (
    <Modal
      className="StatusListModal"
      onClose={props.onClose}
      open={props.open}
      size="tiny"
      closeOnEscape={true}
    >
      <Modal.Header className="header">
        {currentPortfolioName} - Status List
      </Modal.Header>

      <Modal.Content>
        {errorMessage && (
          <Message negative size="tiny" onDismiss={() => setErrorMessage("")}>
            <Message.Header>{errorMessage}</Message.Header>
          </Message>
        )}

        <div className="statusList">
          <ReactSortable
            list={boardColumnFilter}
            setList={(x) => {
              x.forEach((item) => {
                delete item.selected;
                delete item.chosen;
              });
              updateDisplaySettings({ boardColumnFilter: x });
              setEditId(null);
            }}
            animation={200}
            handle=".gripIcon"
          >
            {boardColumnFilter.map((statusInfo, index) => (
              <div className="statusRow" key={index}>
                <div className="rowLeft">
                  <div className="gripIcon">
                    <FontAwesomeIcon icon={faGripVertical} />
                  </div>
                  {editId === statusInfo.statusId ? (
                    <Form className="statusInput" onSubmit={handleEditSave}>
                      <Form.Field
                        error={isSaveClicked && errorMessage.length > 0}
                      >
                        <Input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          disabled={isSaving}
                        />
                      </Form.Field>
                    </Form>
                  ) : (
                    <div
                      className="statusName"
                      onClick={() => changeEditId(statusInfo.statusId)}
                    >
                      {
                        boardColumnFilter.find(
                          (x) => x.statusId === statusInfo.statusId
                        ).status
                      }
                    </div>
                  )}
                </div>
                {editId === statusInfo.statusId ? (
                  <div className="editRowRight">
                    {inputValue.trim().length === 0 ||
                    boardColumnFilter
                      .find((x) => x.statusId === statusInfo.statusId)
                      .status.trim()
                      .toLowerCase() === inputValue.trim().toLowerCase() ? (
                      <Button
                        size="tiny"
                        basic
                        onClick={() => changeEditId(null)}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        className="editSaveButton"
                        size="tiny"
                        onClick={handleEditSave}
                        loading={isSaving}
                      >
                        Save
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="rowRight">
                    <div className="numEntries">
                      ({statusCounts[statusInfo.statusId] ?? 0}{" "}
                      {statusCounts[statusInfo.statusId] === 1
                        ? "entry"
                        : "entries"}
                      )
                    </div>

                    <div className="options">
                      <div
                        className="editButton"
                        onClick={() => changeEditId(statusInfo.statusId)}
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </div>
                      {boardColumnFilter.length > 2 && (
                        <Dropdown
                          className="optionsDropdown"
                          icon="ellipsis vertical"
                          direction="right"
                        >
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => console.log("TODO")}>
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ReactSortable>

          {isEditingNewStatus && (
            <div className="newStatus">
              <div className="statusRow">
                <div className="rowLeft">
                  <Form className="statusInput" onSubmit={handleNewStatusSave}>
                    <Form.Field
                      error={isSaveClicked && errorMessage.length > 0}
                    >
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isSaving}
                      />
                    </Form.Field>
                  </Form>
                </div>
                <div className="editRowRight">
                  {inputValue.trim().length === 0 ? (
                    <Button
                      size="tiny"
                      basic
                      onClick={() => setIsEditingNewStatus(false)}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      className="editSaveButton"
                      size="tiny"
                      onClick={handleNewStatusSave}
                      loading={isSaving}
                    >
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {!isEditingNewStatus && boardColumnFilter.length < 7 && (
          <div className="addStatusRow">
            <Button
              size="tiny"
              icon="plus"
              content="New Status"
              onClick={showNewStatusInput}
            />
          </div>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button size="small" onClick={props.onClose}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default StatusListModal;
