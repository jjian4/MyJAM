import {
  PORTFOLIO_DISPLAY,
  BOARD_DENSITY,
  TABLE_DENSITY,
  BOARD_SORT_BY,
} from "./constants";

// Hard-coded for now

export const LAST_PORTFOLIO_DISPLAY = PORTFOLIO_DISPLAY.TABLE.name;

// Dashboard
export const IS_CARD_COLORS_ON = true;
export const LAST_BOARD_DENSITY = BOARD_DENSITY.COMPACT.name;
export const LAST_BOARD_COLUMN_FILTER = [
  { status: "Rejected", isActive: false, isExpanded: false },
  { status: "Wishlist", isActive: false, isExpanded: false },
  { status: "Applied", isActive: true, isExpanded: false },
  { status: "Phone Screen", isActive: false, isExpanded: false },
  { status: "Interview", isActive: true, isExpanded: false },
  { status: "Offer", isActive: true, isExpanded: false },
];
export const LAST_BOARD_SORT = BOARD_SORT_BY.LAST_UPDATE;

// Table
export const LAST_TABLE_DENSITY = TABLE_DENSITY.COMFORTABLE.name;
export const LAST_TABLE_COLUMN_FILTER = [
  {
    name: "Date Created",
    property: "dateCreated",
    isDate: true,
    isActive: false,
  },
  {
    name: "Application Date",
    property: "applyDate",
    isDate: true,
    isActive: true,
  },
  { name: "Color", property: "color", isActive: false },
  { name: "Company", property: "company", isActive: true },
  { name: "Job Title", property: "jobTitle", isActive: true },
  { name: "Status", property: "status", isActive: true },
  { name: "Notes", property: "notes", isActive: false },
  {
    name: "Interview/Deadline",
    property: "deadlineDate",
    isDate: true,
    isActive: true,
  },
  {
    name: "Last Update",
    property: "lastUpdate",
    isDate: true,
    isActive: false,
  },
];
export const LAST_TABLE_SORT_PROPERTY = "company";
export const LAST_TABLE_IS_SORT_ASCENDING = true;
