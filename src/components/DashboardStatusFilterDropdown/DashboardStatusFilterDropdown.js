import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
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
        <Button size='mini' basic icon='filter' content='Columns' onClick={() => props.open ? props.onClose() : props.onOpen()} />
    );

    const handleCheckboxChange = e => {
        const newSettings = Object.assign({}, props.filterSettings);
        const status = e.target.textContent;

        if (newSettings[status]?.isActive) {
            newSettings[status].isActive = false;
        } else if (newSettings[status]) {
            newSettings[status].isActive = true;
        } else {
            newSettings[status] = { isActive: true, isExpanded: false };
        }
        props.onChange(newSettings);
    }

    const handleSizeChange = (status, isExpanded) => {
        const newSettings = Object.assign({}, props.filterSettings);

        if (newSettings[status]) {
            if (newSettings[status].isExpanded === isExpanded) {
                return;
            }
            newSettings[status].isExpanded = isExpanded;
        } else {
            newSettings[status] = { isActive: false, isExpanded: isExpanded };
        }

        props.onChange(newSettings);
    }

    return (
        <span ref={ref}>
            <Dropdown
                className='DashboardStatusFilterDropdown'
                trigger={dropdownButton} icon={false}
                open={props.open}
                onClose={e => {
                    if (props.open && e?.code === 'Escape') {
                        props.onClose();
                    }
                }}
            >
                <Dropdown.Menu>
                    {Object.values(STATUS).map((status, index) => (
                        <div className='dropdownRow' key={index}>
                            <Checkbox
                                toggle
                                className='checkbox'
                                label={status}
                                checked={props.filterSettings[status]?.isActive}
                                onChange={handleCheckboxChange} />

                            <Button.Group className='sizeButtons' basic size='mini'>
                                <Button
                                    title='Compress'
                                    icon
                                    active={!props.filterSettings[status]?.isExpanded}
                                    onClick={() => handleSizeChange(status, false)}
                                >
                                    <FontAwesomeIcon icon={faCompress} />
                                </Button>
                                <Button
                                    title='Expand'
                                    icon
                                    active={props.filterSettings[status]?.isExpanded}
                                    onClick={() => handleSizeChange(status, true)}
                                >
                                    <FontAwesomeIcon icon={faExpand} />
                                </Button>
                            </Button.Group>
                        </div>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </span>

    );
}

export default DashboardStatusFilterDropdown;
