import { useEffect, useRef, useState } from "react";
import { Dropdown } from "semantic-ui-react";

import "./ControlledDropdown.scss";

// Used when you don't want the dropdown to close when clicking inside (normally, it closes on click)

function ControlledDropdown(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const ref = useRef(null);
  const useOutsideClickListener = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideClickListener(ref);

  const { dropdownButton, ...dropdownProps } = props;

  return (
    <span ref={ref} className="ControlledDropdown">
      <Dropdown
        {...dropdownProps}
        open={isDropdownOpen}
        onClose={(e) => {
          if (isDropdownOpen && e?.code === "Escape") {
            setIsDropdownOpen(false);
          }
        }}
        trigger={
          <span
            onClick={() =>
              isDropdownOpen
                ? setIsDropdownOpen(false)
                : setIsDropdownOpen(true)
            }
          >
            {dropdownButton}
          </span>
        }
      >
        <Dropdown.Menu className="dropdownMenu">{props.children}</Dropdown.Menu>
      </Dropdown>
    </span>
  );
}

export default ControlledDropdown;
