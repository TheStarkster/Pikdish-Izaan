import { StyleSheet } from 'react-native'

import constants from '../../../config/constants'
import colors from '../../../config/colors'

export default StyleSheet.create({
    container: {
        paddingHorizontal: constants.PADDING_MEDIUM * 0.5,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemNameHead: {
        fontFamily: 'Nunito-Bold',
        fontSize: constants.FONT_SMALL * 1.2,
        marginBottom: constants.MARGIN_MEDIUM * 1.5
    },
    noOfCancleHead: {
        fontFamily: 'Nunito-Bold',
        fontSize: constants.FONT_SMALL * 1.2
    },
    tableBody: {
        flexDirection: 'row',
        paddingHorizontal: constants.PADDING_SMALL * 1.3,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GREY,
        borderStyle: 'solid',
        paddingBottom: constants.PADDING_SMALL,
        marginVertical: constants.MARGIN_SMALL
    },
    number: {
        borderBottomWidth: 1,
        borderBottomColor: colors.RED,
        borderStyle: 'solid',
        flex: 0.1,
        textAlign: 'right',
        fontFamily: 'Nunito-Regular',
        fontSize: constants.FONT_SMALL
    },
    itemName: {
        flex: 0.9,
        fontFamily: 'Nunito-Regular',
        fontSize: constants.FONT_SMALL
    }
})