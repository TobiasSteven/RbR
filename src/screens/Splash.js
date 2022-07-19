import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import images from '../constants/images';


class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
        
    };
  }

  
  render() {
    
    return (
        <>
          <StatusBar backgroundColor={'#000'}/>
            <View style={styles.container}>
              <Image source={images.splash} style={styles.image} resizeMode= 'cover'/>
            </View> 
            


        </>
      );
  }
}

const styles = StyleSheet.create({
    container: {
    flex:1,
    backgroundColor: '#000'
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Splash;
