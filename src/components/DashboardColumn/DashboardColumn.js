import "./DashboardColumn.scss";
import DashboardCard from "../DashboardCard/DashboardCard";
import { Dropdown, Grid } from "semantic-ui-react";

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
                            <Dropdown.Item icon='plus circle' content='Add an Entry' onClick={() => props.onOpenNewEntry({ status: props.status })} />
                            {props.isExpanded ?
                                <Dropdown.Item icon='compress' content='Compress View' onClick={() => props.onSetIsExpanded(false)} />
                                : <Dropdown.Item icon='expand' content='Expand View' onClick={() => props.onSetIsExpanded(true)} />
                            }
                            <Dropdown.Item icon='minus' content='Hide Column' onClick={props.onHideColumn} />
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
