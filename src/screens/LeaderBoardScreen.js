import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import images from '../constants/images';
import LottieView from 'lottie-react-native';


class LeaderBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
        
    };
  }

  
  render() {
    
    return (
        <>
          <StatusBar backgroundColor={'#FF6400'}/>
            <View style={styles.container}>
              <LottieView
                  colorFilters={[
                    {
                      keypath: 'button',
                      color: '#F00000',
                    },
                    {
                      keypath: 'Sending Loader',
                      color: '#F00000',
                    },
                  ]}
                  autoPlay
                  loop = {true}
                  source={require('../assets/lotties/no_results.json')}
                  style={{top: -20}}
                />
                <View style={{padding: 4, top: 10}}>

                {/* <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: '#EF7A2E'}}>
                  Congratulation
                </Text> */}
                  
              </View>
            </View> 
            


        </>
      );
  }
}

const styles = StyleSheet.create({
    container: {
    flex:1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default LeaderBoardScreen;
