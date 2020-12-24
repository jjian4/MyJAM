import { useState, useEffect, useCallback, useRef } from "react";
import { Search, Image, Icon } from 'semantic-ui-react'
import axios from 'axios';

import "./CompanySelector.scss";


const dropdownEntry = ({ name, domain, logo }) => (
    <div className='dropdownEntry'>
        <div className='entryLeft'>
            <img className='companyLogo' src={logo} alt='logo' />
            <span className='companyName'>{name}</span>
        </div>
        <div className='companyDomain'>
            {domain}
        </div>
    </div>
)

function CompanySelector() {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [value, setValue] = useState('');
    const [selectedCompanyLogo, setSelectedCompanyLogo] = useState(null);


    const timeoutRef = useRef()
    const handleSearchChange = useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        setLoading(true)
        setValue(data.value)
        setSelectedCompanyLogo(null)

        timeoutRef.current = setTimeout(async () => {
            if (data.value.length === 0) {
                setLoading(false)
                setSearchResults([])
                return
            }

            const response = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${data.value}`)

            // <Search/> requires using 'title' key as id
            const results = response.data.map((item, index) => ({ ...item, title: index.toString() }))

            setLoading(false)
            setSearchResults(results)
        }, 300)
    }, [])

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])


    return (
        <div className="CompanySelector">
            <Search
                className='searchBar'
                onResultSelect={(e, data) => {
                    setValue(data.result.name);
                    setSelectedCompanyLogo(data.result.logo)
                }}
                onSearchChange={handleSearchChange}
                resultRenderer={dropdownEntry}
                noResultsMessage={loading ? 'Loading...' : 'No results found.'}
                results={searchResults}
                value={value}
                fluid
                input={{
                    icon: selectedCompanyLogo ? (
                        <Icon className='selectedCompanyLogo'>
                            <Image src={selectedCompanyLogo} />
                        </Icon>
                    ) : null
                    , iconPosition: selectedCompanyLogo ? 'left' : null
                }}
            />
        </div>
    );
}

export default CompanySelector;
