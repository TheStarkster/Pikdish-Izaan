import React from 'react'
import { Text, View, Image } from 'react-native'

import styles from './style'
import GeneralStyles from '../../GeneralStyle'

function Stats() {
    return (
        <View style={[styles.statsMainContainer, GeneralStyles.container]}>
            <View style={styles.statsBox}>
                <View style={styles.miniContainer}>
                    <Text style={styles.number}>10</Text>
                    <Text style={styles.text}>CATEGORIES</Text>
                </View>
                <Image
                    source={require('../../../assets/icon/credit-card.png')}
                    style={styles.img}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.statsBox}>
                <View style={styles.miniContainer}>
                    <Text style={styles.number}>10</Text>
                    <Text style={styles.text}>CATEGORIES</Text>
                </View>
                <Image
                    source={require('../../../assets/icon/credit-card.png')}
                    style={styles.img}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.statsBox}>
                <View style={styles.miniContainer}>
                    <Text style={styles.number}>10</Text>
                    <Text style={styles.text}>CATEGORIES</Text>
                </View>
                <Image
                    source={require('../../../assets/icon/credit-card.png')}
                    style={styles.img}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.statsBox}>
                <View style={styles.miniContainer}>
                    <Text style={styles.number}>10</Text>
                    <Text style={styles.text}>TOTAL COLLECTION</Text>
                </View>
                <Image
                    source={require('../../../assets/icon/credit-card.png')}
                    style={styles.img}
                    resizeMode='cover'
                />
            </View> 
        </View>
    )
}

export default Stats
