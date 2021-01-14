import {
  faColumns,
  faCompress,
  faExpandAlt,
  faList,
  faListAlt,
  faMinus,
  faPlusCircle,
  faStickyNote,
  faTh,
  faThLarge,
  faThList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PAGE = {
  ABOUT: "About",
  PORTFOLIO: "Portfolio",
};

export const DRAG_DROP_ITEMS = {
  DASHBOARD_CARD: "DashboardCard",
};

export const PORTFOLIO_DISPLAY = {
  BOARD: {
    name: "Board",
    icon: <FontAwesomeIcon icon={faColumns} />,
  },
  TABLE: {
    name: "Table",
    icon: <FontAwesomeIcon icon={faListAlt} />,
  },
};

export const STATUS = {
  REJECTED: "Rejected",
  WISHLIST: "Wishlist",
  APPLIED: "Applied",
  PHONE_SCREEN: "Phone Screen",
  INTERVIEW: "Interview",
  OFFER: "Offer",
};

// Which entry properties to consider when searching portfolio
export const ENTRY_SEARCH_PROPERTIES = ["company", "jobTitle", "url", "notes"];

export const BOARD_DENSITY = {
  ICONS: {
    name: "Icons",
    icon: <FontAwesomeIcon icon={faTh} />,
  },
  COMPACT: {
    name: "Compact",
    icon: <FontAwesomeIcon icon={faThLarge} />,
  },
  DETAILED: {
    name: "Detailed",
    icon: <FontAwesomeIcon icon={faStickyNote} />,
  },
};

export const BOARD_COLUMN_OPTION_ICONS = {
  COMPRESS: faCompress,
  EXPAND: faExpandAlt,
  ADD_ENTRY: faPlusCircle,
  HIDE_COLUMN: faMinus,
};

export const BOARD_SORT_BY = {
  COMPANY: {
    name: "Company",
    property: "company",
    isDefaultAscending: true,
  },
  JOB_TITLE: {
    name: "Job Title",
    property: "jobTitle",
    isDefaultAscending: true,
  },
  DATE_CREATED: {
    name: "Date Created",
    property: "dateCreated",
    isDefaultAscending: false,
  },
  APPLICATION_DATE: {
    name: "Application Date",
    property: "applyDate",
    isDefaultAscending: false,
  },
  DEADLINE_DATE: {
    name: "Interview/Deadline",
    property: "deadlineDate",
    isDefaultAscending: true,
  },
  LAST_UPDATE: {
    name: "Last Update",
    property: "lastUpdate",
    isDefaultAscending: false,
  },
};

export const TABLE_DENSITY = {
  COMPACT: {
    name: "Compact",
    icon: <FontAwesomeIcon icon={faList} />,
  },
  COMFORTABLE: {
    name: "Comfortable",
    icon: <FontAwesomeIcon icon={faThList} />,
  },
};

export const TABLE_COLUMNS = {
  IS_STARRED: { name: "Star", property: "isStarred" },
  COLOR: { name: "Color", property: "color" },
  COMPANY: { name: "Company", property: "company" },
  JOB_TITLE: { name: "Job Title", property: "jobTitle" },
  STATUS: { name: "Status", property: "status" },
  NOTES: { name: "Notes", property: "notes" },
  DATE_CREATED: { name: "Date Created", property: "dateCreated", isDate: true },
  LAST_UPDATE: { name: "Last Update", property: "lastUpdate", isDate: true },
  APPLY_DATE: { name: "Application Date", property: "applyDate", isDate: true },
  DEADLINE_DATE: {
    name: "Interview/Deadline",
    property: "deadlineDate",
    isDate: true,
  },
};

export const CARD_COLORS = [
  //red
  "indianred",
  "crimson",
  "firebrick",
  "maroon",

  //pink
  "orchid",
  "palevioletred",
  "lightcoral",

  //orange
  "salmon",
  "coral",
  "orangered",

  //brown
  "sandybrown",
  "darksalmon",
  "peru",
  "chocolate",
  "sienna",
  "brown",

  //green
  "darkkhaki",
  "olive",
  "mediumseagreen",
  "seagreen",
  "forestgreen",
  "darkolivegreen",
  "darkgreen",
  "darkslategray",

  //blue
  "lightseagreen",
  "cadetblue",
  "darkcyan",
  "steelblue",
  "navy",

  //violet
  "mediumorchid",
  "mediumvioletred",
  "slateblue",
  "darkorchid",
  "darkmagenta",
  "indigo",

  //gray
  "slategray",
];