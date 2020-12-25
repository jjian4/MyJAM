import { useState } from "react";
import { Button } from 'semantic-ui-react'

import EditEntryModal from '../EditEntryModal/EditEntryModal'
import { STATUS } from '../../constants'
import "./DashboardColumn.scss";

function DashboardColumn(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <div className="DashboardColumn">
            <div className='entries'>
                TODO
            </div>

            <Button
                circular
                onClick={() => setIsModalOpen(true)}
            >
                Add New Entry
            </Button>

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
        </div>
    );
}

export default DashboardColumn;
