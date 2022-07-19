import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar
} from 'react-native';
import images from '../constants/images';
// import TestSvg from './src/assets/svg/divider.svg'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUser,} from '../store/actions/customAction'


class Splash1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
        
    };
  }

  // componentDidCatch() {
  //   this.props.getUser([])
  // }
  
  render() {
    
    return (
        <>
          {/* <StatusBar backgroundColor={'#21334a'}/> */}
          <View style={styles.container}>

            <View style={{flex: 2}}>
              <Image source={images.splash1} style={{height: '100%', width: '100%'}} resizeMode='cover'/>
            </View>

            <View style={{flex: 1,}}>
              <View style={{flex: 1.5, justifyContent: 'center', alignItems: 'center',}}>

                <View style={{flex: 0.6, flexDirection: 'row', width: '20%', justifyContent: 'space-between'}}>
                  <FontAwesome name='circle' size={15} color= '#FF6400'/>
                  <FontAwesome name='circle-thin' size={15} color='#000'/>
                  <FontAwesome name='circle-thin' size={15} color='#000'/>
                </View>
                <View style={{flex: 0.6,}}>
                  <Text style={{fontWeight: 'bold', color: '#000', fontSize: 18}}>SET GOALS</Text>
                </View>
                <View style={{flex: 1,}}>
                  <Text style={{fontWeight: 'bold', color: '#000', fontSize: 13}}>Your all in one Activity Tracker</Text>
                </View>

              </View>

              <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 30}}>

                <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('Splash2'), this.props.getUser([])}}>
                  <Text style= {{fontSize: 20, color: '#FFFF', paddingRight: 5}}>Next</Text>
                  <AntDesign name='arrowright' size={20} color= '#FFFF'/>
                </TouchableOpacity>

              </View>
            </View>

          </View>
  
  
  
        </>
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#FFFF'
      },
      button: {
        borderRadius: 30, 
        height: '60%', 
        width: '30%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#FF6400', 
        flexDirection: 'row'
      }
});

const mapStateToProps = state => {
    console.log('Splash Screen 1')
    console.log(state.rbr.user)
    return {
        user: state.rbr.user,
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUser,}, dispatch)
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(Splash1)
  
