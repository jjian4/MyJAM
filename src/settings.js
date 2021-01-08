import {
  PORTFOLIO_DISPLAY,
  BOARD_DENSITY,
  TABLE_DENSITY,
  BOARD_SORT_BY,
} from "./constants";

// Hard-coded for now

export const IS_CARD_COLORS_ON = true;

export const LAST_PORTFOLIO_DISPLAY = PORTFOLIO_DISPLAY.TABLE.name;

export const LAST_BOARD_DENSITY = BOARD_DENSITY.COMPACT.name;

export const LAST_BOARD_SORT = BOARD_SORT_BY.LAST_UPDATE;

export const LAST_BOARD_COLUMN_FILTER = [
  { status: "Applied", isExpanded: false },
  { status: "Interview", isExpanded: false },
  { status: "Offer", isExpanded: false },
];

export const LAST_TABLE_DENSITY = TABLE_DENSITY.COMFORTABLE.name;

export const LAST_TABLE_SORT_PROPERTY = "lastUpdate";

export const LAST_TABLE_IS_SORT_ASCENDING = false;
