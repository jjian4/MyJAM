import { useState } from "react";
import { Form, Button, Modal, Dropdown, TextArea, Icon, Input } from 'semantic-ui-react'
import {
    DateInput,
} from 'semantic-ui-calendar-react';


import CompanySelector from "../CompanySelector/CompanySelector";
import { STATUS } from '../../constants'
import "./AddNewEntry.scss";


function AddNewEntry() {
    const [open, setOpen] = useState(false)

    const [isStarred, setIsStarred] = useState(false)

    const [applyDate, setApplyDate] = useState('')
    const [deadlineDate, setDeadlineDate] = useState('')

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
            <Modal.Header>
                <div className='header'>
                    <span>New Entry</span>
                    <Icon
                        className='starButton'
                        onClick={() => setIsStarred(!isStarred)}
                        name={isStarred ? 'star' : 'star outline'}
                        color={isStarred ? 'yellow' : 'black'}
                    />
                </div>
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Application Url</label>
                            <Input />
                        </Form.Field>
                    </Form.Group>


                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Company</label>
                            <CompanySelector />
                        </Form.Field>

                        <Form.Field>
                            <label>Position</label>
                            <Input />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Application Date</label>
                            <DateInput
                                name="applyDate"
                                iconPosition="right"
                                closable
                                value={applyDate}
                                onChange={(e, { name, value }) => setApplyDate(value)}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Next Interview / Deadline</label>
                            <DateInput
                                name="deadlineDate"
                                iconPosition="right"
                                closable
                                value={deadlineDate}
                                onChange={(e, { name, value }) => setDeadlineDate(value)}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Status</label>
                            <Dropdown
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
