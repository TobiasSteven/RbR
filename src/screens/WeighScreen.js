import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions
} from 'react-native';

import Modal from 'react-native-modal';
import {Url} from '../services/Url'


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'first',
      email: '',
      password: '',
      token: '',
      code: '',
      weight: 0,
      height: 0,
      incorrect_password: false,
      invalid_username: false,
      invalid_email: false,
      empty_username: false,
      empty_password: false,
      isVisible: false,
      data: this.props.route.params.data,
      
    };
  }


  componentDidMount() {
    

    }

    

    _onSubmit = (weight, height) => {
    
      const dta = this.state.data
      dta[0].weight = weight
      dta[0].height = height
      this.setState({data: dta})
      console.log(this.state.data)
      this.props.navigation.navigate('RegistrerInfoScreen', {data: this.state.data});
  }

  render() {
    
    return (
      <>
        {/* <StatusBar backgroundColor={'#21334a'}/> */}
        <View style={{height: Dimensions.get('window').height, backgroundColor: '#fff'}}>

          <View style={{flex: 0.4,}}>
            <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>2/2</Text>
            </View>
            <View style={{flex: 0.6, alignItems: 'center'}}>
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 18}}>HOW MUCH DO YOU WEIGH?</Text>
              <Text style={{color: '#999999',}}>To personalize your fitness goal</Text>
            </View>
          </View>

          <View style={{flex: 1,}}>

              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <View style={styles.textInput}>
                    <TextInput 
                        placeholderTextColor={'#1A1A1A'}
                        keyboardType = 'numeric'
                        style={[styles.container, {color: '#1A1A1A', fontWeight: 'bold'}]} 
                        value={this.state.weight}
                        onChangeText={(text) => {
                        this.setState({
                          weight: text,
                        });
                        }}
                    />
                </View>
                <View style={styles.selectView}>
                  <Text style={{color: '#000', fontWeight: 'bold', fontSize: 18}}>kg</Text>
                </View>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{color: '#000', fontWeight: 'bold', fontSize: 18}}>HOW TALL ARE YOU?</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <View style={styles.textInput}>
                    <TextInput 
                        placeholderTextColor={'#1A1A1A'}
                        keyboardType = 'numeric'
                        style={[styles.container, {color: '#1A1A1A', fontWeight: 'bold'}]} 
                        value={this.state.height}
                        onChangeText={(text) => {
                        this.setState({
                            height: text,
                        });
                        }}
                    />
                </View>
                <View style={styles.selectView}>
                  <Text style={{color: '#000', fontWeight: 'bold', fontSize: 18}}>cm</Text>
                </View>
              </View>

          </View>


          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => {this._onSubmit(this.state.weight, this.state.height)}}
            >
                
                <Text style={{color:'white', fontWeight: '600', fontSize: 20}}>NEXT</Text>
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
    button: {
        borderRadius: 30,
        width: '95%',
        height: 50,
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
    },
    textInput: {
      
        borderRadius: 15,
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 15,
        backgroundColor: '#F6F6F6',
        margin: 5
    
    },
    selectView: {
      
        borderRadius: 15,
        width: '25%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 15,
        backgroundColor: '#F6F6F6',
    
    },
});

  
  export default LoginScreen
