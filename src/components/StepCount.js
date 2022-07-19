import React, { useEffect, useState } from 'react';
import { startCounter, stopCounter } from 'react-native-accurate-step-counter';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import {getSteps } from '../store/actions/customAction';


const StepCount = (props) => {
  
  const is_steps = useSelector(state => state.rbr.steps);

  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const config = {
      default_threshold: 15.0,
      default_delay: 150000000,
      cheatInterval: 3000,
      onStepCountChange: (stepCount) => { setSteps(stepCount), props.test(stepCount) },
      
      onCheat: () => { console.log("User is Cheating") }
    }
    startCounter(config);
    return () => { stopCounter() }
  }, []);
  // console.log(is_steps)
 
  return (
      <View style={{width: 90, alignItems: 'center'}}>
        <Text style={styles.step}>{steps}</Text>
        <Text style={{paddingLeft:5, color: '#999999', fontSize: 13}}>Steps</Text>
      </View>
    
  );
};


const styles = StyleSheet.create({
  
  step: {
    paddingLeft:5, 
    color: '#000', 
    fontSize: 18, 
    fontWeight: 'bold'
  }
});

export default StepCount;