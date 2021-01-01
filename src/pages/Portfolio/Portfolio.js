import { useState, useEffect } from "react";
import { Button, Dropdown } from 'semantic-ui-react'

import DashboardColumn from "../../components/DashboardColumn/DashboardColumn";
import DashboardStatusFilterDropdown from "../../components/DashboardStatusFilterDropdown/DashboardStatusFilterDropdown";
import EditEntryModal from '../../components/EditEntryModal/EditEntryModal'
import { PORTFOLIO_DISPLAY, PORTFOLIO_DENSITY, STATUS } from "../../constants";
import "./Portfolio.scss";

const fakeEntries = [
    { id: 1234, isStarred: false, company: 'Facebook', domain: '', logo: 'https://logo.clearbit.com/facebook.com', jobTitle: 'Software Engineer II', applyDate: '01-01-2020', deadlineDate: '', status: STATUS.APPLIED, url: '', notes: '' },
    { id: 5678, isStarred: true, company: 'Apple', domain: 'google.com', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'kjdasfnjasnvsa o jsdkfsa\njsdav inus oufjuh oudsofjof sd\nAnother line' },
    { id: 5678, isStarred: true, company: 'Apple', domain: 'google.com', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'awiufwb\n\n\n\nsfwsdhbfsi' },
    { id: 5678, isStarred: true, company: 'Apple', domain: 'google.com', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'awiufwb\n\n\n\nsfwsdhbfsi' },
    { id: 5678, isStarred: true, company: 'Apple', domain: 'google.com', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'awiufwb\n\n\n\nsfwsdhbfsi' },
    { id: 5678, isStarred: true, company: 'Apple', domain: 'google.com', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'awiufwb\n\n\n\nsfwsdhbfsi' },
]
const fakeEntries2 = [
    { id: 1234, isStarred: false, company: 'Facebook', domain: 'google.com', logo: 'https://logo.clearbit.com/facebook.com', jobTitle: 'Software Engineer', applyDate: '01-01-2020', deadlineDate: '', status: STATUS.APPLIED, url: '', notes: '' },
    { id: 5678, isStarred: true, company: 'Apple', domain: 'google.com', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'kjdasfnjasnvsa o jsdkfsa\njsdav inus oufjuh oudsofjof sd\nAnother line' },
]
const fakeEntries3 = [
    { id: 5678, isStarred: true, company: 'Apple', domain: 'google.com', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'kjdasfnjasnvsa o jsdkfsa\njsdav inus oufjuh oudsofjof sd\nAnother line' },
    { id: 1234, isStarred: true, company: 'Doordash', domain: 'google.com', logo: 'https://logo.clearbit.com/doordash.com', jobTitle: 'Software Engineer Intern', applyDate: '01-01-2020', deadlineDate: '04-03-2020', status: STATUS.REJECTED, url: '', notes: 'siufha uafoidjiof oufdhsauofdj oqhwfw' },
]
const fakeEntries4 = [
    { id: 1234, isStarred: true, company: 'Doordash', domain: 'google.com', logo: 'https://logo.clearbit.com/doordash.com', jobTitle: 'Software Engineer Intern', applyDate: '01-01-2020', deadlineDate: '04-03-2020', status: STATUS.REJECTED, url: '', notes: 'siufha uafoidjiof oufdhsauofdj oqhwfw' },
    { id: 1234, isStarred: false, company: 'Facebook', domain: 'google.com', logo: 'https://logo.clearbit.com/facebook.com', jobTitle: 'Software Engineer', applyDate: '01-01-2020', deadlineDate: '', status: STATUS.APPLIED, url: '', notes: 'sdjk dsaiiuh\nsdui' },
    { id: 1234, isStarred: false, company: 'Microsoft', domain: 'google.com', logo: 'https://logo.clearbit.com/microsoft.com', jobTitle: 'QA Engineer', applyDate: '01-01-2020', deadlineDate: '', status: STATUS.PHONE_SCREEN, url: '', notes: 'usf iosoidsoiaoi dsdsoa oiuh iuweq w ef' },
]

