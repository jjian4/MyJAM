import { useState, useEffect, useCallback, useRef } from "react";
import { Search, Image, Icon } from "semantic-ui-react";
import axios from "axios";

import "./CompanySelector.scss";

const dropdownEntry = ({ name, domain, logo }) => (
  <div className="dropdownEntry">
    <div className="entryLeft">
      <img className="companyLogo" src={logo} alt="logo" />
      <span className="companyName">{name}</span>
    </div>
    <div className="companyDomain">{domain}</div>
  </div>
);

function CompanySelector(props) {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const timeoutRef = useRef();
  const handleSearchChange = useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    setLoading(true);

    // Parent updates value
    props.onNewValue({ name: data.value, domain: "", logo: "" });

    // Used to get dropdown results, not relevant to parent
    timeoutRef.current = setTimeout(async () => {
      if (data.value.trim().length === 0) {
        setLoading(false);
        setSearchResults([]);
        return;
      }

      const response = await axios.get(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query=${data.value}`
      );

      // <Search/> requires using 'title' key as id
      const results = response.data.map((item, index) => ({
        ...item,
        title: index.toString(),
      }));

      setLoading(false);
      setSearchResults(results);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="CompanySelector">
      <Search
        className="searchBar"
        onResultSelect={(e, data) => {
          props.onNewValue(data.result);
        }}
        onSearchChange={handleSearchChange}
        resultRenderer={dropdownEntry}
        noResultsMessage={loading ? "Loading..." : "No results found."}
        results={searchResults}
        value={props.companyObj.name}
        fluid
        input={{
          icon: props.companyObj.logo ? (
            <Icon className="selectedCompanyLogo">
              <Image src={props.companyObj.logo} />
            </Icon>
          ) : null,
          iconPosition: props.companyObj.logo ? "left" : null,
        }}
        autoFocus={props.autoFocus}
      />
    </div>
  );
}

export default CompanySelector;
