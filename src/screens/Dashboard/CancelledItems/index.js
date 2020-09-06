import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './style'

import GeneralStyles from '../../GeneralStyle'

function CancelledItems() {
        return (
            <View style={styles.container}>
                <View style={styles.tableHeader}>
                    <Text style={styles.itemNameHead}>Items Name</Text>
                    <Text style={styles.noOfCancleHead}>No. of Cancle</Text>
                </View>
                <View style={styles.tableBody}>
                    <Text style={styles.itemName}>Coffee</Text>
                    <Text style={styles.number}>44</Text>
                </View>
                <View style={styles.tableBody}>
                    <Text style={styles.itemName}>Coffee</Text>
                    <Text style={styles.number}>44</Text>
                </View>
                <View style={styles.tableBody}>
                    <Text style={styles.itemName}>Coffee</Text>
                    <Text style={styles.number}>44</Text>
                </View>
                <View style={styles.tableBody}>
                    <Text style={styles.itemName}>Coffee</Text>
                    <Text style={styles.number}>44</Text>
                </View>
            </View>
        )
}

export default CancelledItems