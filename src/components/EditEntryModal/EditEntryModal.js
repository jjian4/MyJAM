import { useState, useEffect, useContext } from "react";
import {
  Form,
  Button,
  Modal,
  Dropdown,
  TextArea,
  Input,
  Popup,
} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import dateFormat from "dateformat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import AppContext from "../../AppContext";
import CompanySelector from "../CompanySelector/CompanySelector";
import { CARD_COLORS, STATUS } from "../../constants";
import "./EditEntryModal.scss";

function EditEntryModal(props) {
  const { portfolioSettings } = useContext(AppContext);

  const [color, setColor] = useState("");
  const [isStarred, setIsStarred] = useState(false);
  const [company, setCompany] = useState("");
  const [domain, setDomain] = useState("");
  const [logo, setLogo] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [applyDate, setApplyDate] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [status, setStatus] = useState(STATUS.APPLIED);
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");

  const [isSaveClicked, setIsSaveClicked] = useState(false);

  useEffect(() => {
    // Initialize values everytime modal reopens
    if (props.open) {
      setColor(
        props.initialValues.color ||
          CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)]
      );
      setIsStarred(props.initialValues.isStarred || false);
      setCompany(props.initialValues.company || "");
      setDomain(props.initialValues.domain || "");
      setLogo(props.initialValues.logo || "");
      setJobTitle(props.initialValues.jobTitle || "");
      setApplyDate(
        props.initialValues.applyDate || dateFormat(new Date(), "yyyy-mm-dd")
      );
      setDeadlineDate(props.initialValues.deadlineDate || "");
      setStatus(props.initialValues.status || STATUS.APPLIED);
      setUrl(props.initialValues.url || "");
      setNotes(props.initialValues.notes || "");
      setIsSaveClicked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  const validateDate = (value) => {
    if (value.length !== 0 && value.length !== 10) {
      return false;
    }

    try {
      dateFormat(value, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    } catch {
      return false;
    }

    return true;
  };

  const handleSave = () => {
    setIsSaveClicked(true);
    if (!company.trim() || !jobTitle.trim() || !status) {
      return;
    }

    props.onSave({
      id: props.initialValues.id,
      dateCreated: props.initialValues.dateCreated,
      lastUpdate: Date.now(),
      color,
      isStarred,
      company: company.trim(),
      domain: domain,
      logo: logo,
      jobTitle: jobTitle.trim(),
      applyDate,
      deadlineDate,
      status,
      url: url.trim(),
      notes: notes.trim(),
    });
    props.onClose();
  };

  return (
    <Modal
      className="EditEntryModal"
      onClose={props.onClose}
      open={props.open}
      size="small"
      closeOnEscape={false}
    >
      <Modal.Header className="header">
        <div className="headerContent">
          <div>{props.heading}</div>

          <div className="headerRight">
            {portfolioSettings.isCardColorOn && (
              <Dropdown
                className="colorDropdown"
                trigger={
                  <div
                    className="colorDropdownButton"
                    title={color}
                    style={{ backgroundColor: color }}
                  />
                }
                icon={false}
                direction="left"
              >
                <Dropdown.Menu className="dropdownMenu">
                  <div className="colorsGrid">
                    {CARD_COLORS.map((colorOption, index) => (
                      <div key={index} className="optionContainer">
                        <div
                          className={`colorOption ${
                            colorOption === color ? "colorOption-selected" : ""
                          }`}
                          title={colorOption}
                          style={{ backgroundColor: colorOption }}
                          onClick={() => setColor(colorOption)}
                        />
                      </div>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            )}

            <FontAwesomeIcon
              className={isStarred ? "starButton" : "starOutlineButton"}
              tabIndex={0}
              title="Favorite"
              icon={isStarred ? faStar : faStarOutline}
              onClick={() => setIsStarred(!isStarred)}
            />
          </div>
        </div>
      </Modal.Header>

      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Field error={isSaveClicked && !company}>
              <label className="companyLabel">
                <span>Company *</span>
                <span className="clearbitLink">
                  <Popup
                    trigger={<FontAwesomeIcon icon={faInfoCircle} />}
                    hoverable
                    position="right center"
                    size="small"
                  >
                    Powered by{" "}
                    <a
                      href="https://clearbit.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Clearbit
                    </a>{" "}
                    Logo API
                  </Popup>
                </span>
              </label>
              <CompanySelector
                companyObj={{ name: company, domain: domain, logo: logo }}
                onNewValue={({ name, domain, logo }) => {
                  setCompany(name);
                  setDomain(domain);
                  setLogo(logo);
                }}
                autoFocus={props.autoFocusProperty === "company"}
              />
            </Form.Field>

            <Form.Field error={isSaveClicked && !jobTitle}>
              <label>Job Title *</label>
              <Input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                autoFocus={props.autoFocusProperty === "jobTitle"}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>Application Date</label>
              <DateInput
                name="applyDate"
                iconPosition="right"
                closable
                value={applyDate}
                dateFormat="YYYY-MM-DD"
                onChange={(e, { name, value }) =>
                  validateDate(value) && setApplyDate(value)
                }
                autoFocus={props.autoFocusProperty === "applyDate"}
              />
            </Form.Field>

            <Form.Field>
              <label>Next Interview / Deadline</label>
              <DateInput
                name="deadlineDate"
                iconPosition="right"
                closable
                value={deadlineDate}
                dateFormat="YYYY-MM-DD"
                onChange={(e, { name, value }) =>
                  validateDate(value) && setDeadlineDate(value)
                }
                autoFocus={props.autoFocusProperty === "deadlineDate"}
              />
            </Form.Field>

            <Form.Field error={isSaveClicked && !status}>
              <label>Status *</label>
              <Dropdown
                fluid
                selection
                options={Object.values(STATUS).map((status) => ({
                  text: status,
                  value: status,
                }))}
                value={status}
                onChange={(e, { name, value }) => setStatus(value)}
                defaultOpen={props.autoFocusProperty === "status"}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>URL</label>
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                autoFocus={props.autoFocusProperty === "url"}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>Notes</label>
              <TextArea
                placeholder="Recruiter name, number of interviews, etc..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                autoFocus={props.autoFocusProperty === "notes"}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button content="Save" onClick={handleSave} positive />
      </Modal.Actions>
    </Modal>
  );
}

export default EditEntryModal;
