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

export const DRAG_DROP_ITEMS = {
  DASHBOARD_CARD: "DashboardCard",
};

export const STATUS = {
  REJECTED: "Rejected",
  WISHLIST: "Wishlist",
  APPLIED: "Applied",
  PHONE_SCREEN: "Phone Screen",
  INTERVIEW: "Interview",
  OFFER: "Offer",
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

export const DEFAULT_BOARD_COLUMN_FILTER = [
  { status: STATUS.REJECTED, isActive: false, isExpanded: false },
  { status: STATUS.WISHLIST, isActive: false, isExpanded: false },
  { status: STATUS.APPLIED, isActive: true, isExpanded: false },
  { status: STATUS.PHONE_SCREEN, isActive: false, isExpanded: false },
  { status: STATUS.INTERVIEW, isActive: true, isExpanded: false },
  { status: STATUS.OFFER, isActive: true, isExpanded: false },
];

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
  IS_STARRED: { name: "Star", property: "isStarred", isDate: false },
  COLOR: { name: "Color", property: "color", isDate: false },
  COMPANY: { name: "Company", property: "company", isDate: false },
  JOB_TITLE: { name: "Job Title", property: "jobTitle", isDate: false },
  STATUS: { name: "Status", property: "status", isDate: false },
  URL: { name: "URL", property: "url", isDate: false },
  NOTES: { name: "Notes", property: "notes", isDate: false },
  DATE_CREATED: { name: "Date Created", property: "dateCreated", isDate: true },
  LAST_UPDATE: { name: "Last Update", property: "lastUpdate", isDate: true },
  APPLY_DATE: { name: "Application Date", property: "applyDate", isDate: true },
  DEADLINE_DATE: {
    name: "Interview/Deadline",
    property: "deadlineDate",
    isDate: true,
  },
};

export const DEFAULT_TABLE_COLUMN_FILTER = [
  { ...TABLE_COLUMNS.IS_STARRED, isActive: true },
  { ...TABLE_COLUMNS.COLOR, isActive: false },
  {
    ...TABLE_COLUMNS.DATE_CREATED,
    isActive: false,
  },
  {
    ...TABLE_COLUMNS.APPLY_DATE,
    isActive: true,
  },
  { ...TABLE_COLUMNS.COMPANY, isActive: true },
  { ...TABLE_COLUMNS.JOB_TITLE, isActive: true },
  { ...TABLE_COLUMNS.STATUS, isActive: true },
  { ...TABLE_COLUMNS.URL, isActive: true },
  { ...TABLE_COLUMNS.NOTES, isActive: false },
  {
    ...TABLE_COLUMNS.DEADLINE_DATE,
    isActive: true,
  },
  {
    ...TABLE_COLUMNS.LAST_UPDATE,
    isActive: false,
  },
];

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
