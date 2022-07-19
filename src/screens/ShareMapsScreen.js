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
import Share from 'react-native-share';
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


class ShareMapsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
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
                <View style={{}}>
                    {/* <Text style={{fontSize: 18, fontWeight: 'bold', paddingBottom: 10, color: '#000', paddingLeft: 15}}>Hi, {this.props.user.result.result.name}</Text> */}

                    <View style={styles.image}>

                        <Image source={{uri: `data:image/png;base64,${this.props.track_state.data.imagePath}`}} style= {{height: '100%', width: '100%'}}/>

                    </View>
                      

                        
                    <View style={{justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => this.myCustomShare()} style={{height: 50, justifyContent: 'center', width: '100%', borderRadius: 30, backgroundColor:'#FF6400', alignSelf: 'center', marginTop: 25}}>
                            <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
                                Share
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {alert('Save'), this.props.navigation.navigate('NotificationScreen')}} style={{height: 50, justifyContent: 'center', width: '100%', borderRadius: 30,  borderColor:'#FF6400', alignSelf: 'center', marginTop: 25, marginBottom: 10, borderWidth: 1}}>
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
    height: 600, 
    backgroundColor: '#fff', 
    marginTop: 5, 
    marginBottom: 5, 
    flexDirection: 'row', 
    padding: 8, 
    paddingTop: 10, 
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    
    elevation: 9,},
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
  
  export default connect(mapStateToProps,mapDispatchToProps) (ShareMapsScreen)
