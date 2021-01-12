import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCalendarTimes,
  faEdit,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { useDrag } from "react-dnd";
import prependHttp from "prepend-http";
import TimeAgo from "react-timeago";
import AppContext from "../../../AppContext";
import { BOARD_DENSITY, DRAG_DROP_ITEMS } from "../../../constants";
import StarButton from "../../StarButton/StarButton";
import "./DashboardCard.scss";

const maxNotesLength = 100;
const maxNotesLines = 3;

function DashboardCard(props) {
  const { portfolioSettings, openEditEntryModal, updateEntry } = useContext(
    AppContext
  );
  const { boardDensity, isCardColorOn } = portfolioSettings;

  // Used to allow card to be dragged into another column
  const [{ isDragging }, drag] = useDrag({
    item: { type: DRAG_DROP_ITEMS.DASHBOARD_CARD, id: props.entry.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  let truncatedNotes = props.entry.notes;
  if (truncatedNotes.length > maxNotesLength) {
    truncatedNotes = truncatedNotes.substr(0, maxNotesLength);
  }
  truncatedNotes = truncatedNotes.substr(
    0,
    truncatedNotes.split("\n", maxNotesLines).join("\n").length
  );
  if (truncatedNotes !== props.entry.notes) {
    truncatedNotes += "\u2026";
  }

  const cardColor = isCardColorOn ? props.entry.color : null;

  return (
    <div
      ref={drag}
      className={`DashboardCard ${cardColor ? "DashboardCard-colored" : ""}`}
      style={{ backgroundColor: cardColor, opacity: isDragging ? 0.5 : 1 }}
    >
      {(boardDensity === BOARD_DENSITY.COMPACT.name ||
        boardDensity === BOARD_DENSITY.DETAILED.name) && (
        <div
          className={`cardTop ${
            boardDensity === BOARD_DENSITY.COMPACT.name ? "compactCardTop" : ""
          }`}
        >
          {props.entry.logo && (
            <a
              href={props.entry.domain ? prependHttp(props.entry.domain) : null}
              target="_blank"
              rel="noreferrer"
            >
              <img className="logo" src={props.entry.logo} alt="logo" />
            </a>
          )}
          <div>
            <div className="company">{props.entry.company}</div>
            <div className="jobTitle">{props.entry.jobTitle}</div>
          </div>
          <div className="cardOptions">
            {boardDensity === BOARD_DENSITY.COMPACT.name && props.entry.url && (
              <a href={props.entry.url} target="_blank" rel="noreferrer">
                <FontAwesomeIcon title="URL" icon={faLink} />
              </a>
            )}

            {boardDensity === BOARD_DENSITY.COMPACT.name && (
              <FontAwesomeIcon
                title="Edit"
                icon={faEdit}
                onClick={() => openEditEntryModal(props.entry.id)}
              />
            )}

            <span
              className={`starToggle ${
                props.entry.isStarred ? "starToggle-active" : ""
              }`}
            >
              <StarButton
                isStarred={props.entry.isStarred}
                onClick={() =>
                  updateEntry({
                    id: props.entry.id,
                    isStarred: !props.entry.isStarred,
                  })
                }
              />
            </span>

            {/* <FontAwesomeIcon
              className={props.entry.isStarred ? "starIcon" : "starOutlineIcon"}
              tabIndex={0}
              title="Star"
              onClick={() =>
                updateEntry({
                  id: props.entry.id,
                  isStarred: !props.entry.isStarred,
                })
              }
              icon={props.entry.isStarred ? faStar : faStarOutline}
            /> */}
          </div>
        </div>
      )}

      {boardDensity === BOARD_DENSITY.DETAILED.name && (
        <>
          <div className="cardMid">{truncatedNotes}</div>

          <div className="cardBottom" style={{ backgroundColor: cardColor }}>
            <div className="cardDates">
              <div>
                <FontAwesomeIcon className={"dateIcon"} icon={faCalendar} />
                <span className="date">
                  edited <TimeAgo date={props.entry.lastUpdate} minPeriod={5} />
                </span>
              </div>
              {props.entry.deadlineDate && (
                <div>
                  <FontAwesomeIcon
                    className={"dateIcon"}
                    icon={faCalendarTimes}
                  />
                  <span className="date">{`Next: ${props.entry.deadlineDate}`}</span>
                </div>
              )}
            </div>

            <div className="cardButtons">
              {props.entry.url && (
                <a
                  className="cardButton"
                  style={{ backgroundColor: cardColor }}
                  href={props.entry.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit
                </a>
              )}
              <div
                className="cardButton"
                style={{ backgroundColor: cardColor }}
                onClick={() => openEditEntryModal(props.entry.id)}
              >
                Edit
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardCard;
