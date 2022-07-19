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
import Share from 'react-native-share';
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

class ShareImageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        day : new Date(),
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



    myCustomShare = async() => {
    const shareOptions = {
      message: 'Hello! I did a sport today, here is my journey',
      url: `data:image/png;base64,${this.props.track_state.data.imagePath}`,
      // urls: [files.image1, files.image2]
    }

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch(error) {
      console.log('Error => ', error);
    }
  };

  
  render() {
      console.log('this.props.track_state.datarrrrrrrrrrrrrrrrr')
      console.log(this.props.track_state.today)
    
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
                                    <Text style={{color: '#000', paddingLeft: 5}} numberOfLines={1}>{this.props.track_state.data.city}, {this.props.track_state.data.country}</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    
                                    <MaterialCommunityIcons
                                        name='calendar-month'
                                        color={'#FF6400'}
                                        size= {24}
                                    />
                                    <Text style={{color: '#000', paddingLeft: 10}}>{formatDate(this.state.day)}</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    
                                    <MaterialCommunityIcons
                                        name='timer-outline'
                                        color={'#FF6400'}
                                        size= {24}
                                    />
                                    <Text style={{color: '#000', paddingLeft: 10}}>{this.secondsToHms(`${this.props.track_state.data.timer}`)}</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    
                                    <MaterialCommunityIcons
                                        name='run'
                                        color={'#FF6400'}
                                        size= {24}
                                    />
                                    <Text style={{color: '#000', paddingLeft: 10}}>{this.props.track_state.data.distanceTravelled} km</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    
                                    <MaterialCommunityIcons
                                        name='fire'
                                        color={'#FF6400'}
                                        size= {24}
                                    />
                                    <Text style={{color: '#000', paddingLeft: 10}}>{this.props.track_state.data.calorie} kcal</Text>
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
                                <Text style={{ fontSize: 22, color: '#000' }}>{this.props.track_state.data.steps}</Text>
                                <Text style={{ fontSize: 18, color: '#000' }}>Steps</Text>
                            </ProgressCircle>
                        </View>

                    </View>
                      
                      {/* <View style={{padding: 10}}>
                        <Image source={{uri: `data:image/png;base64,${this.props.track_state.data.imagePath}`}} style= {{height: 100, width: '100%'}}/>

                      </View> */}

                        
                    <View style={{justifyContent: 'center'}}>
                        <TouchableOpacity  onPress={() => this.myCustomShare()}  style={{height: 50, justifyContent: 'center', width: '80%', borderRadius: 30, backgroundColor:'#FF6400', alignSelf: 'center', marginTop: 25, marginRight: 25}}>
                            <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
                                Share
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {alert('Save'), this.props.navigation.navigate('NotificationScreen')}} style={{height: 50, justifyContent: 'center', width: '80%', borderRadius: 30,  borderColor:'#FF6400', alignSelf: 'center', marginTop: 25, marginRight: 25, borderWidth: 1}}>
                            <Text style={{color: '#FF6400', fontSize: 20, textAlign: 'center'}}>
                                Save to Photos
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
    // console.log('Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeessssssssssssssssssssttttttttttttttt' + state.rbr.trackeur_state)
    return {
        user: state.rbr.user, 
        user_is_auth: state.rbr.user_is_auth,
        track_state: state.rbr.trackeur_state,
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUser,user_is_auth, getTrackeurState,}, dispatch)
  };
  
  export default connect(mapStateToProps,mapDispatchToProps) (ShareImageScreen)
