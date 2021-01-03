import { useState, useEffect } from "react";
import { Button, Dropdown } from 'semantic-ui-react'

import DashboardColumn from "../../components/DashboardColumn/DashboardColumn";
import DashboardStatusFilterDropdown from "../../components/DashboardStatusFilterDropdown/DashboardStatusFilterDropdown";
import EditEntryModal from '../../components/EditEntryModal/EditEntryModal'
import { PORTFOLIO_DISPLAY, PORTFOLIO_DENSITY, STATUS } from "../../constants";
import { LAST_PORTFOLIO_DISPLAY, LAST_PORTFOLIO_DENSITY, LAST_FILTER_SETTINGS } from "../../settings";
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
    { id: 1234, isStarred: true, company: 'Doordash', domain: 'google.com', logo: 'https://logo.clearbit.com/doordash.com', jobTitle: 'Software Engineer Intern', applyDate: '01-01-2020', deadlineDate: '04-03-2020', status: STATUS.REJECTED, url: '', notes: 'siufha uafoidjiof oufdhsauofdj oqhwfw' },
]
const fakeEntries3 = [
    { id: 1234, color: 'indianred', isStarred: true, company: 'Doordash', domain: 'google.com', logo: 'https://logo.clearbit.com/doordash.com', jobTitle: 'Software Engineer Intern', applyDate: '01-01-2020', deadlineDate: '04-03-2020', status: STATUS.REJECTED, url: 'https://doordash.com', notes: 'siufha uafoidjiof oufdhsauofdj oqhwfw' },
    { id: 1234, color: 'darkcyan', isStarred: false, company: 'Facebook', domain: 'google.com', logo: 'https://logo.clearbit.com/facebook.com', jobTitle: 'Software Engineer', applyDate: '01-01-2020', deadlineDate: '', status: STATUS.APPLIED, url: '', notes: 'sdjk dsaiiuh\nsdui' },
    { id: 1234, color: 'mediumorchid', isStarred: false, company: 'Microsoft', domain: 'google.com', logo: 'https://logo.clearbit.com/microsoft.com', jobTitle: 'QA Engineer', applyDate: '01-01-2020', deadlineDate: '', status: STATUS.PHONE_SCREEN, url: 'https://microsoft.com', notes: 'usf iosoidsoiaoi dsdsoa oiuh iuweq w ef' },
    { id: 1234, color: 'coral', isStarred: false, company: 'Oracle', domain: 'oracle.com', logo: 'https://logo.clearbit.com/oracle.com', jobTitle: 'QA Engineer II', applyDate: '03-06-2020', deadlineDate: '', status: STATUS.REJECTED, url: '', notes: 'usf sfs wdfs dsef' },
    { id: 1234, color: 'slateblue', isStarred: true, company: 'Salesforce', domain: 'salesforce.com', logo: 'https://logo.clearbit.com/salesforce.com', jobTitle: 'Data Analyst', applyDate: '01-04-2020', deadlineDate: '01-04-2021', status: STATUS.PHONE_SCREEN, url: 'https://salesforce.com', notes: 'usf sfs wdfs dsef' },
]

function Portfolio(props) {
    const [isWindowSmall, setIsWindowSmall] = useState(window.innerWidth <= 991);

    const [display, setDisplay] = useState(LAST_PORTFOLIO_DISPLAY);
    const [density, setDensity] = useState(LAST_PORTFOLIO_DENSITY);
    const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
    const [filterSettings, setFilterSettings] = useState(LAST_FILTER_SETTINGS);

    const [entries, setEntries] = useState([]);

    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [newModalInitialValues, setNewModalInitialValues] = useState({})
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editModalInitialValues, setEditModalInitialValues] = useState({})

    useEffect(() => {
        // TODO: fetch portfolio entries from db
        setEntries(fakeEntries3);

        window.addEventListener("resize", resizeWindow);
        return () => {
            window.removeEventListener("resize", resizeWindow);
        }
    }, []);

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
                                    entries={entries}
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
                        return null;
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
