import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';

class SucessSplash extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: this.props.route.params.data,
      
    };
  }
  render() {
    console.log(this.state.data)
    return (
      <>
          {/* <StatusBar backgroundColor={'#21334a'}/> */}
          <View  style={{flex: 1, backgroundColor: '#fff'}}>
                
                <View style={{ flex: 1, justifyContent:'center', alignItems: 'center', padding: 5}}>
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
                  source={require('../assets/lotties/success.json')}
                  style={{top: -20}}
                />
                    <View style={{padding: 4, top: 100}}>

                      <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: '#EF7A2E'}}>
                        Congratulation
                      </Text>
                        
                    </View>
                </View>
                
                <View style={{ flex: 0.15, alignItems:'flex-end', justifyContent: 'center'}}>
                    <TouchableOpacity 
                      style={styles.button} 
                      onPress={() =>  
                        {
                        this.props.navigation.navigate(`${this.state.data}`)}
                        }
                      >
                        
                        <Text style={{color:'white', fontWeight: '600', fontSize: 18}}>Continue</Text>
                    </TouchableOpacity>
                </View>

              </View>





      </>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      textInput: {
        borderWidth: 1,
        borderRadius: 30,
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 15,
        
      },
      button: {
        borderRadius: 20,
        width: '40%',
        height: 40,
        marginRight: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FF6400',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
      }
});

export default SucessSplash
