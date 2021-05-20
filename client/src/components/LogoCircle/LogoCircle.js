import { useContext, useState } from "react";
import classnames from "classnames";
import AppContext from "../../AppContext";
import "./LogoCircle.scss";

function LogoCircle(props) {
  const { displaySettings } = useContext(AppContext);

  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  const cardColor = displaySettings.isCardColorOn ? props.entry.color : null;

  return (
    <div className="LogoCircle">
      <img
        className={classnames("logo", {
          "logo-loaded": props.entry.logo && isLogoLoaded,
        })}
        src={props.entry.logo}
        alt={props.entry.company}
        onLoad={() => setIsLogoLoaded(true)}
      />
      {!isLogoLoaded && (
        <div className="companyText" style={{ color: cardColor }}>
          {props.entry.company[0].toUpperCase() || "?"}
        </div>
      )}
    </div>
  );
}

export default LogoCircle;
