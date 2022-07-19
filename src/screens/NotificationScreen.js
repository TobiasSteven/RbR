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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUser, user_is_auth, } from '../store/actions/customAction';

// import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressCircle from 'react-native-progress-circle';


class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thusday: false,
        friday: false,
        saturday: false,
        
    };
  }

  
  render() {
    //   console.log(this.props.user.result.result.name)
    
    return (
        <>
            <StatusBar backgroundColor={'#EF7A2E'}/>
            <ScrollView>
                <View style={{padding: 8, paddingLeft: 0, paddingRight: 0}}>
                    

                    <View style={{height: Dimensions.get('window').height, width: '95%', backgroundColor: '#fff', margin: 5, borderRadius: 10, padding: 8, paddingTop: 10, backgroundColor: '#fff'}}>

                        <View style={{height: 50, justifyContent: 'center', padding: 10}}>
                            <Text style={{fontSize: 22, fontWeight: 'bold', color: '#000'}}>Hi, {this.props.user.result.result.name}</Text>
                        </View>
                        
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name='ios-notifications-outline' size={40}  color= '#999999'/>
                            <Text style={{fontSize: 25, color: '#999999'}}>No notification</Text>
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
    flex:1,
    backgroundColor: '#EEEEEE'
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

const mapStateToProps = state => {
    // console.log('Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeessssssssssssssssssssttttttttttttttt' + state.rbr.user.result.result)
    return {
        user: state.rbr.user, 
        user_is_auth: state.rbr.user_is_auth,
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUser,user_is_auth}, dispatch)
  };
  
  export default connect(mapStateToProps,mapDispatchToProps) (NotificationScreen)
