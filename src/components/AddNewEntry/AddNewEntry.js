import { useState } from "react";
import { Form, Button, Modal, Dropdown, TextArea } from 'semantic-ui-react'

import CompanySelector from "../CompanySelector/CompanySelector";
import { STATUS } from '../../constants'
import "./AddNewEntry.scss";


function AddNewEntry() {
    const [open, setOpen] = useState(false)

    const statusOptions = Object.values(STATUS).map(status => (
        { text: status, value: status }
    ))

    return (
        <Modal
            className="AddNewEntry"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button circular>Add New Entry</Button>}
            size='small'
        >
            <Modal.Header>Add New Entry</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group>
                        <Form.Field width={12}>
                            <label>Company</label>
                            <CompanySelector fluid />
                        </Form.Field>

                        <Form.Field width={4}>
                            <label>Status</label>
                            <Dropdown
                                placeholder='Status'
                                fluid
                                search
                                selection
                                options={statusOptions}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Field>
                        <label>Notes</label>
                        <TextArea placeholder='Recruiter name, number of interviews, etc...' />
                    </Form.Field>

                    <Form.Checkbox label='I agree to the Terms and Conditions' />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen(false)}>
                    Cancel
                    </Button>
                <Button
                    content="Save"
                    onClick={() => setOpen(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}

export default AddNewEntry;
