import { useEffect, useRef } from 'react';
import { Button, Dropdown, Checkbox } from 'semantic-ui-react'

import { STATUS } from "../../constants";
import "./DashboardStatusFilterDropdown.scss";


function DashboardStatusFilterDropdown(props) {
    const ref = useRef(null);
    const useOutsideClickListener = ref => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    props.onClose();
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideClickListener(ref);

    const dropdownButton = (
        <Button size='tiny' icon='filter' content='Columns' onClick={() => props.open ? props.onClose() : props.onOpen()} />
    );

    const handleChange = e => {
        let newStatuses = new Set(props.activeStatuses);
        const status = e.target.textContent;
        if (newStatuses.has(status)) {
            newStatuses.delete(status);
            props.onChange(newStatuses);
        } else {
            newStatuses.add(status);
            props.onChange(newStatuses);
        }
    }

    return (
        <span ref={ref}>
            <Dropdown
                className='DashboardStatusFilterDropdown'
                trigger={dropdownButton} icon={false}
                // closeOnChange={false}
                // closeOnBlur={false}
                open={props.open}
                onClose={e => {
                    if (props.open && e && e.code === 'Escape') {
                        props.onClose();
                    }
                }}
            >
                <Dropdown.Menu>
                    {Object.values(STATUS).map((status, index) => (
                        <Checkbox
                            key={index}
                            className='dropdownCheckbox'
                            label={status}
                            checked={props.activeStatuses.has(status)}
                            onChange={handleChange} />
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </span>

    );
}

export default DashboardStatusFilterDropdown;
