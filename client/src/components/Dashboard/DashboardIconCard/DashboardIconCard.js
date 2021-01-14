import { useContext } from "react";
import { useDrag } from "react-dnd";
import AppContext from "../../../AppContext";
import { DRAG_DROP_ITEMS } from "../../../utilities/constants";
import "./DashboardIconCard.scss";

function DashboardIconCard(props) {
  const { portfolioSettings, openEditEntryModal } = useContext(AppContext);

  // Used to allow card to be dragged into another column
  const [{ isDragging }, drag] = useDrag({
    item: { type: DRAG_DROP_ITEMS.DASHBOARD_CARD, id: props.entry.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const cardColor = portfolioSettings.isCardColorOn ? props.entry.color : null;

  return (
    <div
      ref={drag}
      className={`DashboardIconCard ${
        cardColor ? "DashboardIconCard-colored" : ""
      }`}
      style={{ borderColor: cardColor, opacity: isDragging ? 0.5 : 1 }}
      onClick={() => openEditEntryModal(props.entry.id)}
    >
      <img className="logo" src={props.entry.logo} alt={props.entry.company} />
    </div>
  );
}

export default DashboardIconCard;