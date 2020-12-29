import { faColumns, faList, faSearchMinus, faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Dropdown } from 'semantic-ui-react'

import DashboardColumn from "../../components/DashboardColumn/DashboardColumn";
import { STATUS } from "../../constants";
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


function Portfolio(props) {
    return (
        <div className="Portfolio">

            <div className='portfolioMenuBar'>
                <div className='portfolioMenuBarContent'>
                    <div className='portfolioMenuItem'>
                        <Button.Group basic>
                            <Button icon active>
                                <FontAwesomeIcon icon={faColumns} />
                            </Button>
                            <Button icon>
                                <FontAwesomeIcon icon={faColumns} rotation={270} />
                            </Button>
                            <Button icon>
                                <FontAwesomeIcon icon={faList} />
                            </Button>
                        </Button.Group>
                    </div>

                    <Dropdown className='portfolioSelector' text='Summer Internships 2019' pointing inline>
                        <Dropdown.Menu>
                            <Dropdown.Item>Summer Internships 2019</Dropdown.Item>
                            <Dropdown.Item>Summer 2018</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <div className='portfolioMenuItem'>
                        <Button.Group basic>
                            <Button icon>
                                <FontAwesomeIcon icon={faSearchMinus} />
                            </Button>
                            <Button icon disabled>
                                <FontAwesomeIcon icon={faSearchPlus} />
                            </Button>
                        </Button.Group>
                    </div>

                </div>
            </div>

            <div className='dashboardColumns'>
                <DashboardColumn entries={fakeEntries} status={STATUS.APPLIED} />

                <DashboardColumn entries={fakeEntries2} status={STATUS.REJECTED} />

                <DashboardColumn entries={fakeEntries2} status={STATUS.PHONE_SCREEN} />

                <DashboardColumn entries={fakeEntries2} status={STATUS.INTERVIEW} />

                <DashboardColumn entries={fakeEntries2} status={STATUS.OFFER} />
            </div>
            {/* <div>
                lineee
            </div> */}
        </div>
    );
}

export default Portfolio;
