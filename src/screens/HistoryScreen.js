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


class HistoryScreen extends Component {
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
              <Text style={{color: '#000', fontWeight: 'bold'}}>Training history</Text>
            </View>

            <View style={{padding: 10, paddingRight: 0, paddingLeft: 0, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.setState({era: 'week'})}
              >
                <Text style={{color: this.state.era === 'week' ? '#000' : '#C3C3C3', fontWeight: '700'}}>This week</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({era: 'month'})}
              >
                <Text style={{color: this.state.era === 'month' ? '#000' : '#C3C3C3', fontWeight: '700'}}>This month</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({era: 'year'})}
              >
                <Text style={{color: this.state.era === 'year' ? '#000' : '#C3C3C3', fontWeight: '700'}}>This year</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({era: 'all'})}
              >
                <Text style={{color: this.state.era === 'all' ? '#000' : '#C3C3C3', fontWeight: '700'}}>All</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              // data={this.props.products}
              data={this.state.dta}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item, index, }) => {

                
              return (
                  
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, height: 70, borderColor: 'red', padding: 5, backgroundColor: '#fff'}}>

                  <View style={{flex: 0.4, height:'100%', justifyContent: 'center', alignItems: 'center',}}>
                    <View style={{ width: 50, height: 50, borderRadius: 50 / 2, overflow: "hidden", borderWidth: 0.1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6F6F6'}}>
                        {
                          item.icon === 'font' ? (
                            <FontAwesome5 name= {item.type} size={25} color={'#EF7A2E'}/>
                          ) : (
                            <MaterialCommunityIcons name= {item.type} size={25} color={'#EF7A2E'}/>
                          )
                        }
                    </View>
                  </View>

                  <View style={{flex: 1, height:'100%', paddingLeft: 10, paddingTop: 3}}>
                    <Text style={{color: '#000', fontWeight: '700'}}>{item.name}</Text>
                    <View style={{flexDirection: 'row', paddingTop: 10}}>
                      <Text style={{color: '#999999', fontWeight: '700'}}>12 km</Text>
                      <Text style={{color: '#999999', fontWeight: '700', paddingLeft: 10}}>00:32:12</Text>
                    </View>
                  </View>

                  <View style={{flex: 0.5, height:'100%', justifyContent: 'center', alignItems: 'center',}}>
                    <View style={{height: 45, width: 45, borderWidth: 0.3, borderRadius: 5, justifyContent: 'center', alignItems: 'center',}}>
                      <Text style={{color: '#999999', fontWeight: '700'}}>FEB</Text>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>12</Text>
                    </View>
                  </View>

                </View>
                  
              )
              }
              }
            />

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
        borderRadius: 30, 
        height: '60%', 
        width: '30%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#FF6400', 
        flexDirection: 'row'
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(HistoryScreen)
  
