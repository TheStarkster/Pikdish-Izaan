import { StyleSheet } from 'react-native'

import constants from '../../../config/constants'
import colors from '../../../config/colors'

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: constants.MARGIN_SMALL * 1.2
    },
    miniContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width :constants.WINDOW_WIDTH * 0.85,
        marginBottom: constants.MARGIN_SMALL
    },
    text: {
        fontFamily: 'Nunito-Regular',
        fontSize: constants.FONT_SMALL * 1.1,
        color: colors.GREY
    },
    progress: {
        fontFamily: 'Nunito-Regular',
        fontSize: constants.FONT_SMALL * 1.1,
        color: colors.GREY
    }
})