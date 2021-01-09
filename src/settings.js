import {
  PORTFOLIO_DISPLAY,
  BOARD_DENSITY,
  TABLE_DENSITY,
  BOARD_SORT_BY,
} from "./constants";

// Hard-coded for now

export const IS_CARD_COLORS_ON = false;

export const LAST_PORTFOLIO_DISPLAY = PORTFOLIO_DISPLAY.BOARD.name;

export const LAST_BOARD_DENSITY = BOARD_DENSITY.COMPACT.name;

export const LAST_BOARD_SORT = BOARD_SORT_BY.LAST_UPDATE;

export const LAST_BOARD_COLUMN_FILTER = [
  { status: "Rejected", isActive: false, isExpanded: false },
  { status: "Wishlist", isActive: false, isExpanded: false },
  { status: "Applied", isActive: true, isExpanded: false },
  { status: "Phone Screen", isActive: false, isExpanded: false },
  { status: "Interview", isActive: true, isExpanded: false },
  { status: "Offer", isActive: true, isExpanded: false },
];

export const LAST_TABLE_DENSITY = TABLE_DENSITY.COMFORTABLE.name;

export const LAST_TABLE_SORT_PROPERTY = "lastUpdate";

export const LAST_TABLE_IS_SORT_ASCENDING = false;
