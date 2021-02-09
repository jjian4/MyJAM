import { useState, useEffect, useContext } from "react";
import { Button, Modal, Dropdown, Input, Message } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../AppContext";
import "./PortfoliosModal.scss";
import { ReactSortable } from "react-sortablejs";

function PortfoliosModal(props) {
  const { portfoliosList } = useContext(AppContext);

  const [formPortfolios, setFormPortfolios] = useState([]);

  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Initialize values everytime modal reopens
    if (props.open) {
      setFormPortfolios(portfoliosList);
      setIsSaveClicked(false);
      setErrorMessage("");
    }
  }, [props.open, portfoliosList]);

  useEffect(() => {
    if (formPortfolios.length === 0) {
      addNewPortfolio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formPortfolios]);

  const addNewPortfolio = () => {
    setFormPortfolios([
      ...formPortfolios,
      {
        name: `Portfolio ${formPortfolios.length + 1}`,
        numEntries: 0,
      },
    ]);
  };

  const handleSave = () => {
    setIsSaveClicked(true);

    for (const item of formPortfolios) {
      if (item.name.trim().length === 0) {
        setErrorMessage("Portfolio names cannot be empty.");
        return;
      }
    }
    // Don't allow duplicate names
    const names = formPortfolios.map((item) => item.name);
    if (new Set(names).size !== names.length) {
      setErrorMessage("Two portfolios cannot share the same name.");
      return;
    }

    props.onSave(formPortfolios);
    props.onClose();
  };

  return (
    <Modal
      className="PortfoliosModal"
      onClose={props.onClose}
      open={props.open}
      size="small"
      closeOnEscape={true}
    >
      <Modal.Header className="header">My Portfolios</Modal.Header>

      <Modal.Content>
        {errorMessage && (
          <Message negative size="tiny" onDismiss={() => setErrorMessage("")}>
            <Message.Header>{errorMessage}</Message.Header>
          </Message>
        )}

        <div className="portfolios">
          <ReactSortable
            list={formPortfolios}
            setList={(x) => {
              x.forEach((item) => {
                delete item.selected;
                delete item.chosen;
              });
              setFormPortfolios(x);
            }}
            animation={200}
            handle=".gripIcon"
          >
            {formPortfolios.map((portfolio, index) => (
              <div className="portfolioRow" key={index}>
                <div className="rowLeft">
                  <div className="gripIcon">
                    <FontAwesomeIcon icon={faGripVertical} />
                  </div>
                  <Input
                    className="nameInput"
                    value={portfolio.name}
                    onChange={(e) =>
                      setFormPortfolios([
                        ...formPortfolios.slice(0, index),
                        { ...formPortfolios[index], name: e.target.value },
                        ...formPortfolios.slice(index + 1),
                      ])
                    }
                    error={isSaveClicked && portfolio.name.trim().length === 0}
                  />
                  <div className="numEntries">
                    ({portfolio.numEntries}{" "}
                    {portfolio.numEntries === 1 ? "entry" : "entries"})
                  </div>
                </div>
                <div className="rowRight">
                  {formPortfolios.length > 1 && (
                    <Dropdown
                      className="optionsDropdown"
                      icon="ellipsis vertical"
                      direction="right"
                    >
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            setFormPortfolios([
                              ...formPortfolios.slice(0, index),
                              ...formPortfolios.slice(index + 1),
                            ])
                          }
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>

        {formPortfolios.length < 5 && (
          <div className="addPortfolioRow">
            <Button
              size="tiny"
              icon="plus"
              content="New Portfolio"
              onClick={addNewPortfolio}
            />
          </div>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button size="small" onClick={props.onClose}>
          Cancel
        </Button>
        <Button className="saveButton" size="small" onClick={handleSave}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default PortfoliosModal;
