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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

import {Url} from '../services/Url'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUser, isModal, } from '../store/actions/customAction';

// import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressCircle from 'react-native-progress-circle';
import Modal from 'react-native-modal';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
        day: true,
        week: false,
        month: false,
        name: this.props.user.name,
        phone: this.props.user.phone,
        email: this.props.user.email,
        weight: this.props.user.weight,
        height: this.props.user.height,
        group_name: this.props.user.group_name,
        blood_group: this.props.user.blood_group,
        tshirtsize: this.props.user.tshirtsize,
        image: this.props.user.image,
    };
  }

  

  
  render() {
      console.log(this.props.user)
    
    return (
        <>
            <StatusBar backgroundColor={'#EF7A2E'}/>
            <ScrollView>

                <View style={{height: 100, backgroundColor: '#EF7A2E' }}/>

                <View style={{padding: 8, paddingTop: 0,}}>
                    

                    <View style={{top: '-20%', height: 150, padding: 20, width: '99%', borderRadius: 10, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                        <View>

                                <View style={{ width: 70, height: 70, borderRadius: 70 / 2, overflow: "hidden", borderWidth: 0.1,}}>
                                    {/* <Image source={images.profile} style={{height: '100%', width: '100%', borderRadius: 40,}}/> */}
                                    <Image source={{uri: `data:image/png;base64,${this.props.user.image}`}} style={{height: '100%', width: '100%', borderRadius: 40,}}/>
                                </View>
                            
                        </View>

                        <View style={{flex: 1, height: 70, padding: 15, paddingTop: 0}}>
                            <View style={{ padding: 2}}>
                                <Text numberOfLines={1} style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>{this.props.user.name}</Text>
                            </View>

                            <View style={{flex: 1, flexDirection: 'row', width: '90%'}}>
                                <View style={{flex: 0.7}}>
                                    <Text numberOfLines={1} style={{fontSize: 14, fontWeight: '600', color: '#000'}}>Age</Text>
                                    <Text numberOfLines={1} style={{fontSize: 13, color: '#000'}}>{this.props.user.age}</Text>
                                </View>
                                <View style={{flex: 1,}}>
                                    <Text numberOfLines={1} style={{fontSize: 14, fontWeight: '600', color: '#000'}}>Height</Text>
                                    <Text numberOfLines={1} style={{fontSize: 13, color: '#000'}}>{this.props.user.height} cm</Text>
                                </View>
                                <View style={{flex: 1,}}>
                                    <Text numberOfLines={1} style={{fontSize: 14, fontWeight: '600', color: '#000'}}>Weight</Text>
                                    <Text numberOfLines={1} style={{fontSize: 13, color: '#000'}}>{this.props.user.weight} kg</Text>
                                </View>
                            </View>
                            
                        </View>

                    </View>


                    <View style={{top: '-15%', width: '99%', borderRadius: 25, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

                        
                        <TouchableOpacity
                             onPress={() => this.setState({ 
                                day: true,
                                week: false,
                                month: false
                             })} 
                            style={{borderWidth: this.state.day === true ? 1 : 0, height: 40, justifyContent: 'center', width: 85, borderRadius: 25, borderColor: '#FF6400'}}
                        >
                            <Text style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
                                Day
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                             onPress={() => this.setState({ 
                                day: false,
                                week: true,
                                month: false
                             })} 
                            style={{borderWidth: this.state.week === true ? 1 : 0, height: 40, justifyContent: 'center', width: 85, borderRadius: 25, borderColor: '#FF6400'}}
                        >
                            <Text style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
                                Week
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                             onPress={() => this.setState({ 
                                day: false,
                                week: false,
                                month: true
                             })} 
                            style={{borderWidth: this.state.month === true ? 1 : 0, height: 40, justifyContent: 'center', width: 85, borderRadius: 25, borderColor: '#FF6400'}}
                        >
                            <Text style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
                                Month
                            </Text>
                        </TouchableOpacity>

                    </View>


                    <View style={{top: '-10%', width: '99%', height: 220, flexDirection: 'row', justifyContent: 'space-around',}}>

                        
                        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                            <ProgressCircle
                                // percent={45}
                                percent={ this.state.day === true ? `${this.props.user.today_steps}` : this.state.week === true ? `${this.props.user.week_steps}` : `${this.props.user.month_steps}`}
                                radius={75}
                                borderWidth={10}
                                color="#FF6400"
                                shadowColor="#F9C19D"
                            >
                                <Text style={{ fontSize: 30, color: '#000', fontWeight: '500' }}>{ this.state.day === true ? `${this.props.user.today_steps}` : this.state.week === true ? `${this.props.user.week_steps}` : `${this.props.user.month_steps}`}</Text>
                                <Text style={{ fontSize: 15, color: '#000', fontWeight: '500' }}>Steps</Text>
                            </ProgressCircle>
                            
                        </View>


                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <ProgressCircle
                                // percent={80}
                                percent= { this.state.day === true ? `${this.props.user.today_calories_burned}` : this.state.week === true ? `${this.props.user.week_calories_burned}` : `${this.props.user.month_calories_burned}`}
                                radius={40}
                                borderWidth={10}
                                color="#FF6400"
                                shadowColor="#F9C19D"
                            >
                                <Text style={{ fontSize: 13, color: '#000' }}>{ this.state.day === true ? `${this.props.user.today_calories_burned}` : this.state.week === true ? `${this.props.user.week_calories_burned}` : `${this.props.user.month_calories_burned}`}</Text>
                            </ProgressCircle>
                            <Text style={{ fontSize: 14, color: '#000', fontWeight: '500', textAlign: 'center'}}>Calories Burned</Text>
                        </View>


                    </View>


                    {/* {
                        this.state.day === true ? 
                            ( 
                                <></> 
                            ) 
                            : 
                            (

                                <View style={{top: '-5%', width: '99%', borderRadius: 25, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>

                        
                                    <View style={{height: 40, justifyContent: 'center', borderRadius: 25,}}>
                                        <Text style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
                                        Cal
                                        </Text>
                                    </View>


                                    <View style={{height: 40, justifyContent: 'center', borderRadius: 25,}}>
                                        <Text style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
                                            21264
                                        </Text>
                                    </View>

                                </View>

                            )
                    } */}

                    <View style={{top: this.state.day === true ? '-5%' : '-5%', width: '99%', borderRadius: 25, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>

                        
                        <View style={{height: 40, justifyContent: 'center', borderRadius: 25,}}>
                            <Text style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
                                Total Calories Burned
                            </Text>
                        </View>


                        <View style={{height: 40, justifyContent: 'center', borderRadius: 25,}}>
                            <Text style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
                                {this.props.user.total_calories_burned} cal
                            </Text>
                        </View>

                    </View>


                    <View style={{marginTop: 0, width: '99%', borderRadius: 25, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>

                        
                        <View style={{height: 40, justifyContent: 'center', borderRadius: 25,}}>
                            <Text style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
                                Total Steps
                            </Text>
                        </View>


                        <View style={{height: 40, justifyContent: 'center', borderRadius: 25,}}>
                            <Text style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
                                {this.props.user.total_steps} steps
                            </Text>
                        </View>

                    </View>


                    <View style={{marginTop: 15, width: '99%', borderRadius: 25, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>

                        
                        <View style={{height: 40, justifyContent: 'center', borderRadius: 25,}}>
                            <Text style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
                                Total Time
                            </Text>
                        </View>


                        <View style={{height: 40, justifyContent: 'center', borderRadius: 25,}}>
                            <Text style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
                                {this.props.user.total_time} h
                            </Text>
                        </View>

                    </View>


                    <View style={{marginTop: 15, width: '99%', borderRadius: 25, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>

                        
                        <View style={{height: 40, justifyContent: 'center', borderRadius: 25,}}>
                            <Text style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
                                Total Distance
                            </Text>
                        </View>


                        <View style={{height: 40, justifyContent: 'center', borderRadius: 25,}}>
                            <Text style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
                                {this.props.user.total_distance} km
                            </Text>
                        </View>

                    </View>
                    
                    
                    {/* {
                        this.state.day === true ? 
                            ( 
                                <View style={{paddingTop: 15,}}>
                                    <Calendar/>
                                </View>
                            ) 
                            : 
                            (
                                <></> 
                            )
                    } */}

                    

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
    button: {
        borderRadius: 30,
        width: '95%',
        height: 50,
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
    image: {
        width: '100%',
        height: '100%',
    },
});

const mapStateToProps = state => {
    // console.log('Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeessssssssssssssssssssttttttttttttttt' + state.rbr.is_modal)
    return {
        user: state.rbr.user.result.result, 
        is_modal: state.rbr.is_modal,
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUser, isModal}, dispatch)
  };
  
  export default connect(mapStateToProps,mapDispatchToProps) (ProfileScreen)
