import { PORTFOLIO_DISPLAY, PORTFOLIO_DENSITY, STATUS } from "./constants";

// Hard-coded for now

export const LAST_PORTFOLIO_DISPLAY = PORTFOLIO_DISPLAY.BOARD.name;

export const LAST_PORTFOLIO_DENSITY = PORTFOLIO_DENSITY.COMPACT.name;

export const LAST_FILTER_SETTINGS = {
  [STATUS.APPLIED]: { isActive: true, isExpanded: false },
  [STATUS.INTERVIEW]: { isActive: true, isExpanded: false },
  [STATUS.OFFER]: { isActive: true, isExpanded: false },
};

export const IS_CARD_COLORS_ON = true;
