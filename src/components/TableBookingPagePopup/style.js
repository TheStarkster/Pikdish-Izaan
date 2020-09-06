import { StyleSheet } from 'react-native'

import colors from '../../config/colors'
import constants from '../../config/constants'

export default StyleSheet.create({
    popupContainer: {
        backgroundColor: colors.OVERLAY_COLOR,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    popupMiniContainer: {
        backgroundColor: colors.WHITE,
        width: constants.WINDOW_WIDTH * 0.80,
        marginBottom: constants.MARGIN_LARGE * 4,
        // paddingHorizontal: constants.PADDING_SMALL
        borderRadius: 10
    },
    closeIconContainer: {
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    closeIcon: {
        alignItems: 'flex-end',
        padding: constants.PADDING_SMALL,
    },
    buttonContainer: {
        paddingBottom: constants.PADDING_MEDIUM * 2.6,
        paddingTop: constants.PADDING_MEDIUM * 1.2,
        alignItems: 'center'

    },
    button: {
        width: '90%'
    }
})