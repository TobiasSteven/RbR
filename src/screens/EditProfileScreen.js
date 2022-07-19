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
    Image, 
    TouchableHighlight,
    ActivityIndicator,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from 'react-native-select-dropdown';
import PhoneInput from 'react-native-phone-number-input';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUser, user_is_auth, getPass} from '../store/actions/customAction';
import {Url} from '../services/Url'

const formatDate = (date) => {
  return `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()}`;
};


class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'male',
      password: '',
      country: 'CI',
      tshirtsize_title: '',
      tshirtsize_lst: ['l', 'xl', 'xxl', 'xxxl'],
      blood_grp: [ "a-", "a+", "b-", "b+", "o-", "o+", "ab-", "ab+",],
      token: '',
      incorrect_password: false,
      invalid_username: false,
      invalid_email: false,
      empty_username: false,
      empty_password: false,
      isModal: false,
      isModalUpdate: false,
      load: false,


      name: this.props.user.name,
      phone: this.props.user.phone,
      email: this.props.user.email,
      weight: this.props.user.weight,
      height: this.props.user.height,
      group_name: this.props.user.group_name,
      blood_group: this.props.user.blood_group,
      tshirtsize: this.props.user.tshirtsize,
      // image: this.props.user.image,
      image: null,
      images: null,
      date: new Date(`${this.props.user.birth_date === '' ? '' : this.props.user.birth_date}`),
      time: new Date(),
      mode: 'date',
      show: false,


    };
  }

  _updateLogin = async () => {

    var config = {
        method: 'post',
        url: `${Url}/runner/get/dashboard/infos`,
        headers: {
          "Content-Type": "application/json"
         },
        data : JSON.stringify({
          params: {
            'id': this.props.user.id,
            // db: 'RBR012022',
          },
        }),
      };
  
      console.log(config)
      let response = await axios(config);
      console.log('Update' + response.data)
    
    if (response.data.result.result.id == this.props.user.id) {
      
      console.log('Update Login');
      this.props.getUser(response.data);
      this.setState({ isModalUpdate : true, load: false})
    } 

  };

  _updateProfile = async () => {

    this.setState({load: true})

    var config = {
        method: 'post',
        url: `${Url}/runner/update/profile`,
        headers: {
          "Content-Type": "application/json"
         },
        data : JSON.stringify({
          params: {

              'id': this.props.user.id,
              'name': this.state.name,
              'phone': this.state.phone,
              'email': this.state.email,
              'weight': this.state.weight,
              'height': this.state.height,
              'group_name': this.state.group_name,
              'blood_group': this.state.blood_group,
              'tshirtsize': this.state.tshirtsize,
              'image': `${this.state.image === null ? this.props.user.image : this.state.image.uri_64}`,

          },
        }),
      };
  
      console.log(config)
      let response = await axios(config);
      // console.log('Reset' + response.data.result.result)
    
    if (response.data.result.result == 'Profil mis à jour') {
      
      console.log('Profil mis à jour');
      // alert('Profile updated');
      this._updateLogin()
      // this.props.navigation.navigate('Profile')

    }

  };


  pickSingleWithCamera(cropping, mediaType = 'photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      includeBase64: true,
      mediaType,
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            // uri_64: `data:${image.mime};base64,` + image.data,
            uri_64: image.data,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
          isModal: false
        });
      })
      .catch((e) => alert(e));
  }

  
  pickSingle(cropit, circular = false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      // compressVideoPreset: 'MediumQuality',
      includeExif: true,
      includeBase64: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            // uri_64: `data:${image.mime};base64,` + image.data,
            uri_64: image.data,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
          isModal: false
        });
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }



  renderImage(image) {
    return (
      // <Image
      //   style={{ width: 300, height: 300, resizeMode: 'contain' }}
      //   source={image}
      // />
      <View style={{ width: 180, height: 180, borderRadius: 180 / 2, overflow: "hidden", borderWidth: 0.1,}}>
        <Image source={image} style={{height: '100%', width: '100%', borderRadius: 40,}}/>
      </View>
    );
  }

  renderAsset(image) {
    // if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
    //   return this.renderVideo(image);
    // }

    return this.renderImage(image);
  }




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
    // console.log(this.state.image)

    return (
      <>
        <StatusBar backgroundColor={'#21334a'}/>


        <ScrollView>


            <View  style={{height: 850, backgroundColor: '#fff'}}>
                <View style={{ flex: 0.3, justifyContent:'center', padding: 5, backgroundColor: '#F6F6F6'}}>

                    <View style={{padding: 4}}>
                        <Text style={{ fontSize: 40, color: '#FF6400', fontWeight: '500',}}>
                            PROFILE
                        </Text>
                        <View style={{borderWidth: 1, width: '18%', borderColor: '#FF6400'}}/>
                    </View>

                </View>

                <View style={{  flex: 1, padding: 5}}>

                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                      <View style={{height: 180, width: 180,}}>

                        { this.state.image === null ? 
                          (
                            <View style={{ width: 180, height: 180, borderRadius: 180 / 2, overflow: "hidden", borderWidth: 0.1,}}>
                                {/* <Image source={images.profile} style={{height: '100%', width: '100%', borderRadius: 40,}}/> */}
                                <Image source={{uri: this.props.user.image === false ? 'http://simpleicon.com/wp-content/uploads/user1.png' : `data:image/png;base64,${this.props.user.image}`}} style={{height: '100%', width: '100%', borderRadius: 40,}}/>
                            </View>
                          ) : 
                          (
                            <>
                              {this.state.image ? this.renderAsset(this.state.image) : null}
                              {this.state.images
                                ? this.state.images.map((i) => (
                                    <View key={i.uri}>{this.renderAsset(i)}</View>
                                  ))
                                : null}
                            </>
                          ) 
                        }

                      </View>
                      <TouchableOpacity style={styles.button_picture} onPress={() => this.setState({isModal: true})}>
                        <Text style= {{fontSize: 20, color: '#FFFF', paddingRight: 5}}>{this.props.user.image === false ? this.state.image === null ? 'Add Picture': 'Update Picture' : 'Update Picture'}</Text>
                        {/* <AntDesign name='arrowright' size={20} color= '#FFFF'/> */}
                      </TouchableOpacity>
                    </View>
                    
                    <View style={{  padding: 5, justifyContent: 'space-around', }}>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='Your Email'
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
                            <View style={[styles.textInput, {width: '50%'}]}>
                                <TextInput
                                    placeholder='Your Name'
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
                            <View style={[styles.textInput, {width: '50%'}]}>
                                <TextInput
                                    placeholder='Your Number'
                                    placeholderTextColor={'#1A1A1A'}
                                    keyboardType= 'numeric'
                                    style={[styles.container, {color: '#1A1A1A'}]}
                                    value={this.state.phone}
                                    onChangeText={(text) => {
                                    this.setState({
                                        phone: text,
                                    });
                                    }}
                                />
                                {/* <PhoneInput
                                  ref={null}
                                  defaultValue={this.state.phone}
                                  defaultCode="IN"
                                  layout="first"
                                  autoFocus
                                  containerStyle={styles.phoneNumberView}
                                  textContainerStyle={{ paddingVertical: 0 }}
                                  onChangeFormattedText={text => {
                                    this.setState({
                                        phone: text,
                                  });
                                  }}
                                  // onChangeFormattedText={text => {this.props.phoneNumber(text)}}
                                /> */}
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems:'center', marginTop: 10}}>
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
                        </View>

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

                        <View style={{width: '100%' , flexDirection: 'row', justifyContent: 'space-between',marginTop: 10}}>
                            <View style={[styles.textInput, {width: '50%'}]}>
                                <TextInput
                                    placeholder='Height'
                                    keyboardType='numeric'
                                    placeholderTextColor={'#1A1A1A'}
                                    style={[styles.container, {color: '#1A1A1A'}]}
                                    value={this.state.height}
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
                                    keyboardType='numeric'
                                    placeholderTextColor={'#1A1A1A'}
                                    style={[styles.container, {color: '#1A1A1A'}]}
                                    value={this.state.weight}
                                    onChangeText={(text) => {
                                    this.setState({
                                        weight: text,
                                    });
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{width: '100%' , flexDirection: 'row', justifyContent: 'space-between',marginTop: 10}}>
                            <SelectDropdown
                              buttonTextStyle={{fontSize: 15, textAlign: 'left'}}
                                defaultButtonText= {"Blood Group"}
                                buttonStyle = {[styles.textInput, {backgroundColor: '#fff', margin: 9, marginLeft: 0, marginRight: 0, width: '50%'}]}
                                data={this.state.blood_grp}
                                onSelect={(selectedItem, index) => {
                                  console.log(selectedItem, index)
                                    this.setState({
                                      blood_group: selectedItem
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

                              <SelectDropdown
                                buttonTextStyle={{fontSize: 15, textAlign: 'left'}}
                                defaultButtonText= {"Tshirtsize"}
                                buttonStyle = {[styles.textInput, {backgroundColor: '#fff', margin: 9, marginLeft: 0, marginRight: 0, width: '50%'}]}
                                data={this.state.tshirtsize_lst}
                                onSelect={(selectedItem, index) => {
                                  console.log(selectedItem, index)
                                    this.setState({
                                      tshirtsize: selectedItem
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
                                    placeholder='Your Number'
                                    placeholderTextColor={'#1A1A1A'}
                                    keyboardType= 'numeric'
                                    style={[styles.container, {color: '#1A1A1A'}]}
                                    value={this.state.phone}
                                    onChangeText={(text) => {
                                    this.setState({
                                        number: text,
                                    });
                                    }}
                                />
                            </View>

                        </View> */}

                    </View>


                    <View style={{ height: 100, alignItems:'center'}}>

                      {this.state.load === false ? (
                          <TouchableOpacity
                              style={styles.button}
                              onPress={this._updateProfile}
                          >

                              <Text style={{color:'white', fontWeight: '600', fontSize: 20}}>UPDATE</Text> 
                          </TouchableOpacity>
                        ) : (
                          <ActivityIndicator size="large" color="#FF6400" animating={this.state.load} style={{paddingTop: 10}} />
                        )
                      }
                        
                        
                    </View>

                </View>


            </View>

        </ScrollView>


        
        <Modal
          onBackdropPress={() => this.setState({ isModal : false})}
          onSwipeComplete={() => this.setState({ isModal : false})}
          testID={'isModal'}
          isVisible={this.state.isModal}
          swipeDirection={['down']}
          deviceWidth= {Dimensions.get("window").width}
          style={{ margin: 0, top: '37%'}}>

          <View style={{ height: 200, backgroundColor: '#fff', padding: 25, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>

            <TouchableOpacity
              onPress={() => this.pickSingleWithCamera(true)}
              style={styles.button}
            >
              <Text style={{color: '#fff', fontSize: 18}}>
                Take with your camera
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.pickSingle(true)}
              style={styles.button}
            >
              <Text style={{color: '#fff', fontSize: 18}}>Take from your gallery</Text>
            </TouchableOpacity>
          
          </View>

      </Modal>

      <Modal
        testID={'isModalUpdate'}
        isVisible={this.state.isModalUpdate}
        // isVisible={true}
        onBackdropPress={() => {this.setState({isModalUpdate: false,}), this.props.navigation.navigate('Profile')}}
        onSwipeComplete={() => {this.setState({isModalUpdate: false,}), this.props.navigation.navigate('Profile')}}
        backdropColor="#B4B3DB"
        backdropOpacity={0.5}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View style={{ backgroundColor: '#fff', height: 150, borderRadius: 20, }}>
            
            <View style={{flex: 1, padding: 10, justifyContent: 'space-around', alignItems: 'center',}}>
                <Text style={{ color: '#000', textAlign: 'center', fontSize: 22}}>
                  Profile updated !
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableHighlight 
                        style={styles.button} 
                        // onPress={() => this.props.navigation.navigate('CaptureImageScreen')}
                        onPress={() => {this.setState({isModalUpdate: false,}), this.props.navigation.navigate('Profile')}}
                    >
                        
                        <Text style={{fontWeight: 'bold', color:'white',  fontSize: 20}}>Continue</Text>
                    </TouchableHighlight>
                    
                    
                </View>
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
    },
    button_picture: {
      borderRadius: 30, 
      height: 40, 
      width: '45%', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#FF6400', 
      flexDirection: 'row'
    }
});

const mapStateToProps = state => {
    // console.log('Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeessssssssssssssssssssttttttttttttttt' + state.rbr.user)
    return {
        user: state.rbr.user.result.result,
        user_is_auth: state.rbr.user_is_auth,
        get_password: state.rbr.password,
    }
  };

  const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUser, user_is_auth, getPass}, dispatch)
  };

  export default connect(mapStateToProps,mapDispatchToProps) (EditProfileScreen)
//   export default EditProfileScreen
