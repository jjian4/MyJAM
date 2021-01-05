import { IS_CARD_COLORS_ON } from "../../settings";
import "./DashboardIconCard.scss";

const maxNotesLength = 100;
const maxNotesLines = 3;

function DashboardIconCard(props) {
    let truncatedNotes = props.entry.notes;
    if (truncatedNotes.length > maxNotesLength) {
        truncatedNotes = truncatedNotes.substr(0, maxNotesLength - 1);
    }
    truncatedNotes = truncatedNotes.substr(0, truncatedNotes.split('\n', maxNotesLines).join('\n').length);
    if (truncatedNotes !== props.entry.notes) {
        truncatedNotes += '\u2026';
    }

    const cardColor = IS_CARD_COLORS_ON ? props.entry.color : null;

    return (
        <div className={`DashboardIconCard ${cardColor ? 'DashboardIconCard-colored' : ''}`} style={{ borderColor: cardColor }} onClick={() => props.onOpenEditEntry(props.entry)}>
            <img className='logo' src={props.entry.logo} alt={props.entry.company} />
        </div>
    );
}

export default DashboardIconCard;
