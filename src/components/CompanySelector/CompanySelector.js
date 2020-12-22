import { useState, useEffect, useCallback, useRef } from "react";
import { Search, Label } from 'semantic-ui-react'

import "./CompanySelector.scss";

// const source = [
//     {
//         "image": "https://s3.amazonaws.com/uifaces/faces/twitter/ricburton/128.jpg",
//         "title": "Marquardt - Oberbrunner",
//         "description": "Cross-group value-added conglomeration",
//         "price": "$85.41"
//     },
//     {
//         "image": "https://s3.amazonaws.com/uifaces/faces/twitter/iqonicd/128.jpg",
//         "title": "Willms - Bernier",
//         "description": "Grass-roots intermediate attitude",
//         "price": "$64.19"
//     },
//     {
//         "image": "https://s3.amazonaws.com/uifaces/faces/twitter/BroumiYoussef/128.jpg",
//         "title": "Dare, Kub and Hills",
//         "description": "User-centric asynchronous interface",
//         "price": "$85.08"
//     },
//     {
//         "image": "https://s3.amazonaws.com/uifaces/faces/twitter/manigm/128.jpg",
//         "title": "Hills - Flatley",
//         "description": "Visionary bi-directional capability",
//         "price": "$81.30"
//     },
//     {
//         "image": "https://s3.amazonaws.com/uifaces/faces/twitter/flexrs/128.jpg",
//         "title": "O'Connell, Zulauf and Douglas",
//         "description": "Self-enabling next generation standardization",
//         "price": "$0.89"
//     }
// ];

const source2 = [
    {
        'name': 'Amazon',
        'description': 'hello'
    },
    {
        'name': 'Facebook',
        'description': 'hellooo'
    }
]

const resultRenderer = ({ title }) => <Label content={title} />

function CompanySelector() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [value, setValue] = useState('');


    const timeoutRef = useRef()
    const handleSearchChange = useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        setLoading(true)
        setValue(data.value)

        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                setLoading(false)
                setResults([])
                setValue('')
                return
            }

            //todo
            const results = JSON.parse(JSON.stringify(source2));

            // Change 'name' key to 'title'
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
                resultRenderer={resultRenderer}
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
