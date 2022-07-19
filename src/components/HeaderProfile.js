import React from 'react';

import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import images from '../constants/images';



import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';


const HeaderProfile = ({navigation}) => {
    return (
        <View style={styles.containers}>
            <View style={styles.container}>
                <View style={styles.left}>
                    {/* <TouchableOpacity>
                        <Entypo name='menu' size={30} color='#fff'/>
                    </TouchableOpacity> */}
                    <Text style={{color: '#fff', fontSize: 20, paddingLeft: 5,}}>Profile</Text>
                </View>
                <View style={styles.center}>
                    {/* <Image source={images.logo_white} style={{height: '80%', width: '80%'}} resizeMode= 'cover'/> */}
                </View>
                <View style={styles.right}>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                    <Feather name='search' size={23} color='#000'/>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                        <Text style={{color: '#fff', fontSize: 18, paddingLeft: 5,}}>Modify</Text>
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
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', 
    },
    center: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
  });

export default HeaderProfile;