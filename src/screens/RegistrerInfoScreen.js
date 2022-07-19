import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    ScrollView
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from 'react-native-select-dropdown';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import {getUser, user_is_auth, } from '../store/actions/customAction';
import {Url} from '../services/Url'


const formatDate = (date) => {
  return `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()}`;
};


class RegistrerInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'male',
      email: '',
      name: '',
      password: '',
      country: 'CI',
      // date: '',
      height: '',
      weight: '',
      title: '',
      data: this.props.route.params.data,
      tshirtsize_title: '',
      tshirtsize: ['l', 'xl', 'xxl', 'xxxl'],
      blood_group: [ "a-", "a+", "b-", "b+", "o-", "o+", "ab-", "ab+",],
    //   email: '+2250584592867',
    //   password: '123456',
      token: '',
      incorrect_password: false,
      invalid_username: false,
      invalid_email: false,
      empty_username: false,
      empty_password: false,
      date: new Date(),
      time: new Date(),
      mode: 'date',
      show: false,

      
    };
  }


  _signUp = async () => {

    var config = {
        method: 'post',
        url: `${Url}/runner/register`,
        headers: {
          "Content-Type": "application/json"
         },
        data : JSON.stringify({
          params: {
            'login': this.state.data[0].phone,
            'password': this.state.data[0].password,
            'name': this.state.name,
            'weight': this.state.data[0].weight,
            'height': this.state.data[0].height,
            'group_name': '',
            'tshirtsize': this.state.tshirtsize_title,
            'blood_group': this.state.title,
            'email': this.state.email,
            'birth_date': `${this.state.date.getFullYear()}-${this.state.date.getMonth()}-${this.state.date.getDate()}`,
          },
        }),
      };
  
      console.log(config)
      let response = await axios(config);
      console.log('Registrer' + response.data)
    
    if (response.data.result.code == 200) {
      
      // console.log('Login validate');
      // this.props.getUser(response.data);
      // this.props.user_is_auth(true);
    //   alert('Connexion Réussis');

      this.props.navigation.navigate('LoginScreen')
    } 

  };
  

  _onChange = (event, selectedValue) => {
    this.setState({
      show: Platform.OS === 'ios'
    });
    if (this.state.mode == 'date') {
      const currentDate = selectedValue || new Date();
      this.setState({
        date: currentDate,
        // mode: 'time',
        // show: Platform.OS !== 'ios',
        show: false
      })
    }
    // } else {
    //   const selectedTime = selectedValue || new Date();
    //   this.setState({
    //     time: selectedTime,
    //     show: Platform.OS === 'ios',
    //     mode: 'date'
    //   })
    // }
  };
  
  _showMode = currentMode => {
    this.setState({
      show: true,
      mode: currentMode
    })
  };
  
  
  
  _showDatepicker = () =>  {
    this._showMode('date');
  };
  
  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }


  render() {
    // console.log(this.state.data[0].password)
    return (
      <>
        <StatusBar backgroundColor={'#21334a'}/>
        <ScrollView>
            <View  style={{height: 750, backgroundColor: '#fff'}}>
                <View style={{ flex: 0.3, justifyContent:'center', padding: 5, backgroundColor: '#F6F6F6'}}>
                    
                    <View style={{padding: 4}}>
                        <Text style={{ fontSize: 40, color: '#FF6400', fontWeight: '500',}}>
                            REGISTER
                        </Text>
                        <View style={{borderWidth: 1, width: '18%', borderColor: '#FF6400'}}/>
                    </View>
                    
                </View>

                <View style={{  flex: 1, padding: 5}}>

                    <View style={{  padding: 5, justifyContent: 'space-around', }}>
                        <View style={styles.textInput}>
                            <TextInput 
                                placeholder='Email' 
                                placeholderTextColor={'#1A1A1A'}
                                style={[styles.container, {color: '#1A1A1A'}]} 
                                value={this.state.email}
                                onChangeText={(text) => {
                                this.setState({
                                    email: text,
                                });
                                }}
                            />
                        </View>

                        <View style={{width: '100%' , flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={[styles.textInput, {width: '100%'}]}>
                                <TextInput 
                                    placeholder='Name' 
                                    placeholderTextColor={'#1A1A1A'}
                                    style={[styles.container, {color: '#1A1A1A'}]} 
                                    value={this.state.name}
                                    onChangeText={(text) => {
                                    this.setState({
                                        name: text,
                                    });
                                    }}
                                />
                            </View>
                            {/* <View style={[styles.textInput, {width: '50%'}]}>
                                <TextInput 
                                    placeholder='Last Name' 
                                    placeholderTextColor={'#1A1A1A'}
                                    style={[styles.container, {color: '#1A1A1A'}]} 
                                    value={this.state.email}
                                    onChangeText={(text) => {
                                    this.setState({
                                        email: text,
                                    });
                                    }}
                                />
                            </View> */}
                        </View>

                        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems:'center', marginTop: 10}}>
                            <View style={{flexDirection: 'row', alignItems:'center'}}>
                                <RadioButton
                                    value="male"
                                    status={ this.state.checked === 'male' ? 'checked' : 'unchecked' }
                                    onPress= {() => this.setState({checked: 'male'})}
                                />
                                <Text style={{color: '#1A1A1A'}}>Male</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems:'center'}}>
                                <RadioButton
                                    value="female"
                                    status={ this.state.checked === 'female' ? 'checked' : 'unchecked' }
                                    onPress= {() => this.setState({checked: 'female'})}
                                    
                                />
                                <Text style={{color: '#1A1A1A'}}>Female</Text>
                            </View>
                        </View> */}
                        
                        {/* <CountryPicker 
                          theme={{primaryColor: '#000'}} 
                          countryCode= {this.state.country}
                          withModal= {true} 
                          withFilter= {true} 
                          withCountryNameButton= {true} 
                          withFlag= {true}  
                          containerButtonStyle= {{ width: '100%', borderRadius: 10, marginTop: 10, borderBottomWidth: 1, borderColor: '#FF6400', padding: 10}}
                          onSelect= {(country) =>  this.setState({country: country.cca2}) }
                        /> */}


                        <View style={{width: '100%' , flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>

                            <TouchableOpacity style={[styles.textInput, {height: 50, margin: 9, marginLeft: 0, marginRight: 0, width: '50%'}]} 
                              onPress={() => {
                              this._showDatepicker()
                              }}>
                            <FontAwesome
                                    name='calendar'
                                    color='#FF6400'
                                    size={25}
                                />
                                <Text style={{color: '#000', padding: 5}}>  {formatDate(this.state.date)}</Text>
                                {this.state.show && (
                                    <DateTimePicker
                                    testID='dateTimePicker'
                                    timeZoneOffsetInMinutes={0}
                                    value={this.state.date}
                                    mode={this.state.mode}
                                    is24Hour={true}
                                    display='default'
                                    onChange={this._onChange}
                                    />
                                )}
                            </TouchableOpacity>
                            
                        </View>

                        {/* <View style={{width: '100%' , flexDirection: 'row', justifyContent: 'space-between',marginTop: 10}}>
                            <View style={[styles.textInput, {width: '50%'}]}>
                                <TextInput 
                                    placeholder='Height' 
                                    placeholderTextColor={'#1A1A1A'}
                                    style={[styles.container, {color: '#1A1A1A'}]} 
                                    value={this.state.email}
                                    onChangeText={(text) => {
                                    this.setState({
                                        height: text,
                                    });
                                    }}
                                />
                            </View>
                            <View style={[styles.textInput, {width: '50%'}]}>
                                <TextInput 
                                    placeholder='Weight' 
                                    placeholderTextColor={'#1A1A1A'}
                                    style={[styles.container, {color: '#1A1A1A'}]} 
                                    value={this.state.email}
                                    onChangeText={(text) => {
                                    this.setState({
                                        weight: text,
                                    });
                                    }}
                                />
                            </View>
                        </View> */}

                        <View style={{width: '100%' , flexDirection: 'row', justifyContent: 'space-between',marginTop: 10}}>
                            <SelectDropdown
                              buttonTextStyle={{fontSize: 15, textAlign: 'left'}}
                                defaultButtonText= {"Blood Group"}
                                buttonStyle = {[styles.textInput, {backgroundColor: '#fff', margin: 9, marginLeft: 0, marginRight: 0, width: '50%'}]}
                                data={this.state.blood_group}
                                onSelect={(selectedItem, index) => {
                                  console.log(selectedItem, index)
                                    this.setState({
                                      title: selectedItem
                                  });
                                  }
                                }
                                
                                renderDropdownIcon={() => {
                                  return (
                                    <FontAwesome name="chevron-down" color={"#444"} size={15} />
                                  );
                                }}
                                dropdownIconPosition={'right'}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                  // text represented after item is selected
                                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                                  return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                  // text represented for each item in dropdown
                                  // if data array is an array of objects then return item.property to represent item in dropdown
                                  return item
                                }}
                              />
                        </View>


                        <View style={{width: '100%' , flexDirection: 'row', justifyContent: 'space-between',marginTop: 10}}>
                            <SelectDropdown
                              buttonTextStyle={{fontSize: 15, textAlign: 'left'}}
                                defaultButtonText= {"Tshirtsize"}
                                buttonStyle = {[styles.textInput, {backgroundColor: '#fff', margin: 9, marginLeft: 0, marginRight: 0, width: '50%'}]}
                                data={this.state.tshirtsize}
                                onSelect={(selectedItem, index) => {
                                  console.log(selectedItem, index)
                                    this.setState({
                                        tshirtsize_title: selectedItem
                                  });
                                  }
                                }
                                
                                renderDropdownIcon={() => {
                                  return (
                                    <FontAwesome name="chevron-down" color={"#444"} size={15} />
                                  );
                                }}
                                dropdownIconPosition={'right'}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                  // text represented after item is selected
                                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                                  return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                  // text represented for each item in dropdown
                                  // if data array is an array of objects then return item.property to represent item in dropdown
                                  return item
                                }}
                              />
                        </View>
                        

                        {/* <View style={{width: '100%' , flexDirection: 'row', justifyContent: 'space-between',marginTop: 10}}>
                            <View style={[styles.textInput, {width: '70%'}]}>
                                <TextInput 
                                    placeholder='Persone to contact' 
                                    placeholderTextColor={'#1A1A1A'}
                                    keyboardType= 'numeric'
                                    style={[styles.container, {color: '#1A1A1A'}]} 
                                    value={this.state.email}
                                    onChangeText={(text) => {
                                    this.setState({
                                        height: text,
                                    });
                                    }}
                                />
                            </View>
                           
                        </View> */}

                    </View>
                    
                    
                    <View style={{ height: 100, alignItems:'center'}}>
                        <TouchableOpacity 
                            style={styles.button} 
                            // onPress={this._signIn}
                            onPress={this._signUp}
                        >
                            
                            <Text style={{color:'white', fontWeight: '600', fontSize: 20}}>VALIDATE</Text>
                        </TouchableOpacity>
                    </View>

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
        borderColor: '#FF6400',
        // width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 15,
    
    },
    button: {
        borderRadius: 30,
        width: '95%',
        height: 50,
        marginTop: 20,
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

// const mapStateToProps = state => {
//     // console.log('Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeessssssssssssssssssssttttttttttttttt' + state.rbr.user)
//     return {
//         user: state.rbr.user, 
//         user_is_auth: state.rbr.user_is_auth,
//     }
//   };
  
//   const mapDispatchToProps = dispatch => {
//     return bindActionCreators({getUser,user_is_auth}, dispatch)
//   };
  
//   export default connect(mapStateToProps,mapDispatchToProps) (RegistrerInfoScreen)
  export default RegistrerInfoScreen