function Portfolio(props) {
    const [isWindowSmall, setIsWindowSmall] = useState(window.innerWidth <= 991);

    const [display, setDisplay] = useState(PORTFOLIO_DISPLAY.BOARD_1.name);
    const [density, setDensity] = useState(PORTFOLIO_DENSITY.COMPACT.name);
    const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
    const [filterSettings, setFilterSettings] = useState({
        [STATUS.APPLIED]: { isActive: true, isExpanded: true },
        [STATUS.INTERVIEW]: { isActive: true, isExpanded: false },
        [STATUS.OFFER]: { isActive: true, isExpanded: false },
    });

    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [newModalInitialValues, setNewModalInitialValues] = useState({})
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editModalInitialValues, setEditModalInitialValues] = useState({})

    useEffect(() => {
        window.addEventListener("resize", resizeWindow);
        return () => {
            window.removeEventListener("resize", resizeWindow);
        }
    });
    // Resize menu items when window gets too small
    const resizeWindow = () => {
        setIsWindowSmall(window.innerWidth <= 991);
    }

    const openNewEntry = initialValues => {
        setNewModalInitialValues(initialValues);
        setIsNewModalOpen(true);
    }

    const saveNewEntry = values => {
        console.log(values);
        console.log('TODO')

        // TODO: add to database, add generated id to values, insert entry into column
    }

    const openEditEntry = initialValues => {
        setEditModalInitialValues(initialValues);
        setIsEditModalOpen(true);
    }

    const saveEditEntry = values => {
        console.log(values);
        console.log('TODO')

        // TODO: get values.entryId and update id in database
    }

    return (
        <div className="Portfolio">
            <div className='portfolioMenuBar'>
                <div className='content'>
                    <div className='menuleft'>
                        <Button.Group className='displayButtons' basic size='tiny'>
                            {Object.values(PORTFOLIO_DISPLAY).map((item, index) => (
                                <Button key={index} icon active={display === item.name} onClick={() => setDisplay(item.name)}>
                                    {item.icon}{!isWindowSmall && <span className='buttonLabel'>{item.name}</span>}
                                </Button>
                            ))}
                        </Button.Group>

                        <Button.Group className='densityButtons' basic size='tiny'>
                            {Object.values(PORTFOLIO_DENSITY).map((item, index) => (
                                <Button key={index} icon active={density === item.name} onClick={() => setDensity(item.name)}>
                                    {item.icon}{!isWindowSmall && <span className='buttonLabel'>{item.name}</span>}
                                </Button>
                            ))}
                        </Button.Group>
                    </div>

                    <Dropdown className='portfolioSelector' text='Summer Internships 2019' pointing>
                        <Dropdown.Menu>
                            <Dropdown.Item>Summer Internships 2019</Dropdown.Item>
                            <Dropdown.Item>Summer 2018</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>Edit Portfolios</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <div className='menuRight'>
                        <Button
                            className='sortDropdown'
                            basic
                            size='tiny'
                            icon='sort amount down'
                            content={isWindowSmall ? null : 'Sort'}
                            onClick={() => console.log('TODO')}
                        />

                        <span className='filterDropdown'>
                            {/* Controlling this dropdown the hard way because checkbox clicks close the menu by default */}
                            <DashboardStatusFilterDropdown
                                hideLabel={isWindowSmall}
                                open={isStatusFilterOpen}
                                onOpen={() => setIsStatusFilterOpen(true)}
                                onClose={() => setIsStatusFilterOpen(false)}
                                filterSettings={filterSettings}
                                onChange={x => setFilterSettings(x)}
                            />
                        </span>

                        <Button
                            className='newEntryButton'
                            positive
                            size='tiny'
                            icon='plus'
                            content={isWindowSmall ? null : 'New Entry'}
                            onClick={() => {
                                setNewModalInitialValues({});
                                setIsNewModalOpen(true);
                            }}
                        />
                    </div>

                </div>
            </div>

            {display === PORTFOLIO_DISPLAY.BOARD_1.name && (
                <div className='dashboardColumns'>
                    {Object.values(STATUS).map((status, index) => {
                        if (filterSettings[status]?.isActive) {
                            return (
                                <DashboardColumn
                                    key={index}
                                    status={status}
                                    isExpanded={filterSettings[status].isExpanded}
                                    entries={fakeEntries}
                                    isDetailed={density === PORTFOLIO_DENSITY.DETAILED.name}
                                    onOpenNewEntry={openNewEntry}
                                    onOpenEditEntry={openEditEntry}
                                    onSetIsExpanded={isExpanded => {
                                        const newSettings = Object.assign({}, filterSettings);
                                        newSettings[status].isExpanded = isExpanded;
                                        setFilterSettings(newSettings);
                                    }}
                                    onHideColumn={() => {
                                        const newSettings = Object.assign({}, filterSettings);
                                        newSettings[status].isActive = false;
                                        setFilterSettings(newSettings);
                                    }}
                                />
                            )
                        }
                    })}
                </div>
            )}

            {display === PORTFOLIO_DISPLAY.BOARD_2.name && (
                <div>
                    TODO
                </div>
            )}

            {display === PORTFOLIO_DISPLAY.TABLE.name && (
                <div>
                    TODO
                </div>
            )}

            {/* Used to add new entries */}
            <EditEntryModal
                open={isNewModalOpen}
                onClose={() => setIsNewModalOpen(false)}
                heading='New Entry'
                initialValues={newModalInitialValues}
                onSave={saveNewEntry}
            />

            {/* Used to edit existing entries */}
            <EditEntryModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                heading={`${editModalInitialValues.company} - ${editModalInitialValues.jobTitle}`}
                initialValues={editModalInitialValues}
                onSave={saveEditEntry}
            />
        </div>
    );
}

export default Portfolio;