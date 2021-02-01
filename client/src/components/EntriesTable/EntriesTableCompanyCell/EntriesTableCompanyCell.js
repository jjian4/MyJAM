import { useState } from "react";
import prependHttp from "prepend-http";
import "./EntriesTableCompanyCell.scss";

function EntriesTableCompanyCell(props) {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  return (
    <div className="data EntriesTableCompanyCell">
      <a
        href={props.entry.domain ? prependHttp(props.entry.domain) : null}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className={`logo ${
            props.entry.logo && isLogoLoaded ? "logo-loaded" : ""
          }`}
          src={props.entry["logo"]}
          alt="logo"
          onLoad={() => setIsLogoLoaded(true)}
        />
      </a>{" "}
      {props.entry[props.column.property]}
    </div>
  );
}

export default EntriesTableCompanyCell;
