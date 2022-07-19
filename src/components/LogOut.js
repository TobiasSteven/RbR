import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUser, user_is_auth, is_splash, isModal, getPass} from '../store/actions/customAction'


class LogOut extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  _onPressLogOut = () => {
    this.props.isModal(true)
    this.props.is_splash(false)
    this.props.user_is_auth(false)
    this.props.getPass('')
    // this.props.getUser([])
  }

  render() {
    
  return (
    <>
      <TouchableOpacity onPress={this._onPressLogOut} style={{height: 50, alignItems: 'center', flexDirection: 'row', paddingLeft: 15, marginTop: '50%'}}>
          <Feather name='log-out' size={20} color= {'#000'} />
          <Text numberOfLines={2} style={{fontSize: 14, fontWeight: 'bold', color: '#000', paddingLeft: 10}}>LOG OUT</Text>
      </TouchableOpacity>
      
      </>
      );
    }
  }



const mapStateToProps = state => {
//   console.log('tttttttttttt')
//   console.log(state.rbr)
  return {
      user: state.rbr.user,
      user_is_auth: state.rbr.user_is_auth,
      is_splash: state.rbr.is_splash,
      is_modal: state.rbr.is_modal,
      password: state.rbr.password,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({getUser, user_is_auth, is_splash, isModal, getPass}, dispatch)
};

export default connect(mapStateToProps,mapDispatchToProps)(LogOut)

