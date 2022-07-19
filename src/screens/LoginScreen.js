import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PhoneInput from 'react-native-phone-number-input';
import Modal from 'react-native-modal';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUser, user_is_auth, getPass} from '../store/actions/customAction';
import {Url} from '../services/Url'


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'first',
      email: '',
      password: '',
    //   email: '+2250153413918',
    //   password: '12345',
      token: '',
      incorrect_password: false,
      invalid_username: false,
      invalid_email: false,
      empty_username: false,
      empty_password: false,
      security: true,
      isModal: false,
      email_reset: '',
      load: false,
    };
  }


  _signIn = async () => {
    
    this.setState({load: true})

    var config = {
        method: 'post',
        url: `${Url}/runner/login`,
        headers: {
          "Content-Type": "application/json"
         },
        data : JSON.stringify({
          params: {
            'login': this.state.email,
            'password': this.state.password,
            // db: 'RBR012022',
          },
        }),
      };
  
      console.log(config)
      let response = await axios(config);
      console.log('Connexion' + response.data)
    
    if (response.data.result.result.phone == this.state.email) {
      
      console.log('Login validate');
      this.props.getUser(response.data);
      this.props.getPass(this.state.password);
      this.props.user_is_auth(true);
      this.setState({load: false})
    //   alert('Connexion Réussis');

    } else {
      alert('Incorrect Number or Password !!!');
      this.setState({load: false})
    }

  };


  _resetPassword = async () => {

    var config = {
        method: 'post',
        url: `${Url}/runner/reset/password`,
        headers: {
          "Content-Type": "application/json"
         },
        data : JSON.stringify({
          params: {
            'email': this.state.email_reset,
            // db: 'RBR012022',
          },
        }),
      };
  
      console.log(config)
      let response = await axios(config);
      console.log('Reset' + response.data.result.result)
    
    if (response.data.result.result == null) {
      
      console.log('Email validate');
      this.setState({ isModal: false});
      alert('Go Check Your Mailbox');

    } else {
        this.setState({ isModal: false});
        alert('Invalid Email !!!');
    }

  };

  render() {
    
    return (
      <>
        <StatusBar backgroundColor={'#21334a'}/>
        <ScrollView>
            <View  style={{height: Dimensions.get('window').height, backgroundColor: '#fff'}}>
                <View style={{ flex: 0.4, justifyContent:'center', padding: 5, backgroundColor: '#FF6400'}}>
                    
                    <View style={{padding: 4}}>
                        <Text style={{ fontSize: 35, color: '#fff', fontWeight: 'bold',}}>
                            LOGIN
                        </Text>
                        <View style={{borderWidth: 1, width: '15%', borderColor: '#fff'}}/>
                    </View>
                    
                </View>

                <View style={{ flex: 1, padding: 5}}>

                    <View style={{  padding: 5, flex: 0.73,justifyContent: 'space-around', alignItems: 'center'}}>
                        <View style={styles.textInput}>
                            {/* <TextInput 
                                placeholder='Number' 
                                placeholderTextColor={'#1A1A1A'}
                                style={[styles.container, {color: '#1A1A1A'}]} 
                                value={this.state.email}
                                onChangeText={(text) => {
                                this.setState({
                                    email: text,
                                });
                                }}
                            /> */}
                            <PhoneInput
                              ref={null}
                              defaultValue={this.state.email}
                              defaultCode="IN"
                              layout="first"
                              autoFocus
                              containerStyle={styles.phoneNumberView}
                              textContainerStyle={{ paddingVertical: 0 }}
                              onChangeFormattedText={text => {
                                this.setState({
                                    email: text,
                              });
                              }}
                              // onChangeFormattedText={text => {this.props.phoneNumber(text)}}
                            />
                        </View>

                        <View style={styles.textInput}>
                            <TextInput 
                                placeholder='Password' 
                                placeholderTextColor={'#1A1A1A'}
                                style={[styles.container, {color: '#1A1A1A'}]} 
                                secureTextEntry={this.state.security}
                                value={this.state.password}
                                onChangeText={(text) => {
                                this.setState({
                                    password: text,
                                });
                                }}
                            />

                            { this.state.security === true ? 
                                (
                                    <TouchableOpacity onPress={() => this.setState({ security: false })}>
                                        <FontAwesome5 name='eye-slash' size={20} color='#1A1A1A'/>
                                    </TouchableOpacity>
                                ) : 
                                (
                                    <TouchableOpacity onPress={() => this.setState({ security: true })}>
                                        <FontAwesome5 name='eye' size={20} color='#1A1A1A'/>
                                    </TouchableOpacity>
                                )
                            }
                            

                        </View>

                        <View style={{width: '100%', alignItems:'center', }}>

                            {/* {this.state.incorrect_password ? 
                                (
                                    <View style={{width: '100%', alignItems:'center', flexDirection: 'row',padding: 5, justifyContent: 'center'}}>
                                        <AntDesign  name='closecircleo' color='red' size={18} />
                                        <Text style={{color: 'red', paddingLeft: 5}}>Le mot de passe que vous avez saisi pour l’adresse e-mail est incorrect.</Text>
                                    </View>
                                )    : (
                                    <></>
                                )
                            
                            } 
                            {this.state.invalid_username ? 
                                (
                                    <View style={{width: '100%', alignItems:'center', flexDirection: 'row',padding: 5, justifyContent: 'center'}}>
                                        <AntDesign  name='closecircleo' color='red' size={18} />
                                        <Text style={{color: 'red', paddingLeft: 5}}>L’identifiant n’est pas inscrit. Si vous n’êtes pas sûr·e de votre identifiant, essayez plutôt votre adresse e-mail.</Text>
                                    </View>
                                )    : (
                                    <></>
                                )
                            
                            } 
                            {this.state.invalid_email ? 
                                (
                                    <View style={{width: '100%', alignItems:'center', flexDirection: 'row',padding: 5, justifyContent: 'center'}}>
                                        <AntDesign  name='closecircleo' color='red' size={18} />
                                        <Text style={{color: 'red', paddingLeft: 5}}>Adresse e-mail inconnue. Vérifiez l’orthographe ou essayez avec votre identifiant.</Text>
                                    </View>
                                )    : (
                                    <></>
                                )
                            
                            } 
                            {this.state.empty_username ? 
                                (
                                    <View style={{width: '100%', alignItems:'center', flexDirection: 'row',padding: 5, justifyContent: 'center'}}>
                                        <AntDesign  name='closecircleo' color='red' size={18} />
                                        <Text style={{color: 'red', paddingLeft: 5}}>Le champ de l'adresse mail est vide.</Text>
                                    </View>
                                )    : (
                                    <></>
                                )
                            
                            } 
                            {this.state.empty_password ? 
                                (
                                    <View style={{width: '100%', alignItems:'center', flexDirection: 'row',padding: 5, justifyContent: 'center'}}>
                                        <AntDesign  name='closecircleo' color='red' size={18} />
                                        <Text style={{color: 'red', paddingLeft: 5}}>Le champ du mot de passe est vide.</Text>
                                    </View>
                                )    : (
                                    <></>
                                )
                            
                            }  */}
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '98%', alignItems:'center', }}>
                                <View style={{flexDirection: 'row', alignItems:'center'}}>
                                <RadioButton
                                    value="first"
                                    status={ this.state.checked === 'first' ? 'checked' : 'unchecked' }
                                    
                                />
                                    <Text style={{color: '#1A1A1A'}}>Remember me</Text>
                                </View>
                                <TouchableOpacity
                                    // onPress={() => this.props.navigation.navigate('ResetPassScreen')}
                                    onPress={() => this.setState({ isModal: true})}
                                >
                                    <Text style={{ paddingRight: 5,fontWeight: '700', color: '#FF6400',}}>Forgot Password</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    </View>
                    
                    
                    <View style={{ flex: 0.16, alignItems:'center'}}>
                        
                        {this.state.load === false ? (
                          <TouchableOpacity 
                                style={styles.button} 
                                onPress={this._signIn}
                            >
                                
                                <Text style={{color:'white', fontWeight: '600', fontSize: 20}}>Login</Text>
                            </TouchableOpacity>
                        ) : (
                          <ActivityIndicator size="large" color="#FF6400" animating={this.state.load} style={{paddingTop: 10}} />
                        )
                        }
                    </View>
                    
                    <View style={{ flex: 0.3, padding: 10, flexDirection: 'row', justifyContent:'space-between', }}>

                        <Text style={{color: '#1A1A1A',}}>Need an account ?</Text>
                        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('RegistrerScreen')}> */}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('RegistrerScreen')}>
                            <Text style={{color: '#FF6400', fontWeight: 'bold', paddingLeft: 5, textDecorationLine: 'underline',}}>Sign Up</Text>
                        </TouchableOpacity>

                    </View>

                </View>


            </View>

        </ScrollView>

        <Modal
            onBackdropPress={() => this.setState({ isModal: false})}
            onSwipeComplete={() => this.setState({ isModal: false})}
            testID={'modal'}
            isVisible={this.state.isModal}
            // swipeDirection={['down']}
            deviceWidth= {Dimensions.get("window").width}
            // style={{ margin: 0, top: '30%'}}
            >

            <View style={{ height: 290, backgroundColor: '#fff', padding: 20, borderRadius: 10}}>

            <View style={{height: 50, justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>Reset your Password</Text>
            </View>
            
            <View style={{height: 120, justifyContent: 'center', alignItems: 'center',}}>
                <View style={[styles.textInput, {borderWidth: 1}]}>
                    <TextInput 
                        placeholder='Enter your e-mail address' 
                        placeholderTextColor={'#1A1A1A'}
                        keyboardType= 'email-address'
                        style={[styles.container, {color: '#1A1A1A'}]} 
                        value={this.state.email_reset}
                        onChangeText={(text) => {
                        this.setState({
                            email_reset: text,
                        });
                        }}
                    />

                </View>
            </View>

            <View style={{height: 55,}}>
                <TouchableOpacity style={styles.button} onPress={this._resetPassword}>
                    <Text style={{color:'white', fontWeight: '600', fontSize: 20, textAlign: 'center',}}>RESET</Text>
                </TouchableOpacity>
            </View>
            
            </View>

        </Modal>

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
        flex: 1,
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
    phoneNumberView: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        // borderRadius: 10,
        // borderBottomWidth: 1
      },
});

const mapStateToProps = state => {
    console.log('Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeessssssssssssssssssssttttttttttttttt' + state.rbr.user)
    return {
        user: state.rbr.user, 
        user_is_auth: state.rbr.user_is_auth,
        get_password: state.rbr.password,
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUser, user_is_auth, getPass}, dispatch)
  };
  
  export default connect(mapStateToProps,mapDispatchToProps) (LoginScreen)
