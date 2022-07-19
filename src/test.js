import React, {useState, useRef} from 'react';
 
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
 
import PhoneInput from 'react-native-phone-number-input';
 
export default function App() {
 
  const [phoneNumber, setPhoneNumber] = useState('');
 
  const phoneInput = useRef(null);
 
  console.log(phoneNumber)
 
  return (
    <View style={styleSheet.MainContainer}>
 
 
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="IN"
        layout="first"
        autoFocus
        containerStyle={styleSheet.phoneNumberView}
        textContainerStyle={{ paddingVertical: 0 }}
        onChangeFormattedText={text => {
          setPhoneNumber(text);
        }}
      />
    </View>
  );
};
 
const styleSheet = StyleSheet.create({
 
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    flex: 1,
  },
 
  phoneNumberView: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    borderBottomWidth: 1
  },
});