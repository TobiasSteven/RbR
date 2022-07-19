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
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';
import OTPInputView from '@twotalltotems/react-native-otp-input'

import images from '../constants/images';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUser, user_is_auth, is_checked, phoneNumberOtp} from '../store/actions/customAction';
import {Url} from '../services/Url'



class RegistrerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      phoneNumber: '',
      confirm: null,
      is_checked: false,
      code: '',
      data: []
      
    };
  }


  _onLogin = async () => {

    if (this.state.phoneNumber != '') {

      const confirmation = await auth().signInWithPhoneNumber(this.state.phoneNumber);
      console.log("confirmation", confirmation)
      if(confirmation){
          this.setState({confirm: confirmation});
          this.setState({is_checked: true});
          // this.props.is_checked(true);
          // this.props.navigation.navigate('Otp',{mobile : confirmation})
          
      }
    }
    // else if (phoneNumber.length != 10) {
    //   this.setState({errMobileNumber: 'Please enter valid mobile number'});
    // }
  else {

      alert('Please enter mobile number')

  }
     
    
}

  _onSubmit = async () => {
    console.log("route", this.state.confirm)
    console.log("phoneNumber", this.state.phoneNumber)
  try {
     let data = await this.state.confirm.confirm(this.state.code);
     console.log('YYYYYYYYYYYYYYYYYYYYYYYYY');
     console.log("data", data);
     this.setState({data: [{'phone': this.state.phoneNumber}]})
     this.props.navigation.navigate('PasswordCreateScreen', {data: this.state.data});
    //  this.props.is_checked(false);
     this.setState({is_checked: false});
  } catch (error) {
  console.log('Invalid code.');
  ToastAndroid.show('Invalid code.',ToastAndroid.SHORT)
  }
}


  render() {
    
    return (
      
      <>
        {/* <StatusBar backgroundColor={'#21334a'}/> */}
        {this.state.is_checked === false ? 
          (
            <>
              <ScrollView>
                  <View style={{height: Dimensions.get('window').height,}}>

                      <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                          <View style={{ width: 80, height: 80, borderRadius: 80 / 2, overflow: "hidden", borderWidth: 0.1,}}>
                              <Image source={images.logo} style={{height: '100%', width: '100%', borderRadius: 40,}}/>
                          </View>
                          <View>
                              <Text style={{color: '#000'}}>My Number is</Text>
                          </View>
                      </View>

                      <View style={{flex: 1.5, padding: 10}}>
                          <View style={styles.phoneContainer}>
                            <PhoneInput
                              ref={null}
                              defaultValue={this.state.phoneNumber}
                              defaultCode="IN"
                              layout="first"
                              autoFocus
                              containerStyle={styles.phoneNumberView}
                              textContainerStyle={{ paddingVertical: 0 }}
                              onChangeFormattedText={text => {
                                this.setState({
                                  phoneNumber: text,
                              });
                              }}
                              // onChangeFormattedText={text => {this.props.phoneNumber(text)}}
                            />
                          </View>
                          <View style={{flex: 1,}}>
                              <Text style={{color: '#1A1A1A',}}>Press 'Continue ' to receive a code from Run Bhopal Run with which you will confirm your number.</Text>
                              <Text style={{paddingTop: 10, color: '#1A1A1A',}}> Please note that telephone numbers in .. have 10 digits and not 9.</Text>
                          </View>
                      </View>

                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                          <TouchableOpacity 
                              style={styles.button} 
                              onPress={this._onLogin}
                          >
                              
                              <Text style={{color:'white', fontWeight: '600', fontSize: 20}}>Continue</Text>
                          </TouchableOpacity>
                          <View style={{ flex: 0.3, padding: 10, flexDirection: 'row', justifyContent:'space-between', }}>

                              <Text style={{color: '#1A1A1A',}}>Already have an account?</Text>
                              {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('RegistrerScreen')}> */}
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                                  <Text style={{color: '#FF6400', fontWeight: 'bold', paddingLeft: 5, textDecorationLine: 'underline',}}>Login</Text>
                              </TouchableOpacity>

                          </View>
                      </View>
                  </View>
              </ScrollView>
            </>
          ):(
            <>
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
                              <Text style={{color: '#999999', padding: 5}}>{this.state.phoneNumber}</Text>
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
                              <TouchableOpacity onPress={this._onLogin}>
                                  <Text style={{color: '#FF6400', fontWeight: 'bold', paddingLeft: 5, textDecorationLine: 'underline',}}>resend</Text>
                              </TouchableOpacity>

                          </View>

                          <TouchableOpacity 
                              style={styles.button} 
                              onPress={this._onSubmit}
                          >
                              
                              <Text style={{color:'white', fontWeight: '600', fontSize: 20}}>Continue</Text>
                          </TouchableOpacity>
                      </View>

                      <View style={{flex: 1.5, justifyContent: 'center', alignItems: 'center'}}>
                          
                      </View>
                  </View>
              </ScrollView>
            </>
          )}
        
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
    },
    phoneContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 80,
      flex: 1,
    },
    phoneNumberView: {
      width: '100%',
      height: 50,
      backgroundColor: 'white',
      borderRadius: 10,
      borderBottomWidth: 1
    },
});

const mapStateToProps = state => {
    console.log(state.rbr)
    return {
        user: state.rbr.user, 
        user_is_auth: state.rbr.user_is_auth,
        is_checked: state.rbr.is_checked,
        phoneNumberOtp: state.rbr.phoneNumberOtp,
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUser,user_is_auth, is_checked, phoneNumberOtp}, dispatch)
  };
  
export default connect(mapStateToProps,mapDispatchToProps) (RegistrerScreen)

