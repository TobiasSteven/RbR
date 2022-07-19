import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ShareMapsScreen from '../screens/ShareMapsScreen';
import ShareImageScreen from '../screens/ShareImageScreen';



const TabShare = createMaterialTopTabNavigator();

export default function Share() {
  return (
        <TabShare.Navigator
        screenOptions={{
          style: '#DB1676',
        }}
      >
        <TabShare.Screen name="ShareMapsScreen" component={ShareMapsScreen} options={{ tabBarLabel: 'MAPS' }}/>
        <TabShare.Screen name="ShareImageScreen" component={ShareImageScreen} options={{ tabBarLabel: 'IMAGE' }}/>
      </TabShare.Navigator>
  );
}
