import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Button } from "semantic-ui-react";

import "./DropdownButton.scss";

function DropdownButton(props) {
  return (
    <div className="DropdownButton">
      <Button
        {...props}
        content={
          <>
            <span className="label">{props.text}</span>
            <FontAwesomeIcon className="caretIcon" icon={faCaretDown} />
          </>
        }
      />
    </div>
  );
}

export default DropdownButton;
