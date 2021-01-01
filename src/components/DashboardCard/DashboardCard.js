import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarTimes, faEdit, faLink, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

import "./DashboardCard.scss";

const maxNotesLength = 100;
const maxNotesLines = 3;

function DashboardCard(props) {
    let truncatedNotes = props.entry.notes;
    if (truncatedNotes.length > maxNotesLength) {
        truncatedNotes = truncatedNotes.substr(0, maxNotesLength - 1);
    }
    truncatedNotes = truncatedNotes.substr(0, truncatedNotes.split('\n', maxNotesLines).join('\n').length);
    if (truncatedNotes !== props.entry.notes) {
        truncatedNotes += '\u2026';
    }

    return (
        <div className='DashboardCard'>
            <div className={`cardTop ${props.isDetailed ? '' : 'compactCardTop'}`}>
                <img className='logo' src={props.entry.logo} alt='logo' />
                <div>
                    <div className='company'>{props.entry.company}</div>
                    <div className='jobTitle'>{props.entry.jobTitle}</div>
                </div>
                <div className='cardOptions'>
                    {props.entry.url && (
                        <a href={props.entry.url} target='_blank' rel='noreferrer'>
                            <FontAwesomeIcon
                                title='URL'
                                icon={faLink}
                            />
                        </a>
                    )}

                    <FontAwesomeIcon
                        title='Edit'
                        icon={faEdit}
                        onClick={() => props.onOpenEditEntry(props.entry)}
                    />

                    <FontAwesomeIcon
                        className={props.entry.isStarred ? 'starIcon' : 'starOutlineIcon'}
                        title='Favorite'
                        onClick={() => console.log('TODO')}
                        icon={props.entry.isStarred ? faStar : faStarOutline}
                    />
                </div>
            </div>

            {props.isDetailed && (
                <>
                    <div className='cardMid'>
                        {truncatedNotes}
                    </div>

                    <div className='cardBottom'>
                        <div className='cardDates'>
                            <div>
                                <FontAwesomeIcon
                                    className={'dateIcon'}
                                    icon={faCalendar}
                                />
                                <span className='date'>edited X min ago</span>
                            </div>
                            {props.entry.deadlineDate && (
                                <div>
                                    <FontAwesomeIcon
                                        className={'dateIcon'}
                                        icon={faCalendarTimes}
                                    />
                                    <span className='date'>{`Next: ${props.entry.deadlineDate}`}</span>
                                </div>
                            )}
                        </div>

                        <div className='cardButtons'>
                            {props.entry.url && (
                                <a
                                    className='cardButton'
                                    href={props.entry.url}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    Visit
                                </a>

                            )}
                            <div className='cardButton' onClick={() => props.onOpenEditEntry(props.entry)}>
                                Edit
                    </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}

export default DashboardCard;
