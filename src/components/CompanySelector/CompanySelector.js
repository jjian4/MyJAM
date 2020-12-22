import { useState, useEffect, useCallback, useRef } from "react";
import { Search } from 'semantic-ui-react'
import axios from 'axios';

import "./CompanySelector.scss";


const dropdownEntry = ({ title, domain, logo }) => (
    <div className='dropdownEntry'>
        <div className='entryLeft'>
            <img className='companyLogo' src={logo} alt='logo' />
            <span className='companyName'>{title}</span>
        </div>
        <div className='companyDomain'>
            {domain}
        </div>
    </div>
)

function CompanySelector() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [value, setValue] = useState('');


    const timeoutRef = useRef()
    const handleSearchChange = useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        setLoading(true)
        setValue(data.value)

        timeoutRef.current = setTimeout(async () => {
            if (data.value.length === 0) {
                setLoading(false)
                setResults([])
                return
            }

            const response = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${data.value}`)
            const results = response.data

            // Change 'name' key to 'title' due to <Search/> prop requirements
            results.forEach(item => {
                Object.defineProperty(item, 'title',
                    Object.getOwnPropertyDescriptor(item, 'name'));
                delete item['name'];
            });

            setLoading(false)
            setResults(results)
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
                loading={loading}
                onResultSelect={(e, data) => setValue(data.result.title)}
                onSearchChange={handleSearchChange}
                resultRenderer={dropdownEntry}
                results={results}
                value={value}
            />
            <div>
                Value: {value}
            </div>
        </div>
    );
}

export default CompanySelector;
