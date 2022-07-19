import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  Text,
  TouchableHighlight
  
} from 'react-native';
import images from '../constants/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { TouchableHighlight } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import {getUser, user_is_auth, } from '../store/actions/customAction';

// import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressCircle from 'react-native-progress-circle';


class EventRegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isModal: false,
        
    };
  }

  
  render() {
    //   console.log(this.props.user.result.result.name)
    
    return (
        <>
            <StatusBar backgroundColor={'#EF7A2E'}/>

                <ScrollView>
            
                  <View style={{height: Dimensions.get('window').height, backgroundColor: '#fff'}}>
                      <View style={{height: 50}}/>

                      <View style={{height: 200, justifyContent: 'center', alignItems: 'center', padding: 15}}>
                        <Image source={images.run_people} style= {{height: '100%', width: '100%', borderRadius: 10, opacity: 0.7,}} resizeMode= 'cover'/>
                      </View>

                      <View style={{height: 150, padding: 15,}}>

                        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 20}}>INFORMATION NEEDED</Text>
                        <View style={{top: 15, height: 80, justifyContent: 'space-around'}}>
                          <Text style={{color: '#000'}}>MEDICAL INFORMATION</Text>
                          <Text style={{color: '#000'}}>LAGGAGE</Text>
                          <Text style={{color: '#000'}}>SHUTTLE BUS COORDINATION</Text>
                        </View>
                        
                      </View>

                      <View style={{height: 150, padding: 20,}}>

                        <TouchableHighlight
                          style={[styles.button, {backgroundColor: '#FF6400', width: '100%', height: 55,}]}
                          onPress={() => this.setState({isModal: true})}
                        >
                            <Text style={[styles.text, {color: '#fff', fontSize: 18}]}>Use profile information</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('RegistrationScreen')}
                          style={[styles.button, {borderColor: '#FF6400', borderWidth: 1, width: '100%', height: 55,}]}
                        >
                          <Text style={[styles.text, {color: '#EF7A2E', fontSize: 18}]}>Register</Text>
                        </TouchableHighlight>
                          
                      </View>

                   </View>
              
              </ScrollView>

              <Modal
                onBackdropPress={() => this.setState({isModal: false})}
                onSwipeComplete={() => this.setState({isModal: false})}
                testID={'modal'}
                isVisible={this.state.isModal}
                // isVisible={true}
                swipeDirection={['down']}
                deviceWidth= {Dimensions.get("window").width}
                style={{ margin: 0, top: '39%'}}>

                <View style={{ height: 200, backgroundColor: '#fff', padding: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>

                
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{color:'#000', fontWeight: 'bold', fontSize: 20}}>
                          Use profile information
                        </Text>
                  </View>

                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                      <TouchableHighlight style={[styles.button, {backgroundColor: '#FF6400', width: '40%', height: 40,}]} onPress={() => {this.setState({isModal: false}), this.props.navigation.navigate('SucessSplash', {data: 'Home'})}}>
                          <Text style={{color:'#fff', fontSize: 15, textAlign: 'center',}}>CONTINUE</Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={[styles.button, {borderColor: '#707070', borderWidth: 1, width: '40%', height: 40,}]} onPress={() => this.setState({isModal: false})}>
                          <Text style={{color:'#999999', fontSize: 15, textAlign: 'center',}}>CANCEL</Text>
                      </TouchableHighlight>
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

button: {
  
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 30,
  marginTop: 10
  // margin: 5
},
});

// const mapStateToProps = state => {
//     // console.log('Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeessssssssssssssssssssttttttttttttttt' + state.rbr.user.result.result)
//     return {
//         user: state.rbr.user, 
//         user_is_auth: state.rbr.user_is_auth,
//     }
//   };
  
//   const mapDispatchToProps = dispatch => {
//     return bindActionCreators({getUser,user_is_auth}, dispatch)
//   };
  
//   export default connect(mapStateToProps,mapDispatchToProps) (EventRegistrationScreen)
  export default EventRegistrationScreen
