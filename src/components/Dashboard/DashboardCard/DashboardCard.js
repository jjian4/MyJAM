import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCalendarTimes,
  faEdit,
  faLink,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

import { IS_CARD_COLORS_ON } from "../../../settings";
import "./DashboardCard.scss";
import { BOARD_DENSITY } from "../../../constants";

const maxNotesLength = 100;
const maxNotesLines = 3;

function DashboardCard(props) {
  let truncatedNotes = props.entry.notes;
  if (truncatedNotes.length > maxNotesLength) {
    truncatedNotes = truncatedNotes.substr(0, maxNotesLength - 1);
  }
  truncatedNotes = truncatedNotes.substr(
    0,
    truncatedNotes.split("\n", maxNotesLines).join("\n").length
  );
  if (truncatedNotes !== props.entry.notes) {
    truncatedNotes += "\u2026";
  }

  const cardColor = IS_CARD_COLORS_ON ? props.entry.color : null;

  return (
    <div
      className={`DashboardCard ${cardColor ? "DashboardCard-colored" : ""}`}
      style={{ backgroundColor: cardColor }}
    >
      {(props.density === BOARD_DENSITY.COMPACT.name ||
        props.density === BOARD_DENSITY.DETAILED.name) && (
        <div
          className={`cardTop ${
            props.density === BOARD_DENSITY.COMPACT.name ? "compactCardTop" : ""
          }`}
        >
          <a
            href={props.entry.domain ? `https://${props.entry.domain}` : null}
            target="_blank"
            rel="noreferrer"
          >
            <img className="logo" src={props.entry.logo} alt="logo" />
          </a>
          <div>
            <div className="company">{props.entry.company}</div>
            <div className="jobTitle">{props.entry.jobTitle}</div>
          </div>
          <div className="cardOptions">
            {props.density === BOARD_DENSITY.COMPACT.name && props.entry.url && (
              <a href={props.entry.url} target="_blank" rel="noreferrer">
                <FontAwesomeIcon title="URL" icon={faLink} />
              </a>
            )}

            {props.density === BOARD_DENSITY.COMPACT.name && (
              <FontAwesomeIcon
                title="Edit"
                icon={faEdit}
                onClick={() => props.onOpenEditEntry(props.entry)}
              />
            )}

            <FontAwesomeIcon
              className={props.entry.isStarred ? "starIcon" : "starOutlineIcon"}
              title="Favorite"
              onClick={() => console.log("TODO")}
              icon={props.entry.isStarred ? faStar : faStarOutline}
            />
          </div>
        </div>
      )}

      {props.density === BOARD_DENSITY.DETAILED.name && (
        <>
          <div className="cardMid">{truncatedNotes}</div>

          <div className="cardBottom" style={{ backgroundColor: cardColor }}>
            <div className="cardDates">
              <div>
                <FontAwesomeIcon className={"dateIcon"} icon={faCalendar} />
                <span className="date">edited X min ago</span>
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
                onClick={() => props.onOpenEditEntry(props.entry)}
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
