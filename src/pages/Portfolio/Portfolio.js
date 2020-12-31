import { useState } from "react";
import { Button, Dropdown } from 'semantic-ui-react'

import DashboardColumn from "../../components/DashboardColumn/DashboardColumn";
import DashboardStatusFilterDropdown from "../../components/DashboardStatusFilterDropdown/DashboardStatusFilterDropdown";
import EditEntryModal from '../../components/EditEntryModal/EditEntryModal'
import { PORTFOLIO_DENSITY, PORTFOLIO_DISPLAY, STATUS } from "../../constants";
import "./Portfolio.scss";

const fakeEntries = [
    { id: 1234, isStarred: false, company: 'Facebook', logo: 'https://logo.clearbit.com/facebook.com', jobTitle: 'Software Engineer', applyDate: '01-01-2020', deadlineDate: '', status: STATUS.APPLIED, url: '', notes: '' },
    { id: 5678, isStarred: true, company: 'Apple', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'kjdasfnjasnvsa o jsdkfsa\njsdav inus oufjuh oudsofjof sd\nAnother line' },
    { id: 5678, isStarred: true, company: 'Apple', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'awiufwb\n\n\n\nsfwsdhbfsi' },
    { id: 5678, isStarred: true, company: 'Apple', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'awiufwb\n\n\n\nsfwsdhbfsi' },
    { id: 5678, isStarred: true, company: 'Apple', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'awiufwb\n\n\n\nsfwsdhbfsi' },
    { id: 5678, isStarred: true, company: 'Apple', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'awiufwb\n\n\n\nsfwsdhbfsi' },
]
const fakeEntries2 = [
    { id: 1234, isStarred: false, company: 'Facebook', logo: 'https://logo.clearbit.com/facebook.com', jobTitle: 'Software Engineer', applyDate: '01-01-2020', deadlineDate: '', status: STATUS.APPLIED, url: '', notes: '' },
    { id: 5678, isStarred: true, company: 'Apple', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'kjdasfnjasnvsa o jsdkfsa\njsdav inus oufjuh oudsofjof sd\nAnother line' },
]
const fakeEntries3 = [
    { id: 5678, isStarred: true, company: 'Apple', logo: 'https://logo.clearbit.com/apple.com', jobTitle: 'Mechanical Engineer Intern - Cupertino, California', applyDate: '05-03-2020', deadlineDate: '06-01-2020', status: STATUS.APPLIED, url: 'https://apple.com', notes: 'kjdasfnjasnvsa o jsdkfsa\njsdav inus oufjuh oudsofjof sd\nAnother line' },
    { id: 1234, isStarred: true, company: 'Doordash', logo: 'https://logo.clearbit.com/doordash.com', jobTitle: 'Software Engineer Intern', applyDate: '01-01-2020', deadlineDate: '04-03-2020', status: STATUS.REJECTED, url: '', notes: 'siufha uafoidjiof oufdhsauofdj oqhwfw' },
]
const fakeEntries4 = [
    { id: 1234, isStarred: true, company: 'Doordash', logo: 'https://logo.clearbit.com/doordash.com', jobTitle: 'Software Engineer Intern', applyDate: '01-01-2020', deadlineDate: '04-03-2020', status: STATUS.REJECTED, url: '', notes: 'siufha uafoidjiof oufdhsauofdj oqhwfw' },
    { id: 1234, isStarred: false, company: 'Facebook', logo: 'https://logo.clearbit.com/facebook.com', jobTitle: 'Software Engineer', applyDate: '01-01-2020', deadlineDate: '', status: STATUS.APPLIED, url: '', notes: 'sdjk dsaiiuh\nsdui' },
    { id: 1234, isStarred: false, company: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com', jobTitle: 'QA Engineer', applyDate: '01-01-2020', deadlineDate: '', status: STATUS.PHONE_SCREEN, url: '', notes: 'usf iosoidsoiaoi dsdsoa oiuh iuweq w ef' },
]

function Portfolio(props) {
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
                        <Button.Group className='displayButtons' basic size='mini'>
                            {Object.values(PORTFOLIO_DISPLAY).map((item, index) => (
                                <Button key={index} icon active={display === item.name}>
                                    {item.icon}{item.name}
                                </Button>
                            ))}
                        </Button.Group>

                        <Button.Group className='densityButtons' basic size='mini'>
                            {Object.values(PORTFOLIO_DENSITY).map((item, index) => (
                                <Button key={index} icon active={density === item.name}>
                                    {item.icon}{item.name}
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
                        <span className='filterDropdown'>
                            {/* Controlling this dropdown the hard way because checkbox clicks close the menu by default */}
                            <DashboardStatusFilterDropdown
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
                            content='Add New Entry'
                            onClick={() => {
                                setNewModalInitialValues({});
                                setIsNewModalOpen(true);
                            }}
                        />
                    </div>

                </div>
            </div>

            <div className='dashboardColumns'>
                {Object.values(STATUS).map((status, index) => {
                    if (filterSettings[status]?.isActive) {
                        return (
                            <DashboardColumn
                                key={index}
                                status={status}
                                isExpanded={filterSettings[status].isExpanded}
                                entries={fakeEntries}
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
