import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import "./StarButton.scss";

function StarButton(props) {
  return (
    <div
      className={`StarButton ${props.isStarred ? "" : "StarButton-outline"}`}
      title="Star"
      tabIndex={0}
      onClick={props.onClick}
    >
      <FontAwesomeIcon
        className="starIcon"
        icon={props.isStarred ? faStar : faStarOutline}
      />
    </div>
  );
}

export default StarButton;
