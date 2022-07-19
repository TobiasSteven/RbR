import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  StatusBar,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Linking
} from 'react-native';
import images from '../constants/images';
import icons from '../constants/icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getPosition } from '../store/actions/customAction';


import Modal from 'react-native-modal';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import { TouchableHighlight } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window')
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;
const GOOGLE_MAPS_APIKEY = 'AIzaSyCfVlxFRVtewNGVuvbt9jbF4LWW12ab-bw';


class TrackerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: null,
      duration: null,
      isModal: false,
      isModalSound: false,
      access: false,
      coord: {},
      region: {
        latitude:       0.00,
        longitude:      0.00,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      },
      
      run: true,
      biking: false,
      walk: false,
      swimming: false,
      hiking: false,
      rowing: false,
      skating: false,
      sportName: 'Run',
    };

    this.watchID = null
  }

  jumpToSettings = () => {
  //   IntentLauncher.startActivity({
  //     action: 'android.intent.action.VIEW',
  //     data: 'whatsapp://app'
  // })
  // Linking.openURL('spotify://')
  Linking.openURL('https://play.google.com/store/apps/');


  }


    
  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "RunBhopalRun App needs access to your location ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        this.setState({
          access: true
        })
        Geolocation.getCurrentPosition((info) => {
          console.log(info)
          this.setState({
            coord: info.coords
          }, () => {
              this.setState({
                region: {
                  latitude: parseFloat(this.state.coord.latitude),
                  longitude: parseFloat(this.state.coord.longitude),
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }
              })
          })
        });
  
        this.watchID = Geolocation.watchPosition((position) => {
          this.setState({
            coord: position.coords
          })
        });
      } else {
        this.setState({
          access: false
        })
      }
    } catch (err) {
      console.warn(err);
    }
  };

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  componentDidMount() {
    this.requestLocationPermission();
  }



onRegionChange = (region) => {
  //this.setState({ region: region });
}

