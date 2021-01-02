import { faColumns, faList, faTh, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const STATUS = {
    REJECTED: 'Rejected',
    WISHLIST: 'Wishlist',
    APPLIED: 'Applied',
    PHONE_SCREEN: 'Phone Screen',
    INTERVIEW: 'Interview',
    OFFER: 'Offer!'
}

export const PORTFOLIO_DISPLAY = {
    BOARD_1: {
        name: 'Board 1',
        icon: <FontAwesomeIcon icon={faColumns} />
    },
    BOARD_2: {
        name: 'Board 2',
        icon: <FontAwesomeIcon icon={faColumns} rotation={270} />
    },
    TABLE: {
        name: 'Table',
        icon: <FontAwesomeIcon icon={faList} />
    }
}

export const PORTFOLIO_DENSITY = {
    COMPACT: {
        name: 'Compact',
        icon: <FontAwesomeIcon icon={faTh} />
    },
    DETAILED: {
        name: 'Detailed',
        icon: <FontAwesomeIcon icon={faThLarge} />
    },
}

export const CARD_COLORS = [
    //red
    'indianred',
    'crimson',
    'firebrick',
    'maroon',

    //pink
    'orchid',
    'palevioletred',
    'lightcoral',

    //orange
    'salmon',
    'coral',
    'orangered',

    //brown
    'sandybrown',
    'darksalmon',
    'peru',
    'chocolate',
    'sienna',
    'brown',

    //green
    'darkkhaki',
    'olive',
    'mediumseagreen',
    'seagreen',
    'forestgreen',
    'darkolivegreen',
    'darkgreen',
    'darkslategray',

    //blue
    'lightseagreen',
    'cadetblue',
    'darkcyan',
    'steelblue',
    'navy',

    //violet
    'mediumorchid',
    'mediumvioletred',
    'slateblue',
    'darkorchid',
    'darkmagenta',
    'indigo',

    //gray
    'slategray'
]