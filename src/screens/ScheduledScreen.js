import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import images from '../constants/images';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUser,} from '../store/actions/customAction'
import { TouchableOpacity } from 'react-native-gesture-handler';


class ScheduledScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      era: 'week',
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
          <View style={styles.container}>

            <View style={{padding: 15, justifyContent: 'center'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>Scheduled trainings</Text>
            </View>


            <FlatList
              data={this.state.dta}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item, index, }) => {

                
              return (
                  
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, height: 60, borderColor: 'red', padding: 5, backgroundColor: '#fff'}}>

                    <View style={{flex: 0.5, height:'100%', justifyContent: 'center', alignItems: 'center',}}>
                        <View style={{height: 45, width: 45, borderWidth: 0.3, borderRadius: 5, justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{color: '#999999', fontWeight: '700'}}>FEB</Text>
                        <Text style={{color: '#000', fontWeight: 'bold'}}>12</Text>
                        </View>
                    </View>

                    <View style={{flex: 1, height:'100%', paddingLeft: 10, paddingTop: 3}}>
                        <Text style={{color: '#000', fontWeight: '700'}}>{item.name}</Text>
                        <View style={{flexDirection: 'row', paddingTop: 5}}>
                        <Text style={{color: '#999999', fontWeight: '700',}}>3 days left</Text>
                        </View>
                    </View>

                    <View style={{flex: 0.4, height:'100%', justifyContent: 'center', alignItems: 'center',}}>
                        <TouchableOpacity>
                            <FontAwesome5 name= 'edit' size={22} color={'#999999'}/>
                        </TouchableOpacity>
                    </View>


                </View>
                  
              )
              }
              }
            />
            <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: 60}}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('ScheduledTrainingScreen')}
                >
                    <Text style={styles.text}>SCHEDULE YOUR TRAINING</Text>
                </TouchableOpacity>
            </View>

          </View>
  
  
  
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
        backgroundColor: '#FF6400',
      },
      text: {
        fontSize: 15, 
        fontWeight: 'bold', 
        color: '#fff',
      }
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(ScheduledScreen)
  
