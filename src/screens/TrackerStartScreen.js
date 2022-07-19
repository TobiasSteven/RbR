/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React from "react";
 import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   Platform,
   Image,
   PermissionsAndroid
 } from "react-native";
 import MapView, {
   Marker,
   AnimatedRegion,
   Polyline,
   PROVIDER_GOOGLE
 } from "react-native-maps";
 import Geolocation from '@react-native-community/geolocation';
 import haversine from "haversine";
 import images from '../constants/images';
 import StepCount from '../components/StepCount';
 import {Timer, Countdown} from 'react-native-element-timer';
 import {captureScreen} from 'react-native-view-shot';

 import { connect } from 'react-redux';
 import { bindActionCreators } from 'redux';
 import {getPosition, getTrackeurState } from '../store/actions/customAction';
 
 // const LATITUDE = 29.95539;
 // const LONGITUDE = 78.07513;
 const LATITUDE_DELTA = 0.009;
 const LONGITUDE_DELTA = 0.009;
 const LATITUDE = 37.78825;
 const LONGITUDE = -122.4324;
 const GOOGLE_MAPS_APIKEY = 'AIzaSyCfVlxFRVtewNGVuvbt9jbF4LWW12ab-bw';
 
 class TrackerStartScreen extends React.Component {
   constructor(props) {
     super(props);

     this.timerRef = React.createRef(null);

     this.state = {
      // data: this.props.route.params.data,
      speed: 0,
      latitude: this.props.position_coords.latitude,
      longitude: this.props.position_coords.longitude,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: this.props.position_coords.latitude,
        longitude: this.props.position_coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0
      }),
      calorie: 0,
      steps: 0,
      timer: 0,
      state_timer: 'pause',
      city: 'undefined',
      country: 'undefined',
      imagePath: '',
      end: false
     };
   }
 

   componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
   }


   componentDidMount() {
     const { coordinate } = this.state;


     fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + `${this.props.position_coords.latitude}` + ',' + `${this.props.position_coords.longitude}` + '&key=' + GOOGLE_MAPS_APIKEY)
        .then((response) => response.json())
        .then((responseJson) => {
          const result = responseJson.results
          const list = result[0].formatted_address.split(',')
          const country = list[list.length - 1]
          const city = list[list.length - 2]
          this.setState({
            city: city,
            country: country
          })
      })

     this.timerRef.current.start()
 
     this.watchID = Geolocation.watchPosition(
       (position) => {
        console.log('position')
        console.log(position)
         const { routeCoordinates, distanceTravelled } = this.state;
         const { latitude, longitude } = position.coords;
 
         const newCoordinate = {
           latitude,
           longitude
         };
 
         if (Platform.OS === "android") {
           if (this.marker) {
             this.marker.animateMarkerToCoordinate(
               newCoordinate,
               500
             );
             
           }
         } else {
           coordinate.timing(newCoordinate).start();
         }

         
         if (this.state.speed < position.coords.speed) {
           this.setState({speed: position.coords.speed.toFixed(2)})
         }
 
         this.setState({
            latitude,
            longitude,
            routeCoordinates: routeCoordinates.concat([newCoordinate]),
            distanceTravelled:
              distanceTravelled + this.calcDistance(newCoordinate),
            prevLatLng: newCoordinate
         });
       },
       error => console.log(error),
       {
         enableHighAccuracy: true,
         timeout: 20000,
         maximumAge: 1000,
         distanceFilter: 10
       }
     );
   }

   takeScreenShot = () => {
    // To capture Screenshot
    captureScreen({
      // Either png or jpg (or webm Android Only), Defaults: png
      format: 'png',
      height: 50,
      // Quality 0.0 - 1.0 (only available for jpg)
      quality: 0.8, 
      result: 'base64'
    }).then(
      //callback function to get the result URL of the screnshot
      (uri) => {
        
        this.setState({imagePath: uri, end: false});
        this.props.getTrackeurState(this.state)
        this.props.navigation.navigate('SummaryScreen', {data: this.state})
        // setImageURI(uri);
      },
      (error) => console.error('Oops, Something Went Wrong', error),
    );
  };
 
   _pause = () => {
    this.timerRef.current.pause()
    this.setState({state_timer: 'resume'})
   }

   _resume = () => {
    this.timerRef.current.resume()
    this.setState({state_timer: 'pause'})
   }
   _stop = () => {
    this.timerRef.current.pause()
    this.setState({end: true})
    this.takeScreenShot()
     
   }

   sget = (step) => {
    console.log('==================')
    console.log(step)
    this.setState({steps: step})
  }
 
   getMapRegion = () => ({
     latitude: this.state.latitude,
     longitude: this.state.longitude,
     latitudeDelta: this.props.position_coords.latitudeDelta,
     longitudeDelta: this.props.position_coords.longitudeDelta,
   });
 
   calcDistance = newLatLng => {
     const { prevLatLng } = this.state;
     return haversine(prevLatLng, newLatLng) || 0;
   };
 
   render() {
     console.log('this.state.routeCoordinatessssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
     console.log(this.props.position_coords)
     console.log('this.stateeeeeeeeeeeeeeeeeeeeee')
     console.log(this.state.routeCoordinates)
     return (
       <View style={styles.container}>
         <MapView
           style={styles.map}
           provider={PROVIDER_GOOGLE}
           showUserLocation
           followUserLocation
           loadingEnabled
           initialRegion={this.getMapRegion()}
         >
           <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} strokeColor={'#FF6400'}/>
           <Marker
            coordinate={{
              latitude: this.props.position_coords.latitude,
              longitude: this.props.position_coords.longitude,
                }}
          >
            <Image source={images.start_run} style={{height: 30, width:30 }} />
          </Marker>

           <Marker.Animated
             ref={marker => {
               this.marker = marker;
             }}
             coordinate={this.state.coordinate}
            >
             <Image source={images.run} style={{height: 30, width:30 }} />
           </Marker.Animated>
         </MapView>
         {/* <View style={styles.buttonContainer}>
           <TouchableOpacity style={[styles.bubble, styles.button]}>
             <Text style={styles.bottomBarContent}>
               {parseFloat(this.state.distanceTravelled).toFixed(2)} km
             </Text>
           </TouchableOpacity>
         </View> */}

         <View style={{ height: this.state.end === true ? 180 : 220, width: '100%', backgroundColor: '#fff', padding: 25, borderTopRightRadius: 30, borderTopLeftRadius: 30,  position: "absolute"}}>
              <View style={{}}>
                  <View style={{paddingTop: 15, flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                    <View style={{alignItems: 'center'}}>
                          <Timer
                            ref={this.timerRef}
                            style={{paddingLeft:5,}}
                            textStyle={{color: '#000', fontSize: 25, fontWeight: 'bold'}}
                            onTimes={e => {this.setState({timer : e})}}
                            onPause={e => {}}
                            onEnd={e => {}}
                          />
                        {/* <Text style={{paddingLeft:5, color: '#000', fontSize: 25, fontWeight: 'bold'}}>00:00:00</Text> */}
                        <Text style={{paddingLeft:5, color: '#999999', fontSize: 15}}>time</Text>
                    </View>
                    <View style={{width: 90, alignItems: 'center'}}>
                      <Text style={{paddingLeft:5, color: '#000', fontSize: 18, fontWeight: 'bold'}}>{parseFloat(this.state.distanceTravelled).toFixed(2)}</Text>
                      <Text style={{paddingLeft:5, color: '#999999', fontSize: 13}}>Distance (Km)</Text>
                    </View>
                  </View>
                      
                  <View style={{paddingTop: 15, flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                    
                    <View style={{width: 90, alignItems: 'center'}}>
                      <Text style={{paddingLeft:5, color: '#000', fontSize: 18, fontWeight: 'bold'}}>{this.state.speed}</Text>
                      <Text style={{paddingLeft:5, color: '#999999', fontSize: 13}}>Speed(km/h)</Text>
                    </View>
                    <View style={{width: 90, alignItems: 'center'}}>
                      <Text style={{paddingLeft:5, color: '#000', fontSize: 18, fontWeight: 'bold'}}>0</Text>
                      <Text style={{paddingLeft:5, color: '#999999', fontSize: 13}}>Calories(Kcal)</Text>
                    </View>
                    <StepCount test= {this.sget}/>

                  </View>
                  
              </View>
              {
                this.state.end === true ? 
                (
                  <></>
                ) : 
                (
                  <View style={{flexDirection: 'row', paddingTop: 25, justifyContent: 'space-around', alignItems: 'center'}}>
                    <TouchableOpacity 
                      onPress={this.state.state_timer === 'pause' ? this._pause : this._resume}
                      style={{borderWidth: 0.2, height: 32, justifyContent: 'center', width: 100, borderRadius: 20, backgroundColor: '#EEEEEE'}}
                    >
                        <Text style={{color: '#000', fontSize: 18, textAlign: 'center'}}>
                            {this.state.state_timer === 'pause' ? 'Pause' : 'Resume'} 
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={this._stop}
                      style={{height: 32, justifyContent: 'center', width: 100, borderRadius: 20, backgroundColor:'#FF6400'}}
                    >
                        <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
                          Finish
                        </Text>
                    </TouchableOpacity>
                </View>
                )
              }
              

          
      
          </View>

         

       </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     ...StyleSheet.absoluteFillObject,
     justifyContent: "flex-end",
     alignItems: "center"
   },
   map: {
     ...StyleSheet.absoluteFillObject
   },
   bubble: {
     flex: 1,
     backgroundColor: "rgba(255,255,255,0.7)",
     paddingHorizontal: 18,
     paddingVertical: 12,
     borderRadius: 20
   },
   latlng: {
     width: 200,
     alignItems: "stretch"
   },
   button: {
     width: 80,
     paddingHorizontal: 12,
     alignItems: "center",
     marginHorizontal: 10
   },
   buttonContainer: {
     flexDirection: "row",
     marginVertical: 20,
     backgroundColor: "transparent"
   }
 });

 const mapStateToProps = state => {
   
     return {
         position_coords: state.rbr.position,
         track_state: state.rbr.trackeur_state
     }
   };
   
   const mapDispatchToProps = dispatch => {
     return bindActionCreators({getPosition, getTrackeurState}, dispatch)
   };
   
   export default connect(mapStateToProps,mapDispatchToProps) (TrackerStartScreen);