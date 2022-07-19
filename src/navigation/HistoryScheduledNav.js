import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar
} from 'react-native';
import BottomNavigationHistory from './BottomNavigationHistory';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUser,} from '../store/actions/customAction'


class HistoryScheduledNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
        
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

            <BottomNavigationHistory/>

          </View>
  
  
  
        </>
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff'
      }
});

const mapStateToProps = state => {
    // console.log('Splash Screen 1')
    // console.log(state.rbr.user)
    return {
        user: state.rbr.user,
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUser,}, dispatch)
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(HistoryScheduledNav)
  
