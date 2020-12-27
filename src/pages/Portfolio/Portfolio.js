import { faColumns, faList, faSearchMinus, faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Container, Dropdown, Icon } from 'semantic-ui-react'

import DashboardColumn from "../../components/DashboardColumn/DashboardColumn";
import "./Portfolio.scss";

function Portfolio(props) {
    return (
        <div className="Portfolio">

            <div className='portfolioMenuBar'>
                <Container>
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

                        <Dropdown className='portfolioSelector' text='Summer Internships 2019' pointing>
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
                </Container>
            </div>

            <DashboardColumn />

        </div>
    );
}

export default Portfolio;
