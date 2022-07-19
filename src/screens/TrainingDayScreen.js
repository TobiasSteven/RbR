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
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUser, user_is_auth, } from '../store/actions/customAction';

// import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressCircle from 'react-native-progress-circle';


class TrainingDayScreen extends Component {
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
                    <Text style={{fontSize: 18, fontWeight: 'bold', paddingBottom: 10, color: '#000', paddingLeft: 15}}>Hi, {this.props.user.result.result.name}</Text>

                    <View style={{height: 370, width: '100%', backgroundColor: '#fff', marginTop: 5, marginBottom: 5, flexDirection: 'row', padding: 8, paddingTop: 10}}>

                        <View style={{flex: 1}}>
                            <View style={{ flexDirection: 'row', padding: 8, alignItems: 'center',}}>
                                <View style={{width: 22, height: 22, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#F9C19D'}}>
                                    <FontAwesome name='trophy' color={'#FF6400'} size= {15}/>
                                </View>
                                <Text style={{paddingLeft:5, color: '#000', fontSize: 12}}>Training days</Text>
                            </View>
                            <View style={{paddingTop: 5}}>
                                <Text style={{paddingLeft:8, color: '#999999', fontSize: 12}}>Your Goal is to run 10 Km this week</Text>
                            </View>
                            <View style={{flex: 0.9, justifyContent: 'space-around', paddingTop: 5}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <CheckBox
                                        disabled={false}
                                        tintColors
                                        value={this.state.sunday}
                                        onValueChange={(newValue) => this.setState({sunday: newValue})}
                                    />
                                    <Text style={{color: '#000'}}>Sunday</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <CheckBox
                                        disabled={false}
                                        tintColors
                                        value={this.state.monday}
                                        onValueChange={(newValue) => this.setState({monday: newValue})}
                                    />
                                    <Text style={{color: '#000'}}>Monday</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <CheckBox
                                        disabled={false}
                                        tintColors
                                        value={this.state.tuesday}
                                        onValueChange={(newValue) => this.setState({tuesday: newValue})}
                                    />
                                    <Text style={{color: '#000'}}>Tuesday</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <CheckBox
                                        disabled={false}
                                        tintColors
                                        value={this.state.wednesday}
                                        onValueChange={(newValue) => this.setState({wednesday: newValue})}
                                    />
                                    <Text style={{color: '#000'}}>Wednesday</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <CheckBox
                                        disabled={false}
                                        tintColors
                                        value={this.state.thusday}
                                        onValueChange={(newValue) => this.setState({thusday: newValue})}
                                    />
                                    <Text style={{color: '#000'}}>Thusday</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <CheckBox
                                        disabled={false}
                                        tintColors
                                        value={this.state.friday}
                                        onValueChange={(newValue) => this.setState({friday: newValue})}
                                    />
                                    <Text style={{color: '#000'}}>Friday</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <CheckBox
                                        disabled={false}
                                        tintColors
                                        value={this.state.saturday}
                                        onValueChange={(newValue) => this.setState({saturday: newValue})}
                                    />
                                    <Text style={{color: '#000'}}>Saturday</Text>
                                </View>
                            </View>

                        </View>

                        <View style={{flex: 1, paddingTop: 10, alignItems: 'center'}}>
                            <ProgressCircle
                                percent={70}
                                radius={50}
                                borderWidth={10}
                                color="#FF6400"
                                shadowColor="#F9C19D"
                                bgColor="#fff"
                            />
                        </View>

                    </View>

                    <TouchableOpacity style={{height: 30, justifyContent: 'center', width: 75, borderRadius: 15, backgroundColor:'#FF6400', alignSelf: 'flex-end', marginTop: 25, marginRight: 25}}>
                        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>
                            Save
                        </Text>
                    </TouchableOpacity>


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
  
  export default connect(mapStateToProps,mapDispatchToProps) (TrainingDayScreen)
