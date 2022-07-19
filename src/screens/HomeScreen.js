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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUser, isModal, } from '../store/actions/customAction';

// import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressCircle from 'react-native-progress-circle';
import Modal from 'react-native-modal';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  
  render() {
      console.log(this.props.user)
    
    return (
        <>
            <StatusBar backgroundColor={'#EF7A2E'}/>
            <ScrollView>
                <View style={{padding: 8}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', paddingBottom: 10, color: '#000'}}>Hi, {this.props.user.result.result.name}</Text>

                    {/* <View style={{height: 150, width: '99%', borderRadius: 10, backgroundColor: '#fff', marginTop: 5, marginBottom: 5, flexDirection: 'row'}}> */}
                    <View style={{ width: '99%', borderRadius: 10, backgroundColor: '#fff', marginTop: 5, marginBottom: 5, flexDirection: 'row'}}>

                        <View style={{flex: 1,}}>
                            <View style={{ flexDirection: 'row', padding: 8, alignItems: 'center',}}>
                                <View style={{width: 22, height: 22, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#F9C19D'}}>
                                    <FontAwesome name='trophy' color={'#FF6400'} size= {15}/>
                                </View>
                                <Text style={{paddingLeft:5, color: '#000', fontSize: 12}}>My Goal</Text>
                            </View>
                            <View style={{paddingTop: 5}}>
                                <Text style={{paddingLeft:8, color: '#999999', fontSize: 12}}>Your Goal is ...</Text>
                                {/* <Text style={{paddingLeft:8, color: '#999999', fontSize: 12, paddingBottom: 10}}>No goal has been defined</Text> */}
                            </View>
                        </View>

                        <View style={{flex: 1}}>
                            <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                                <ProgressCircle
                                    percent={0}
                                    radius={45}
                                    borderWidth={10}
                                    color="#FF6400"
                                    shadowColor="#F9C19D"
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 12, color: '#000' }}>Distance</Text>
                                    <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold'}}>0<Text style={{ fontSize: 12,}}>km</Text></Text>
                                    {/* <Text style={{ fontSize: 6, color: '#000' }}>Weekly Goal 0 km</Text> */}
                                </ProgressCircle>
                            </View>

                            <View style={{flex: 0.8, flexDirection: 'row', padding: 5, justifyContent: 'space-between', alignItems: 'center'}}>
                                {/* <TouchableOpacity style={{borderWidth: 0.2, height: 25, justifyContent: 'center', width: 65, borderRadius: 20}}>
                                    <Text style={{color: '#999999', fontSize: 12, textAlign: 'center'}}>
                                        Edit Goal
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{height: 25, justifyContent: 'center', width: 65, borderRadius: 20, backgroundColor:'#FF6400'}}>
                                    <Text style={{color: '#fff', fontSize: 12, textAlign: 'center'}}>
                                    See more
                                    </Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>

                    </View>


                    {/* <View style={{height: 350, width: '99%', borderRadius: 10, backgroundColor: '#fff', marginTop: 5, marginBottom: 5, padding: 10 }}> */}
                    <View style={{ width: '99%', borderRadius: 10, backgroundColor: '#fff', marginTop: 5, marginBottom: 5, padding: 10 }}>

                        <Text style={{color: '#000', fontSize: 12, fontWeight: 'bold'}}>EVENT</Text>
                        {/* <Text style={{color: '#000', fontSize: 12, fontWeight: 'bold', paddingBottom: 5}}>HALF MARATHON</Text> */}
                        <Text style={{color: '#000', fontSize: 12, fontWeight: 'bold', paddingBottom: 5}}>No event has been created</Text>
                        {/* <View style={{flex: 0.8, borderRadius: 10,}}>
                            <Image source={images.run_people} style= {{height: '100%', width: '100%', borderRadius: 10, opacity: 0.7,}} resizeMode= 'cover'/>
                        </View>
                        <View style={{flex: 1, padding: 5, }}>
                            <Text style={{color: '#000', fontSize: 12,}}>Description</Text>
                            <Text style={{color: '#999999', fontSize: 10, paddingTop: 2}} numberOfLines={8} >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam</Text>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('EventRegistrationScreen')}
                                style={{height: 30, justifyContent: 'center', width: 75, borderRadius: 20, backgroundColor:'#FF6400', marginTop: 8}}
                            >
                                <Text style={{color: '#fff', fontSize: 12, textAlign: 'center'}}>
                                REGISTER
                                </Text>
                            </TouchableOpacity>
                        </View> */}

                    </View>


                    <View style={{height: 380, width: '99%', borderRadius: 10, backgroundColor: '#fff', marginTop: 5, marginBottom: 5, padding: 5 }}>

                        <View style={{ flexDirection: 'row', padding: 8, alignItems: 'center',}}>
                            <View style={{width: 22, height: 22, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#F9C19D'}}>
                                <FontAwesome5 name='calendar-alt' color={'#FF6400'} size= {15}/>
                            </View>
                            <Text style={{paddingLeft:5, color: '#000', fontSize: 12}}>Training calendar</Text>
                        </View>
                    
                        <View style={{flex: 1,}}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('TrainingDayScreen')}
                            >
                                <Calendar/>
                            </TouchableOpacity>
                        </View>

                    </View>


                    <Text style={{paddingBottom: 10, paddingLeft: 8, paddingTop: 10,color: '#000'}}>Recent activities</Text>
                    <View style={{height: 80, width: '99%', borderRadius: 10, backgroundColor: '#000', marginTop: 5, marginBottom: 5, padding: 10}}>

                        <Text style={{color: '#fff', fontSize: 12}}>LONGEST DISTANCE</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={{color: '#EF7A2E', fontSize: 25}}>{this.props.user.result.result.longest_distance} <Text style={{fontSize: 12}}>km</Text></Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                {/* <Text style={{color: '#fff', fontSize: 12}}>Jan 19 03:49</Text> */}
                            </View>
                        </View>

                    </View>
                    <View style={{height: 80, width: '99%', borderRadius: 10, backgroundColor: '#000', marginTop: 5, marginBottom: 5, padding: 10}}>

                        <Text style={{color: '#fff', fontSize: 12}}>BEST DURATION</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                                <Text style={{color: '#EF7A2E', fontSize: 25}}>{this.props.user.result.result.best_duration} <Text style={{fontSize: 12}}>min/km</Text></Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                {/* <Text style={{color: '#fff', fontSize: 12}}>Jan 19 03:49</Text> */}
                            </View>
                        </View>

                    </View>
                    <View style={{height: 80, width: '99%', borderRadius: 10, backgroundColor: '#000', marginTop: 5, marginBottom: 5, padding: 10}}>

                        <Text style={{color: '#fff', fontSize: 12}}>LONGEST DURATION</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                                <Text style={{color: '#EF7A2E', fontSize: 25}}>{this.props.user.result.result.longest_duration}:00</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                {/* <Text style={{color: '#fff', fontSize: 12}}>Jan 19 03:49</Text> */}
                            </View>
                        </View>

                    </View>
                </View> 
            </ScrollView> 


            <Modal
                onBackdropPress={() => this.props.isModal(false)}
                onSwipeComplete={() => this.props.isModal(false)}
                testID={'modal'}
                isVisible={this.props.is_modal}
                swipeDirection={['down']}
                deviceWidth= {Dimensions.get("window").width}
                style={{ margin: 0, top: '30%'}}>

                <View style={{ height: 300, backgroundColor: '#fff', padding: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                    <View style={{ width: 60, height: 60, borderRadius: 60 / 2, overflow: "hidden", borderWidth: 0.1,}}>
                        <Image source={images.chaussure} style={{height: '100%', width: '100%', borderRadius: 40,}}/>
                    </View>
                </View>
                
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{color:'#000', fontWeight: 'bold', fontSize: 15}}>
                            Permission Required
                        </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{color:'#999999', fontSize: 12}}>
                        To make sure RunBhopal run works properly
                    </Text>
                    </View>
                </View>

                <View style={{flex: 1}}>
                    <TouchableHighlight style={styles.button} onPress={() => this.props.isModal(false)}>
                        <Text style={{color:'white', fontWeight: '600', fontSize: 20, textAlign: 'center',}}>UPDATE SETTINGS</Text>
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
        user: state.rbr.user, 
        is_modal: state.rbr.is_modal,
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUser, isModal}, dispatch)
  };
  
  export default connect(mapStateToProps,mapDispatchToProps) (HomeScreen)
