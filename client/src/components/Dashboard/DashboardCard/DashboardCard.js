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
import classnames from "classnames";
import AppContext from "../../../AppContext";
import { BOARD_DENSITY, DRAG_DROP_ITEMS } from "../../../utilities/constants";
import StarButton from "../../StarButton/StarButton";
import LogoCircle from "../../LogoCircle/LogoCircle";
import "./DashboardCard.scss";

const maxNotesLength = 100;
const maxNotesLines = 3;

function DashboardCard(props) {
  const { displaySettings, openEntryModal, updateEntry } =
    useContext(AppContext);
  const { boardDensity, isCardColorOn } = displaySettings;

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
      className={classnames("DashboardCard", {
        "DashboardCard-colored": cardColor,
      })}
      style={{ backgroundColor: cardColor, opacity: isDragging ? 0.5 : 1 }}
      onDoubleClick={() => openEntryModal(props.entry.id)}
    >
      {(boardDensity === BOARD_DENSITY.COMPACT.name ||
        boardDensity === BOARD_DENSITY.DETAILED.name) && (
        <div
          className={classnames("cardTop", {
            compactCardTop: boardDensity === BOARD_DENSITY.COMPACT.name,
          })}
        >
          <a
            className="logoWrapper"
            href={props.entry.domain ? prependHttp(props.entry.domain) : null}
            target="_blank"
            rel="noreferrer"
          >
            <LogoCircle entry={props.entry} />
          </a>
          <div>
            <div className="company">{props.entry.company}</div>
            <div className="jobTitle">{props.entry.jobTitle}</div>
          </div>
          <div className="cardOptions">
            {boardDensity === BOARD_DENSITY.COMPACT.name && props.entry.url && (
              <a
                href={prependHttp(props.entry.url)}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon title="URL" icon={faLink} />
              </a>
            )}

            {boardDensity === BOARD_DENSITY.COMPACT.name && (
              <FontAwesomeIcon
                title="Edit"
                icon={faEdit}
                onClick={() => openEntryModal(props.entry.id)}
              />
            )}

            <span
              className={classnames("starToggle", {
                "starToggle-active": props.entry.isStarred,
              })}
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
                  href={prependHttp(props.entry.url)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit
                </a>
              )}
              <div
                className="cardButton"
                style={{ backgroundColor: cardColor }}
                onClick={() => openEntryModal(props.entry.id)}
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
