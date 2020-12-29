import "./DashboardColumn.scss";
import DashboardCard from "../DashboardCard/DashboardCard";
import { Dropdown } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
                            <Dropdown.Item>Add an entry</Dropdown.Item>
                            <Dropdown.Item>Hide Column</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className='entries'>
                    {props.entries.map((entry, index) => (
                        <DashboardCard key={index} entry={entry} onOpenEditEntry={props.onOpenEditEntry} />
                    ))}
                </div>
            </div>

            <div className='newEntryButton' onClick={() => props.onOpenNewEntry({ status: props.status })}>
                <FontAwesomeIcon icon={faPlus} />
            </div>

        </div>
    );
}

export default DashboardColumn;
