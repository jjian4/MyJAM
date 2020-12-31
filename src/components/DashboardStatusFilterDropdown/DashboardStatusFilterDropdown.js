import { Button, Dropdown, Checkbox } from 'semantic-ui-react'

import { STATUS } from "../../constants";
import "./DashboardStatusFilterDropdown.scss";

function DashboardStatusFilterDropdown(props) {
    const dropdownButton = (
        <Button size='tiny' icon='filter' content='Columns' />
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

    // TODO: Close on outside click

    return (
        <Dropdown
            className='DashboardStatusFilterDropdown'
            trigger={dropdownButton} icon={false}
            closeOnChange={false}
            closeOnBlur={false}
            open={props.open}
            onOpen={props.onOpen}
            onClose={e => {
                if (props.open && e.code === 'Escape') {
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
    );
}

export default DashboardStatusFilterDropdown;
