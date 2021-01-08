import {
  PORTFOLIO_DISPLAY,
  BOARD_DENSITY,
  STATUS,
  TABLE_DENSITY,
  BOARD_SORT_BY,
} from "./constants";

// Hard-coded for now

export const IS_CARD_COLORS_ON = true;

export const LAST_PORTFOLIO_DISPLAY = PORTFOLIO_DISPLAY.TABLE.name;

export const LAST_BOARD_DENSITY = BOARD_DENSITY.COMPACT.name;

export const LAST_BOARD_SORT = BOARD_SORT_BY.LAST_UPDATE;

export const LAST_BOARD_COLUMN_FILTER = {
  [STATUS.APPLIED]: { isActive: true, isExpanded: false },
  [STATUS.INTERVIEW]: { isActive: true, isExpanded: false },
  [STATUS.OFFER]: { isActive: true, isExpanded: false },
};

export const LAST_TABLE_DENSITY = TABLE_DENSITY.COMFORTABLE.name;

export const LAST_TABLE_SORT_PROPERTY = "lastUpdate";

export const LAST_TABLE_IS_SORT_ASCENDING = false;
