import { StyleSheet } from 'react-native'

import colors from '../../config/colors'
import constants from '../../config/constants'

export default StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: constants.PADDING_VERTICAL_MEDIUM * 0.60,
    },
    checkboxCircle: {
        borderRadius : 100,
        padding: constants.PADDING_X_SMALL * 0.50,
        color: 'white',
    },
    checkboxValue: {
        marginLeft: constants.MARGIN_SMALL,
        fontFamily: 'Nunito-Regular',
        fontSize: constants.FONT_SMALL
    },
    selectedBox: {
        backgroundColor: colors.RED,
    },
    unSelectedBox: {
        backgroundColor: colors.LIGHT_BLACK,
    },
    checkboxAmount: {
        color: colors.GREY,
        marginLeft: constants.MARGIN_SMALL,
        fontFamily: 'Nunito-Regular',
        fontSize: constants.FONT_SMALL,
    }
})