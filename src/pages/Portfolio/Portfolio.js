import { useState } from "react";
import { Button, Container, Dropdown, Icon } from 'semantic-ui-react'

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
                                    <Icon name='columns' />
                                </Button>
                                <Button icon>
                                    <Icon name='columns' rotated='counterclockwise' />
                                </Button>
                                <Button icon>
                                    <Icon name='list' />
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
                                    <Icon name='search minus' />
                                </Button>
                                <Button icon disabled>
                                    <Icon name='search plus' />
                                </Button>
                            </Button.Group>
                        </div>

                    </div>
                </Container>
            </div>


        </div>
    );
}

export default Portfolio;
