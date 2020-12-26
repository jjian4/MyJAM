import { useState } from "react";
import { Button, Card, Image } from 'semantic-ui-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarTimes, faEdit, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

import EditEntryModal from '../EditEntryModal/EditEntryModal'
import { STATUS } from '../../constants'
import "./DashboardColumn.scss";


const fakeProps = {
    entries: [
        { id: 1234, isStarred: false, company: 'Facebook', logo: 'https://logo.clearbit.com/facebook.com', jobTitle: 'Software Engineer', applyDate: '01-01-2020', deadlineDate: '', status: STATUS.APPLIED, url: '', notes: '' },
        { id: 5678, isStarred: true, company: 'Apple', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'My notes...' },
    ]
}

function DashboardColumn(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <div className="DashboardColumn">
            <div className='entries'>
                {fakeProps.entries.map((entry, index) => (
                    <Card className='entryCard'>
                        <Card.Content>
                            <div className='cardTop'>
                                <Image className='logo' src={entry.logo} />
                                <div>
                                    <div className='company'>{entry.company}</div>
                                    <div className='jobTitle'>{entry.jobTitle}</div>
                                </div>
                                <div className='cardOptions'>
                                    <FontAwesomeIcon
                                        className='editIconButton'
                                        icon={faEdit}
                                        onClick={() => console.log('TODO')}
                                    />

                                    <FontAwesomeIcon
                                        className={entry.isStarred ? 'starIcon' : 'starOutlineIcon'}
                                        onClick={() => console.log('TODO')}
                                        icon={entry.isStarred ? faStar : faStarOutline}
                                    />
                                </div>
                            </div>

                        </Card.Content>
                        <Card.Content extra>
                            <div className='cardBottom'>
                                <div className='cardDates'>
                                    <div>
                                        <FontAwesomeIcon
                                            className={'dateIcon'}
                                            icon={faCalendar}
                                        />
                                        <span className='date'>edited X min ago</span>
                                    </div>
                                    {entry.deadlineDate && (
                                        <div>
                                            <FontAwesomeIcon
                                                className={'dateIcon'}
                                                icon={faCalendarTimes}
                                            />
                                            <span className='date'>{`Next: ${entry.deadlineDate}`}</span>
                                        </div>
                                    )}
                                </div>

                                <div className='cardButtons'>
                                    <Button.Group fluid>
                                        {entry.url && (
                                            <Button
                                                className='cardButton'
                                                as='a'
                                                target='_blank'
                                                href={entry.url}
                                            >
                                                Visit
                                            </Button>

                                        )}

                                        <Button
                                            className='cardButton'
                                            onClick={() => console.log('TODO')}
                                        >
                                            Edit
                                    </Button>

                                    </Button.Group>

                                </div>
                            </div>
                        </Card.Content>
                    </Card>

                ))}
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
