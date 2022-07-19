import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  Text,
  
} from 'react-native';
import images from '../constants/images';
import Capture from '../components/Capture'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUser, user_is_auth, getTrackeurState, } from '../store/actions/customAction';

// import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressCircle from 'react-native-progress-circle';


const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}`;
  };

class SummaryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: this.props.route.params.data,
        today: new Date(),
        image: null,
        images: null,
        feel: 'Cool'
        
    };
  }



   secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "00:";
    var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "00:";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "00";

    return hDisplay + mDisplay + sDisplay; 
}



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
        });
      })
      .catch((e) => alert(e));
  }


  renderImage(image) {
    return (
      // <Image
      //   style={{ width: 300, height: 300, resizeMode: 'contain' }}
      //   source={image}
      // />
      <View style={{ width: '100%', height: 300, borderWidth: 0.1,}}>
        <Image source={image} style={{height: '100%', width: '100%', resizeMode: 'contain'}}/>
    </View>
    );
  }

  renderAsset(image) {
    // if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
    //   return this.renderVideo(image);
    // }

    return this.renderImage(image);
  }



  
  render() {
      console.log('this.state.datarrrrrrrrrrrrrrrrr')
      console.log(this.state.data)
    
    return (
        <>
            <StatusBar backgroundColor={'#EF7A2E'}/>
            <ScrollView style={{backgroundColor: '#fff'}}>
                <View style={{padding: 8, paddingLeft: 0, paddingRight: 0}}>
                    {/* <Text style={{fontSize: 18, fontWeight: 'bold', paddingBottom: 10, color: '#000', paddingLeft: 15}}>Hi, {this.props.user.result.result.name}</Text> */}

                    <View style={{height: 310, width: '100%', backgroundColor: '#fff', marginTop: 5, marginBottom: 5, flexDirection: 'row', padding: 8, paddingTop: 10}}>

                        <View style={{flex: 1}}>
                            {/* <View style={{ flexDirection: 'row', padding: 8, alignItems: 'center',}}>
                                <View style={{width: 22, height: 22, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#F9C19D'}}>
                                    <FontAwesome name='trophy' color={'#FF6400'} size= {15}/>
                                </View>
                                <Text style={{paddingLeft:5, color: '#000', fontSize: 12}}>Training days</Text>
                            </View> */}
                            {/* <View style={{paddingTop: 5}}>
                                <Text style={{paddingLeft:8, color: '#999999', fontSize: 12}}>Your Goal is to run 10 Km this week</Text>
                            </View> */}
                            <View style={{flex: 0.9, justifyContent: 'space-around', paddingTop: 5}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <MaterialCommunityIcons
                                        name='google-maps'
                                        color={'#FF6400'}
                                        size= {24}
                                    />
                                    <Text style={{color: '#000', paddingLeft: 5}} numberOfLines={1}>{this.state.data.city}, {this.state.data.country}</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    
                                    <MaterialCommunityIcons
                                        name='calendar-month'
                                        color={'#FF6400'}
                                        size= {24}
                                    />
                                    <Text style={{color: '#000', paddingLeft: 10}}>{formatDate(this.state.today)}</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    
                                    <MaterialCommunityIcons
                                        name='timer-outline'
                                        color={'#FF6400'}
                                        size= {24}
                                    />
                                    <Text style={{color: '#000', paddingLeft: 10}}>{this.secondsToHms(`${this.state.data.timer}`)}</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    
                                    <MaterialCommunityIcons
                                        name='run'
                                        color={'#FF6400'}
                                        size= {24}
                                    />
                                    <Text style={{color: '#000', paddingLeft: 10}}>{this.state.data.distanceTravelled} km</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    
                                    <MaterialCommunityIcons
                                        name='fire'
                                        color={'#FF6400'}
                                        size= {24}
                                    />
                                    <Text style={{color: '#000', paddingLeft: 10}}>{this.state.data.calorie} kcal</Text>
                                </View>
                                
                            </View>

                        </View>

                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ProgressCircle
                                percent={70}
                                radius={80}
                                borderWidth={10}
                                color="#FF6400"
                                shadowColor="#F9C19D"
                                bgColor="#fff"
                            >
                                <Text style={{ fontSize: 22, color: '#000' }}>{this.state.data.steps}</Text>
                                <Text style={{ fontSize: 18, color: '#000' }}>Steps</Text>
                            </ProgressCircle>
                        </View>

                    </View>
                    
                    <View>
                      <Text style={{color: '#000', fontSize: 16, paddingLeft: 15}}>
                        How do you feel after running ?
                      </Text>
                      
                      <View style={{ justifyContent: 'space-around', flexDirection: 'row', paddingTop: 10, padding: 15}}>
                        <TouchableOpacity 
                          onPress={() => this.setState({feel: 'Cool'})}
                          style={{height: 26, justifyContent: 'center', width: 65, borderRadius: 12, backgroundColor: this.state.feel === 'Cool' ? '#FF6400' : '#EEEEEE' }}
                        >
                            <Text style={{color: this.state.feel === 'Cool' ? '#fff' : '#999999', fontSize: 12, textAlign: 'center'}}>
                              Cool
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          onPress={() => this.setState({feel: 'Relaxe'})}
                          style={{height: 26, justifyContent: 'center', width: 65, borderRadius: 12, backgroundColor: this.state.feel === 'Relaxe' ? '#FF6400' : '#EEEEEE' }}
                        >
                            <Text style={{color: this.state.feel === 'Relaxe' ? '#fff' : '#999999', fontSize: 12, textAlign: 'center'}}>
                              Relaxe
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          onPress={() => this.setState({feel: 'Vigorous'})}
                          style={{height: 26, justifyContent: 'center', width: 65, borderRadius: 12, backgroundColor: this.state.feel === 'Vigorous' ? '#FF6400' : '#EEEEEE' }}
                        >
                            <Text style={{color: this.state.feel === 'Vigorous' ? '#fff' : '#999999', fontSize: 12, textAlign: 'center'}}>
                              Vigorous
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          onPress={() => this.setState({feel: 'Neutral'})}
                          style={{height: 26, justifyContent: 'center', width: 65, borderRadius: 12, backgroundColor: this.state.feel === 'Neutral' ? '#FF6400' : '#EEEEEE' }}
                        >
                            <Text style={{color: this.state.feel === 'Neutral' ? '#fff' : '#999999', fontSize: 12, textAlign: 'center'}}>
                              Neutral
                            </Text>
                        </TouchableOpacity>
                      </View>

                      
                      <View style={{ justifyContent: 'space-around', flexDirection: 'row', paddingTop: 10, padding: 15}}>
                        <TouchableOpacity 
                          onPress={() => this.setState({feel: 'Exhauted'})}
                          style={{height: 26, justifyContent: 'center', width: 65, borderRadius: 12, backgroundColor: this.state.feel === 'Exhauted' ? '#FF6400' : '#EEEEEE'}}
                        >
                            <Text style={{color: this.state.feel === 'Exhauted' ? '#fff' : '#999999', fontSize: 12, textAlign: 'center'}}>
                              Exhauted
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          onPress={() => this.setState({feel: 'Badly'})}
                          style={{height: 26, justifyContent: 'center', width: 65, borderRadius: 12, backgroundColor: this.state.feel === 'Badly' ? '#FF6400' : '#EEEEEE'}}
                        >
                            <Text style={{color: this.state.feel === 'Badly' ? '#fff' : '#999999', fontSize: 12, textAlign: 'center'}}>
                              Badly
                            </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                      
                      <View style={{padding: 10}}>
                        <Text style={{color: '#000', fontSize: 16, paddingBottom: 15}}>
                          Take a picture of your current state 
                        </Text>

                        <TouchableOpacity style={styles.button_picture} onPress={() => this.pickSingleWithCamera(true)}>
                            <Text style= {{fontSize: 18, color: '#FFFF', paddingRight: 5}}>{this.state.image === null ? 'Take Picture' : 'Update Picture'}</Text>
                        </TouchableOpacity>

                      </View>
                        
                    <View>
                        { this.state.image === null ? 
                          (
                            <></>
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

                    <View style={{alignItems: 'flex-end', padding: 10,}}>
                      <TouchableOpacity 
                      onPress={() => {
                          this.props.getTrackeurState(this.state),
                          this.props.navigation.navigate('SucessSplash', {data: 'ShareNav'})
                        }
                      } 
                      style={{height: 40, justifyContent: 'center', width: 120, borderRadius: 20, backgroundColor:'#FF6400'}}>
                          <Text style={{color: '#fff', fontSize: 14, textAlign: 'center', fontWeight: 'bold'}}>
                            OK
                          </Text>
                      </TouchableOpacity>
                    </View>

                </View> 
            </ScrollView> 
            


        </>
      );
  }
}

const styles = StyleSheet.create({
    container: {
    flex:1,
    backgroundColor: '#EEEEEE'
  },
  image: {
    width: '100%',
    height: '100%',
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
    width: '50%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FF6400', 
    flexDirection: 'row',
  }
});

const mapStateToProps = state => {
    // console.log('Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeessssssssssssssssssssttttttttttttttt' + state.rbr.user.result.result)
    return {
        user: state.rbr.user, 
        user_is_auth: state.rbr.user_is_auth,
        track_state: state.rbr.trackeur_state,
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUser, user_is_auth, getTrackeurState,}, dispatch)
  };
  
  export default connect(mapStateToProps,mapDispatchToProps) (SummaryScreen)
