import { useState, useEffect } from "react";
import { Form, Button, Modal, Dropdown, TextArea, Input } from 'semantic-ui-react'
import {
    DateInput,
} from 'semantic-ui-calendar-react';
import dateFormat from 'dateformat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";


import CompanySelector from "../CompanySelector/CompanySelector";
import { STATUS } from '../../constants'
import "./EditEntryModal.scss";


function EditEntryModal(props) {
    const [isStarred, setIsStarred] = useState(false)

    const [company, setCompany] = useState('')
    const [jobTitle, setJobTitle] = useState('')

    const [applyDate, setApplyDate] = useState(dateFormat(new Date(), "dd-mm-yyyy"))
    const [deadlineDate, setDeadlineDate] = useState('')
    const [status, setStatus] = useState(STATUS.APPLIED)

    const [url, setUrl] = useState('')

    const [notes, setNotes] = useState('')

    const statusOptions = Object.values(STATUS).map(status => (
        { text: status, value: status }
    ))

    useEffect(() => {
        // Initialize values everytime modal reopens
        if (props.open) {
            setIsStarred(props.initialValues.isStarred || false)
            setCompany(props.initialValues.company || '')
            setJobTitle(props.initialValues.jobTitle || '')
            setApplyDate(props.initialValues.applyDate || dateFormat(new Date(), "dd-mm-yyyy"))
            setDeadlineDate(props.initialValues.deadlineDate || '')
            setStatus(props.initialValues.status || STATUS.APPLIED)
            setUrl(props.initialValues.url || '')
            setNotes(props.initialValues.notes || '')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <FontAwesomeIcon
                        className={isStarred ? 'starButton' : 'starOutlineButton'}
                        icon={isStarred ? faStar : faStarOutline}
                        onClick={() => setIsStarred(!isStarred)}
                    />

                </div>
            </Modal.Header>
            <Modal.Content>
                <Form>
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

                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>URL</label>
                            <Input value={url} onChange={e => setUrl(e.target.value)} />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Notes</label>
                            <TextArea
                                placeholder='Recruiter name, number of interviews, etc...'
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={props.onClose}>
                    Cancel
                    </Button>
                <Button
                    content="Save"
                    onClick={() => props.onSave({ isStarred, company, jobTitle, applyDate, deadlineDate, status, url, notes })}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}

export default EditEntryModal;
