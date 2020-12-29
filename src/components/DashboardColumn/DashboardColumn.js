import { useState } from "react";

import EditEntryModal from '../EditEntryModal/EditEntryModal'
import { STATUS } from '../../constants'
import "./DashboardColumn.scss";
import DashboardCard from "../DashboardCard/DashboardCard";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DashboardColumn(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="DashboardColumn">
            <div className='heading'>
                {props.status}
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

            <button className='newEntryButton' onClick={() => setIsModalOpen(true)}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
}

export default DashboardColumn;
