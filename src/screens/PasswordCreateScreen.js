import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    ScrollView
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'


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
      data: this.props.route.params.data,
      security: true
      
    };
  }


  _onSubmit = async () => {
    
    const dta = this.state.data
    dta[0].password = this.state.password
    this.setState({data: dta})
    console.log(this.state.data)
    this.props.navigation.navigate('GenderScreen', {data: this.state.data});
}


  render() {
    
    
    return (
      <>
        {/* <StatusBar backgroundColor={'#21334a'}/> */}
        <ScrollView>
            <View style={{height: Dimensions.get('window').height, padding: 10}}>

                <View style={{flex: 1, justifyContent: 'center',}}>
                    <View>
                        <Text style={{color: '#000', padding: 5, fontSize: 20, fontWeight: 'bold'}}>Enter Password</Text>
                    </View>
                    <View>
                        <Text style={{color: '#999999', padding: 5}}>Enter your password to continue</Text>
                    </View>
                </View>

                <View style={{flex: 1.5, alignItems: 'center', justifyContent: 'space-around'}}>
                  <View style={styles.textInput}>
                      <Fontisto name='locked' size={25} color='#FF6400'/>
                      <TextInput 
                          placeholder='Password' 
                          placeholderTextColor={'#1A1A1A'}
                          style={[styles.container, {color: '#1A1A1A', paddingLeft: 10}]} 
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
                      
                  <TouchableOpacity 
                        style={styles.button} 
                      onPress={this._onSubmit}
                  >
                      
                      <Text style={{color:'white', fontWeight: '600', fontSize: 20}}>Continue</Text>
                  </TouchableOpacity>
                    
                </View>

                <View style={{flex: 1.5,}}/>
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
