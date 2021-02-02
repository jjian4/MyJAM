import { useContext, useState } from "react";
import AppContext from "../../AppContext";
import "./LogoCircle.scss";

function LogoCircle(props) {
  const { portfolioSettings } = useContext(AppContext);

  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  const cardColor = portfolioSettings.isCardColorOn ? props.entry.color : null;

  return (
    <div className="LogoCircle">
      <img
        className={`logo ${
          props.entry.logo && isLogoLoaded ? "logo-loaded" : ""
        }`}
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
