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
 } from "react-native";
 import StepCount from '../components/StepCount';
 import CountDown from 'react-native-countdown-component';

 import { connect } from 'react-redux';
 import { bindActionCreators } from 'redux';
 import {getPosition } from '../store/actions/customAction';
 
 
 class CountingScreen extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
     };
   }
 
 
 
   render() {
     return (
       <View style={styles.container}>

         <CountDown
           until={3}
           size={50}
           onFinish={() => this.props.navigation.navigate('TrackerStartScreen')}
           digitStyle={{backgroundColor: '#EF7A2E'}}
           digitTxtStyle={{color: '#fff'}}
           timeToShow={['S']}
           timeLabels={{s: ''}}
        />

       </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "#EF7A2E",
     flex: 1
     
   },
 });

 const mapStateToProps = state => {
   
     return {
         position_coords: state.rbr.position,
     }
   };
   
   const mapDispatchToProps = dispatch => {
     return bindActionCreators({getPosition,}, dispatch)
   };
   
   export default connect(mapStateToProps,mapDispatchToProps) (CountingScreen);