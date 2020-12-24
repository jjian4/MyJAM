import { useState, useEffect } from "react";
import { Form, Button, Modal, Dropdown, TextArea, Icon, Input } from 'semantic-ui-react'
import {
    DateInput,
} from 'semantic-ui-calendar-react';


import CompanySelector from "../CompanySelector/CompanySelector";
import { STATUS } from '../../constants'
import "./EditEntryModal.scss";


function EditEntryModal(props) {
    const [isStarred, setIsStarred] = useState(false)

    const [applicationUrl, setApplicationUrl] = useState('')

    const [company, setCompany] = useState('')
    const [jobTitle, setJobTitle] = useState('')

    const [applyDate, setApplyDate] = useState('')
    const [deadlineDate, setDeadlineDate] = useState('')
    const [status, setStatus] = useState(STATUS.APPLIED)

    const [notes, setNotes] = useState('')

    const statusOptions = Object.values(STATUS).map(status => (
        { text: status, value: status }
    ))

    useEffect(() => {
        // Initialize values everytime modal reopens
        if (props.open) {
            setIsStarred(props.initialValues.isStarred || false)
            setApplicationUrl(props.initialValues.applicationUrl || '')
            setCompany(props.initialValues.company || '')
            setJobTitle(props.initialValues.jobTitle || '')
            setApplyDate(props.initialValues.applyDate || '')
            setDeadlineDate(props.initialValues.deadlineDate || '')
            setStatus(props.initialValues.status || STATUS.APPLIED)
            setNotes(props.initialValues.notes || '')
        }
    }, [props.open]);

    return (
        <Modal
            className="EditEntryModal"
            onClose={props.onClose}
            open={props.open}
            size='small'
            closeOnEscape={false}
        >
            <Modal.Header>
                <div className='header'>
                    <span>{props.heading}</span>
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
                            <Input value={applicationUrl} onChange={e => setApplicationUrl(e.target.value)} />
                        </Form.Field>
                    </Form.Group>


                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Company</label>
                            <CompanySelector value={company} onNewValue={setCompany} />
                        </Form.Field>

                        <Form.Field>
                            <label>Job Title</label>
                            <Input value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
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
                                value={status}
                                onChange={(e, { name, value }) => setStatus(value)}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Field>
                        <label>Notes</label>
                        <TextArea
                            placeholder='Recruiter name, number of interviews, etc...'
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={props.onClose}>
                    Cancel
                    </Button>
                <Button
                    content="Save"
                    onClick={() => props.onSave({ isStarred, applicationUrl, company, jobTitle, applyDate, deadlineDate, status, notes })}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}

export default EditEntryModal;
