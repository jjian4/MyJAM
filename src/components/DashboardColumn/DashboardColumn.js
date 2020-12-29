import { useState } from "react";

import EditEntryModal from '../EditEntryModal/EditEntryModal'
import { STATUS } from '../../constants'
import "./DashboardColumn.scss";
import DashboardCard from "../DashboardCard/DashboardCard";
import { Button, Dropdown } from "semantic-ui-react";

function DashboardColumn(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="DashboardColumn">
            <div className='heading'>
                <span>
                    <span className='status'>{props.status.toUpperCase()}</span>
                    <span className='numEntries'>({props.entries.length})</span>
                </span>

                <Dropdown className='options' icon='ellipsis horizontal' direction='left'>
                    <Dropdown.Menu>
                        <Dropdown.Item>Add an entry</Dropdown.Item>
                        <Dropdown.Item>Hide Column</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {/* <FontAwesomeIcon className='options' icon={faEllipsisH} /> */}
            </div>

            <div className='entries'>
                {props.entries.map((entry, index) => (
                    <DashboardCard entry={entry} key={index} />
                ))}
            </div>

            <EditEntryModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                heading='New Entry'
                entryId={'1234'} // TODO: fetch existing from db, or set to null if new
                initialValues={{
                    status: STATUS.APPLIED,
                    notes: 'testingg',
                }}
                onSave={values => console.log(values)}
            />

            <Button className='newEntryButton' onClick={() => setIsModalOpen(true)}>Add Entry</Button>
        </div>
    );
}

export default DashboardColumn;
