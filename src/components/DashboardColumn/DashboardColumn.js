import DashboardCard from "../DashboardCard/DashboardCard";
import { Dropdown, Grid } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpand, faMinus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import "./DashboardColumn.scss";

const MIN_WIDTH = 280;
const MAX_WIDTH = 310;

function DashboardColumn(props) {
    return (
        <div className="DashboardColumn" style={{
            minWidth: `${MIN_WIDTH * (props.isExpanded ? 2 : 1)}px`,
            maxWidth: `${MAX_WIDTH * (props.isExpanded ? 2 : 1)}px`,
        }}>
            <div className='content'>
                <div className='heading'>
                    <span>
                        <span className='status'>{props.status.toUpperCase()}</span>
                        <span className='numEntries'>({props.entries.length})</span>
                    </span>

                    <Dropdown className='options' icon='ellipsis horizontal' direction='left'>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => props.onOpenNewEntry({ status: props.status })}>
                                <FontAwesomeIcon className='optionIcon' icon={faPlusCircle} /> Add an Entry
                            </Dropdown.Item>
                            {props.isExpanded ? (
                                <Dropdown.Item onClick={() => props.onSetIsExpanded(false)}>
                                    <FontAwesomeIcon className='optionIcon' icon={faCompressAlt} /> Compress View
                                </Dropdown.Item>
                            ) : (
                                    <Dropdown.Item onClick={() => props.onSetIsExpanded(true)}>
                                        <FontAwesomeIcon className='optionIcon' icon={faExpand} /> Expand View
                                    </Dropdown.Item>
                                )
                            }
                            <Dropdown.Item onClick={() => console.log(props.entries)}>
                                <FontAwesomeIcon className='optionIcon' icon={faMinus} /> Hide Column
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className='entries'>
                    <Grid className='entriesGrid'>
                        <Grid.Row>
                            {props.entries.map((entry, index) => (
                                <Grid.Column key={index} width={props.isExpanded ? 8 : 16} style={{ padding: '6px' }}>
                                    <DashboardCard entry={entry} onOpenEditEntry={props.onOpenEditEntry} isDetailed={props.isDetailed} />
                                </Grid.Column>
                            ))}
                        </Grid.Row>
                    </Grid>



                </div>
            </div>
        </div>
    );
}

export default DashboardColumn;
