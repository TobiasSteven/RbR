import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
  TouchableHighlight
} from 'react-native';
import images from '../constants/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUser,} from '../store/actions/customAction'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';



class ScheduledTrainingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      era: 'week',
      day: null,
      isModal: false,
      choose: 'Run',
      dta: [
        {
          id:1,
          type: 'run',
          name: 'Run',
          icon: 'mat'
        },{
            id:2,
            type: 'walk',
            name: 'Walk',
            icon: 'mat'
        },{
          id:3,
          type: 'hiking',
          name: 'Hiking',
          icon: 'mat'
      },{
        id:4,
        type: 'biking',
        name: 'Biking',
        icon: 'font'
      },{
        id:5,
        type: 'rowing',
        name: 'Rowing',
        icon: 'mat'
      },{
        id:6,
        type: 'swimmer',
        name: 'Swimming',
        icon: 'font'
      },{
        id:7,
        type: 'skating',
        name: 'Skating',
        icon: 'font'
      },
      ]
        
    };
  }

  // componentDidCatch() {
  //   this.props.getUser([])
  // }
  


  render() {
    
    return (
        <>
          {/* <StatusBar backgroundColor={'#21334a'}/> */}
          <ScrollView>
          
          <View style={styles.container}>

            <View style={{padding: 15, justifyContent: 'center',}}>
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 22}}>Sport</Text>

              <FlatList
                data={this.state.dta}
                style={{padding: 10}}
                numColumns= {3}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item, index, }) => {

                  
                return (
                    
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, height: 80, padding: 5, backgroundColor: '#fff'}}>

                    <TouchableOpacity onPress={() => this.setState({choose: item.name})} style={{ height:'100%', justifyContent: 'center', alignItems: 'center',}}>
                      <View style={{ width: 40, height: 40, borderRadius: 40 / 2, overflow: "hidden", borderWidth: 0.1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.choose === item.name ? '#FF6400' : '#F6F6F6'}}>
                          {
                            item.icon === 'font' ? (
                              <FontAwesome5 name= {item.type} size={22} color={this.state.choose === item.name ? '#fff' : '#999999'}/>
                            ) : (
                              <MaterialCommunityIcons name= {item.type} size={22} color={this.state.choose === item.name ? '#fff' : '#999999'}/>
                            )
                          }
                      </View>
                      <Text style={{color: '#000',}}>{item.name}</Text>
                    </TouchableOpacity>

                  </View>
                    
                )
                }
                }
              />
            </View>



            <View style={{padding: 15, justifyContent: 'center',}}>
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 22}}>Choose date</Text>

              <Calendar
                onDayPress={day => {
                  console.log('selected day', day);
                  this.setState({day: day.dateString})
                }}
                // markedDates={{
                //   if (this.state.day !== null ){
                //     `${this.state.day}`: {selected: true, marked: true, selectedColor: '#FF6400'},
                //   }
                  
                // }}
              />
              
            </View>


            
            <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', padding: 10}}>

                <TouchableOpacity
                  onPress={() => console.log('LoginScreen')}              
                      // onPress={() => this.props.navigation.navigate('LoginScreen')}
                  style={[styles.button, {borderColor: '#FF6400', borderWidth: 1,}]}
                >
                    <Text style={[styles.text, {color: '#000'}]}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, {backgroundColor: '#FF6400',}]}
                  onPress={() => this.setState({isModal: true})}                  
                  // onPress={() => this.props.navigation.navigate('RegistrerScreen')}
                >
                    <Text style={[styles.text, {color: '#fff'}]}>Save</Text>
                </TouchableOpacity>

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
                style={{ margin: 0, top: '30%'}}>

                <View style={{ height: 300, backgroundColor: '#fff', padding: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>

                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                          <Text style={{color:'#000', fontWeight: 'bold', fontSize: 22}}>
                              Training saved!
                          </Text>
                      </View>
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                      <Text style={{color:'#999999', fontSize: 12, textAlign: 'center'}}>
                          You successfully create your training press button "continue" to check your training
                      </Text>
                      </View>
                  </View>

                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                    <Ionicons name='checkmark-circle' size={80} color={'#FF6400'}/>
                  </View>
                  
                  <View style={{flex: 1}}>
                      <TouchableHighlight style={styles.buttonModal} onPress={() => {this.setState({isModal: false}), this.props.navigation.navigate('ScheduleScreen')}}>
                          <Text style={{color:'white', fontWeight: '600', fontSize: 20, textAlign: 'center',}}>Continue</Text>
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
        backgroundColor: '#FFFF'
      },
      button: {
        width: 270,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 10
      },
      text: {
        fontSize: 16, 
        fontWeight: 'bold', 
      },
      buttonModal: {
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
});

const mapStateToProps = state => {
    console.log('Splash Screen 1')
    console.log(state.rbr.user)
    return {
        user: state.rbr.user,
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUser,}, dispatch)
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(ScheduledTrainingScreen)
  
