import {
  faColumns,
  faCompress,
  faExpand,
  faList,
  faListAlt,
  faMinus,
  faPlus,
  faStickyNote,
  faTh,
  faThLarge,
  faThList,
} from "@fortawesome/free-solid-svg-icons";

export const WEBSITE_NAME = "MyJAM";

export const DRAG_DROP_ITEMS = {
  DASHBOARD_CARD: "DashboardCard",
};

export const PORTFOLIO_DISPLAY = {
  BOARD: {
    name: "Board",
    icon: faColumns,
  },
  TABLE: {
    name: "Table",
    icon: faListAlt,
  },
};

// Which entry properties to consider when searching portfolio
export const ENTRY_SEARCH_PROPERTIES = ["company", "jobTitle", "url", "notes"];

export const BOARD_DENSITY = {
  ICONS: {
    name: "Icons",
    icon: faTh,
  },
  COMPACT: {
    name: "Compact",
    icon: faThLarge,
  },
  DETAILED: {
    name: "Detailed",
    icon: faStickyNote,
  },
};

export const DEFAULT_BOARD_COLUMN_FILTER = [
  {
    statusId: "default_0",
    status: "Rejected",
    isActive: false,
    isExpanded: false,
  },
  {
    statusId: "default_1",
    status: "Wishlist",
    isActive: false,
    isExpanded: false,
  },
  {
    statusId: "default_2",
    status: "Applied",
    isActive: true,
    isExpanded: false,
  },
  {
    statusId: "default_3",
    status: "Phone Screen",
    isActive: false,
    isExpanded: false,
  },
  {
    statusId: "default_4",
    status: "Interview",
    isActive: true,
    isExpanded: false,
  },
  { statusId: "default_5", status: "Offer", isActive: true, isExpanded: false },
];

export const BOARD_COLUMN_OPTION_ICONS = {
  COMPRESS: faCompress,
  EXPAND: faExpand,
  ADD_ENTRY: faPlus,
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
    icon: faList,
  },
  COMFORTABLE: {
    name: "Comfortable",
    icon: faThList,
  },
};

export const TABLE_COLUMNS = {
  IS_STARRED: { name: "Star", property: "isStarred", isDate: false },
  COLOR: { name: "Color", property: "color", isDate: false },
  COMPANY: { name: "Company", property: "company", isDate: false },
  JOB_TITLE: { name: "Job Title", property: "jobTitle", isDate: false },
  STATUS: { name: "Status", property: "statusId", isDate: false },
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
