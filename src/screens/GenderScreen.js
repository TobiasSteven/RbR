import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
import Modal from 'react-native-modal';
import images from '../constants/images';



class GenderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'first',
      email: '',
      password: '',
      token: '',
      code: '',
      incorrect_password: false,
      invalid_username: false,
      invalid_email: false,
      empty_username: false,
      empty_password: false,
      isVisible: true,
      data: this.props.route.params.data,
      
    };
  }



  _onSubmit = (gender) => {
    
    const dta = this.state.data
    dta[0].gender = gender
    this.setState({data: dta})
    console.log(this.state.data)
    this.props.navigation.navigate('WeighScreen', {data: this.state.data});
}


  render() {
    
    return (
      <>
        {/* <StatusBar backgroundColor={'#21334a'}/> */}
        <View style={{flex: 1, backgroundColor: '#fff'}}>

          <View style={{flex: 0.4,}}>
            <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>1/2</Text>
            </View>
            <View style={{flex: 0.6, alignItems: 'center'}}>
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 18}}>WHAT'S YOUR GENDER?</Text>
              <Text style={{color: '#999999',}}>Calories & Stride Length Calculation needs it</Text>
            </View>
          </View>

          <View style={{flex: 1.5, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>

              <TouchableOpacity 
                onPress={() => {this._onSubmit('Male')}}
                style={[styles.genderForm, {backgroundColor: '#FF6400',}]}
              >
                <Text style={{color: '#fff',  fontSize: 18}}>Male</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => {this._onSubmit('Female')}}
                style={[styles.genderForm, {backgroundColor: '#20EEA1',}]}
              >                
                <Text style={{color: '#000',  fontSize: 18}}>Female</Text>
              </TouchableOpacity>

          </View>


          <View style={{flex: 0.5, alignItems: 'center'}}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => {
                    this.props.navigation.navigate('WeighScreen')
                    }}
            >
                
                <Text style={{color:'white', fontWeight: '600', fontSize: 20}}>NEXT</Text>
            </TouchableOpacity>
          </View>

          <Modal
            onBackdropPress={() => this.setState({isVisible: false})}
            onSwipeComplete={() => this.setState({isVisible: false})}
            testID={'modal'}
            isVisible={this.state.isVisible}
            swipeDirection={['down']}
            deviceWidth= {Dimensions.get("window").width}
            style={{ margin: 0, top: '15%'}}>

            <View style={{ flex: 0.7,backgroundColor: '#fff', padding: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>

              <View style={{flex: 1, justifyContent: 'center',}}>
                <View style={{ width: 90, height: 90, borderRadius: 90 / 2, overflow: "hidden", borderWidth: 0.1,}}>
                    <Image source={images.logo} style={{height: '100%', width: '100%', borderRadius: 40,}}/>
                </View>
              </View>
              
              <View style={{flex: 1, justifyContent: 'center',}}>
                <View style={{flex: 1, justifyContent: 'center', width: '45%'}}>
                  <Text style={{color:'#000', fontWeight: 'bold', fontSize: 15}}>
                    Hi, WELCOME TO RUN BHOPAL RUN
                  </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', width: '70%'}}>
                  <Text style={{color:'#000', fontWeight: 'bold', fontSize: 12}}>
                    Before we get started , please let us know you better to help you set your personal fitness goal.
                  </Text>
                </View>
              </View>

              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={styles.button} onPress={() => this.setState({isVisible: false})}>
                    <Text style={{color:'white', fontWeight: '600', fontSize: 20}}>OK</Text>
                </TouchableOpacity>
              </View>
              
            </View>

          </Modal>

        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    genderForm: {
      width: 120,
      height: 120,
      borderRadius: 120 / 2,
      overflow: "hidden",
      borderWidth: 0.1,
      justifyContent: 'center',
      alignItems: 'center'
    }
});

  
  export default GenderScreen
