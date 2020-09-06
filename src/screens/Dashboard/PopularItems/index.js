import React, { Component } from 'react'
import { Text, View } from 'react-native'
import * as Progress from 'react-native-progress';
import styles from './style'

import constants from '../../../config/constants'
import colors from '../../../config/colors'

function PopularItems() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.miniContainer}>
                        <Text style={styles.text}>Plain Dosa</Text>
                        <Text style={styles.progress}>145</Text>
                    </View>
                    <Progress.Bar
                        progress={0.9}
                        width={constants.WINDOW_WIDTH * 0.90}
                        color={colors.RED}
                        borderColor={colors.LIGHT_GREY}
                        unfilledColor={colors.LIGHT_GREY}
                        height={1.5} />
                </View>
                <View style={styles.container}>
                    <View style={styles.miniContainer}>
                        <Text style={styles.text}>Pink Lady</Text>
                        <Text style={styles.progress}>126</Text>
                    </View>
                    <Progress.Bar
                        progress={0.8}
                        width={constants.WINDOW_WIDTH * 0.90}
                        color={colors.RED}
                        borderColor={colors.LIGHT_GREY}
                        unfilledColor={colors.LIGHT_GREY}
                        height={1.5} />
                </View>
                <View style={styles.container}>
                    <View style={styles.miniContainer}>
                        <Text style={styles.text}>Veg Frenkies</Text>
                        <Text style={styles.progress}>150</Text>
                    </View>
                    <Progress.Bar
                        progress={1}
                        width={constants.WINDOW_WIDTH * 0.90}
                        color={colors.RED}
                        borderColor={colors.LIGHT_GREY}
                        unfilledColor={colors.LIGHT_GREY}
                        height={1.5} />
                </View>
            </View>
        )
}

export default PopularItems