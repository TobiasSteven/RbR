import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet, 
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import images from '../constants/images';


class SignScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }



  render() {
  return (
    <>
      <ImageBackground source={images.sign} style={styles.container} resizeMode= 'cover'>
          <ImageBackground source={images.signn}  style={styles.header} resizeMode= 'cover'/>
          <View style={styles.footer}>
            <View style={{flex: 0.5,}}>
              <Text style={{color: '#000', fontSize: 17, fontWeight: 'bold', textAlign: 'center',}}>GET ACCESS TO RUNBHOPALAPP</Text>
            </View>
            
            <View style={{alignItems: 'center', flex: 2}}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#FF6400',}]}
                onPress={() => this.props.navigation.navigate('RegistrerScreen')}
              >
                  <Text style={[styles.text, {color: '#fff'}]}>SIGN UP</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('LoginScreen')}
                style={[styles.button, {borderColor: '#FF6400', borderWidth: 1,}]}
              >
                <Text style={[styles.text, {color: '#000'}]}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
      </ImageBackground>
      </>
      );
    }
  }
  
  export default SignScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 0.8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  button: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 10
    // margin: 5
  },
  text: {
    fontSize: 16, 
    fontWeight: 'bold', 
  }
});


