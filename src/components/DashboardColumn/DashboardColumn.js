import "./DashboardColumn.scss";
import DashboardCard from "../DashboardCard/DashboardCard";
import { Dropdown } from "semantic-ui-react";

function DashboardColumn(props) {
    return (
        <div className="DashboardColumn">
            <div className='content'>
                <div className='heading'>
                    <span>
                        <span className='status'>{props.status.toUpperCase()}</span>
                        <span className='numEntries'>({props.entries.length})</span>
                    </span>

                    <Dropdown className='options' icon='ellipsis horizontal' direction='left'>
                        <Dropdown.Menu>
                            <Dropdown.Item icon='plus circle' content='Add an Entry' onClick={() => props.onOpenNewEntry({ status: props.status })} />
                            <Dropdown.Item icon='expand' content='Expand View' />
                            {/* <Dropdown.Item icon='compress' content='Compress View' /> */}
                            <Dropdown.Item icon='minus' content='Hide Column' />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className='entries'>
                    {props.entries.map((entry, index) => (
                        <DashboardCard key={index} entry={entry} onOpenEditEntry={props.onOpenEditEntry} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DashboardColumn;
