import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    ToastAndroid,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    ScrollView
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import OTPInputView from '@twotalltotems/react-native-otp-input'

import images from '../constants/images';
import Phone from '../test';



class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'first',
      email: '',
      password: '',
      token: '',
      code: '',
      incorrect_password: false,
      invalid_username: false,
      invalid_email: false,
      empty_username: false,
      empty_password: false,
      
    };
  }


  componentDidMount() {
    

    }


  render() {
    
    return (
      <>
        {/* <StatusBar backgroundColor={'#21334a'}/> */}
        <ScrollView>
            <View style={{height: Dimensions.get('window').height,}}>

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View>
                        <Text style={{color: '#000', padding: 5, fontSize: 18}}>Verify phone number</Text>
                    </View>
                    <View>
                        <Text style={{color: '#999999', padding: 5}}>Enter the 6-Digit code sent to you at</Text>
                    </View>
                    <View>
                        <Text style={{color: '#999999', padding: 5}}>+229 65 98 67 00</Text>
                    </View>
                </View>

                <View style={{flex: 1.5, alignItems: 'center', padding: 5}}>
                     <OTPInputView
                        style={{width: '90%', height: 50, flex: 0.5,}}
                        pinCount={6}
                            //code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        onCodeChanged = {code => { this.setState({code})}}
                        autoFocusOnLoad
                        codeInputFieldStyle={{
                            width: 45,
                            //height: 45,
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            color: '#000',
                        }}
                        codeInputHighlightStyle={{
                            borderColor: '#000',
                        }}
                        // code={this.state.code}
                        onCodeFilled={(code) => {
                        console.log(`Code is ${code}, you are good to go!`);
                        }}
                        // placeholderCharacter={'*'}
                        // placeholderTextColor={'red'}
                            //selectionColor={"#03DAC6"}
                    />
                    <View style={{ flex: 0.3, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <Text style={{color: '#1A1A1A',}}>Did not receive the code ?</Text>
                        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('RegistrerScreen')}> */}
                        <TouchableOpacity onPress={() => alert('RegistrerScreen')}>
                            <Text style={{color: '#FF6400', fontWeight: 'bold', paddingLeft: 5, textDecorationLine: 'underline',}}>resend</Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => {
                            alert('test');
                            }}
                    >
                        
                        <Text style={{color:'white', fontWeight: '600', fontSize: 20}}>Continue</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 1.5, justifyContent: 'center', alignItems: 'center'}}>
                    
                </View>
            </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    textInput: {
        borderBottomWidth: 1,
        borderRadius: 15,
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 15,
    
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
    }
});

  
  export default LoginScreen
