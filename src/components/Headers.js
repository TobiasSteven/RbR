import React from 'react';

import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import images from '../constants/images';



import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';


const Headers = ({navigation}) => {
    return (
        <View style={styles.containers}>
            <View style={styles.container}>
                <View style={styles.left}>
                    <TouchableOpacity>
                        <Entypo name='menu' size={30} color='#fff'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.center}>
                    {/* <Image source={images.logo_white} style={{height: '80%', width: '80%'}} resizeMode= 'cover'/> */}
                </View>
                <View style={styles.right}>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                    <Feather name='search' size={23} color='#000'/>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
                        <Icon name='notifications' size={30} color='#fff'/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    containers: {
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EF7A2E'
    },
    left: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
  });

export default Headers;