import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HistoryScreen from '../screens/HistoryScreen';
import ScheduledScreen from '../screens/ScheduledScreen';
import ScheduledTrainingScreen from '../screens/ScheduledTrainingScreen';



const TabHistoryScheduled = createMaterialTopTabNavigator();

export default function HistoryScheduled() {
  return (
        <TabHistoryScheduled.Navigator
        screenOptions={{
          style: '#DB1676',
        }}
      >
        <TabHistoryScheduled.Screen name="HistoryScreen" component={HistoryScreen} options={{ tabBarLabel: 'History' }}/>
        <TabHistoryScheduled.Screen name="ScheduledScreen" component={ScheduledScreen} options={{ tabBarLabel: 'Scheduled trainings' }}/>
      </TabHistoryScheduled.Navigator>
  );
}