_start = () => {
  this.props.getPosition(this.state.region)
  this.props.navigation.navigate('CountingScreen')
}


  render() {
    console.log(this.state.region)
    return (
        <>
          <StatusBar backgroundColor={'#FF6400'}/>
            <View style={styles.container}>
            <MapView
                style={{ height: '100%', width:'100%'}}
                region={this.state.region} 
                showsUserLocation={true}
                onRegionChange={this.onRegionChange}
            >
            </MapView>
            <View style={{ justifyContent: 'center', height: 200, width: '100%', backgroundColor: '#fff', padding: 25, borderTopRightRadius: 30, borderTopLeftRadius: 30,  position: "absolute"}}>
                <View style={{height: 90,}}>
                    <View  style={{flexDirection: 'row',  justifyContent: 'space-between', width: '100%', }}>
                        <TouchableOpacity onPress={()=> this.setState({isModal: true})} style={{ width: 85, flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={images.shoes} style={{height: 30, width: 30}}/>
                            <View>
                                <Text style={{paddingLeft:5, color: '#999999', fontSize: 12}}>Activity</Text>
                                <Text style={{paddingLeft:5, color: '#000', fontSize: 16}}>{this.state.sportName.charAt(0).toUpperCase() + this.state.sportName.slice(1)}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('HistoryScheduledNav')} style={{ width: 85, flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesome5 name='history' size={25} color= '#000'/>
                            <View>
                                <Text style={{paddingLeft:5, color: '#999999', fontSize: 12}}>Workout</Text>
                                <Text style={{paddingLeft:5, color: '#000', fontSize: 16}}>History</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                        
                    <View style={{paddingTop: 15}}>
                        <TouchableOpacity onPress={() => this.setState({isModalSound: true})} style={{ width: 85, flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesome5 name='music' size={25} color= '#000'/>
                            <View>
                                <Text style={{paddingLeft:5, color: '#999999', fontSize: 12}}>Activity</Text>
                                <Text style={{paddingLeft:5, color: '#000', fontSize: 16}}>Select</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <TouchableOpacity
                    onPress={this._start}
                    style={styles.button}
                >
                    <Text style={{color: '#fff', fontSize: 18}}>
                        Start
                    </Text>
                </TouchableOpacity>

            
        
            </View>

            </View> 
            
          <Modal
            onBackdropPress={() => this.setState({ isModal : false})}
            onSwipeComplete={() => this.setState({ isModal : false})}
            testID={'modal'}
            isVisible={this.state.isModal}
            // isVisible={true}
            swipeDirection={['down']}
            deviceWidth= {Dimensions.get("window").width}>

            <View style={{ height: 350, backgroundColor: '#fff', borderRadius: 10, padding: 5}}>

              <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center',}}>
                  <Text style={{paddingLeft: 5, color: '#000', fontSize: 16,}}>Choose a sport</Text>
              </View>
              <View style={{padding: 10, justifyContent: 'space-around', flex: 1}}>

                <TouchableOpacity 
                  onPress={ () =>
                    this.setState({
                      isModal: false,
                      run: true,
                      biking: false,
                      walk: false,
                      swimming: false,
                      hiking: false,
                      rowing: false,
                      skating: false,
                      sportName: 'Run'
                    })
                  }
                >
                  <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center', backgroundColor: this.state.run === true ? '#00000029' : ''}}>
                      <MaterialCommunityIcons name= 'run' size={22} color={'#FF6400'}/>
                      <Text style={{paddingLeft: 15, color: '#000', fontSize: 16,}}>Run</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={ () =>
                    this.setState({
                      isModal: false,
                      run: false,
                      biking: true,
                      walk: false,
                      swimming: false,
                      hiking: false,
                      rowing: false,
                      skating: false,
                      sportName: 'Biking'
                    })
                  }
                >
                  <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center', backgroundColor: this.state.biking === true ? '#00000029' : ''}}>
                      <FontAwesome5 name= 'biking' size={22} color={'#FF6400'}/>
                      <Text style={{paddingLeft: 15, color: '#000', fontSize: 16,}}>Biking</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={ () =>
                    this.setState({
                      isModal: false,
                      run: false,
                      biking: false,
                      walk: true,
                      swimming: false,
                      hiking: false,
                      rowing: false,
                      skating: false,
                      sportName: 'Walk'
                    })
                  }
                >
                  <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center', backgroundColor: this.state.walk === true ? '#00000029' : ''}}>
                      <MaterialCommunityIcons name= 'walk' size={22} color={'#FF6400'}/>
                      <Text style={{paddingLeft: 15, color: '#000', fontSize: 16,}}>Walk</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={ () =>
                    this.setState({
                      isModal: false,
                      run: false,
                      biking: false,
                      walk: false,
                      swimming: true,
                      hiking: false,
                      rowing: false,
                      skating: false,
                      sportName: 'Swimming'
                    })
                  }
                >
                  <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center', backgroundColor: this.state.swimming === true ? '#00000029' : ''}}>
                      <FontAwesome5 name= 'swimmer' size={22} color={'#FF6400'}/>
                      <Text style={{paddingLeft: 15, color: '#000', fontSize: 16,}}>Swimming</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={ () =>
                    this.setState({
                      isModal: false,
                      run: false,
                      biking: false,
                      walk: false,
                      swimming: false,
                      hiking: true,
                      rowing: false,
                      skating: false,
                      sportName: 'Hiking'
                    })
                  }
                >
                  <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center', backgroundColor: this.state.hiking === true ? '#00000029' : ''}}>
                      <MaterialCommunityIcons name= 'hiking' size={22} color={'#FF6400'}/>
                      <Text style={{paddingLeft: 15, color: '#000', fontSize: 16,}}>Hiking</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={ () =>
                    this.setState({
                      isModal: false,
                      run: false,
                      biking: false,
                      walk: false,
                      swimming: false,
                      hiking: false,
                      rowing: true,
                      skating: false,
                      sportName: 'Rowing'
                    })
                  }
                >
                  <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center', backgroundColor: this.state.rowing === true ? '#00000029' : ''}}>
                      <MaterialCommunityIcons name= 'rowing' size={22} color={'#FF6400'}/>
                      <Text style={{paddingLeft: 15, color: '#000', fontSize: 16,}}>Rowing</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={ () =>
                    this.setState({
                      isModal: false,
                      run: false,
                      biking: false,
                      walk: false,
                      swimming: false,
                      hiking: false,
                      rowing: false,
                      skating: true,
                      sportName: 'Skating'
                    })
                  }
                >
                  <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center', backgroundColor: this.state.skating === true ? '#00000029' : ''}}>
                      <FontAwesome5 name= 'skating' size={22} color={'#FF6400'}/>
                      <Text style={{paddingLeft: 15, color: '#000', fontSize: 16,}}>Skating</Text>
                  </View>
                </TouchableOpacity>

              </View>

              
            
            </View>

          </Modal>

          <Modal
            onBackdropPress={() => this.setState({ isModalSound : false})}
            onSwipeComplete={() => this.setState({ isModalSound : false})}
            testID={'modal'}
            isVisible={this.state.isModalSound}
            // isVisible={true}
            swipeDirection={['down']}
            deviceWidth= {Dimensions.get("window").width}
            style={{ margin: 0, top: '64%'}}>

            <View style={{ height: 500, backgroundColor: '#fff', borderRadius: 10, padding: 5}}>

              <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center',}}>
                  <Text style={{paddingLeft: 5, color: '#000', fontSize: 16,}}>Open the music with:</Text>
              </View>
              <View style={{padding: 5, paddingTop: 20, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => {Linking.openURL('https://open.spotify.com'), this.setState({isModalSound: false})}}>
                  <Image source={icons.spotify} style={{height: 70, width: 70, borderRadius: 30/2}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {Linking.openURL('https://www.deezer.com/en/channels/explore'), this.setState({isModalSound: false})}}>
                  <Image source={icons.deezer} style={{height: 70, width: 70, borderRadius: 30/2}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {Linking.openURL('https://audiomack.com/'), this.setState({isModalSound: false})}}>
                  <Image source={icons.audiomack} style={{height: 70, width: 70, borderRadius: 30/2}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {Linking.openURL('http://play.google.com/store/search?q=Music Player&c=apps'), this.setState({isModalSound: false})}}>
                  <Image source={icons.other} style={{height: 70, width: 70, borderRadius: 30/2}}/>
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
    flex:1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
      borderRadius: 30,
      width: '100%',
      height: 45,
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
});

const mapStateToProps = state => {
    // console.log('Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeessssssssssssssssssssttttttttttttttt' + state.rbr.is_modal)
    return {
        position: state.rbr.position,
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({getPosition,}, dispatch)
  };
  
  export default connect(mapStateToProps,mapDispatchToProps) (TrackerScreen);
