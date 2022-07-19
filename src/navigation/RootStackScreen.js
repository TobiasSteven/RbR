import React from 'react';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';


import Splash1 from '../screens/Splash1';
import Splash2 from '../screens/Splash2';
import Splash3 from '../screens/Splash3';
import SignScreen from '../screens/SignScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistrerScreen from '../screens/RegistrerScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import PasswordCreateScreen from '../screens/PasswordCreateScreen';
import SucessSplash from '../screens/SucessSplash';


// import FirstPopUpScreen from '../screens/FirstPopUpScreen';
import GenderScreen from '../screens/GenderScreen';
import WeighScreen from '../screens/WeighScreen';
import RegistrerInfoScreen from '../screens/RegistrerInfoScreen';
import TrackerStartScreen from '../screens/TrackerStartScreen';
import CountingScreen from '../screens/CountingScreen';
import ScheduledTrainingScreen from '../screens/ScheduledTrainingScreen';
import ShareNav from './ShareNav';

import MainTabScreen from './MainTabScreen';
import DrawerNavScreen from './DrawerNavScreen';


const RootStack = createStackNavigator() ;


export default function RootStackScreen() {

    const user_is_auth = useSelector(state => state.rbr.user_is_auth);
    console.log("user_is_auth " + user_is_auth);
    const is_splash = useSelector(state => state.rbr.is_splash);
    return (
            <NavigationContainer  independent={true}>
                <RootStack.Navigator screenOptions={{headerShown: false}}>
                
                    <>
                    
                    {user_is_auth ? (<>


                        {/* {is_splash ? (<> */}

                            <RootStack.Screen name='MainTabScreen' component={MainTabScreen} options={{headerShown: false}} />

                            <RootStack.Screen name='TrackerStartScreen' 
                                component={TrackerStartScreen} 
                                options={{
                                    headerShown: true, 
                                    headerTitle: 'Walk', 
                                    headerStyle: {
                                        backgroundColor: '#EF7A2E',
                                    },
                                    headerTintColor: '#fff',
                                    headerLeft: false
                                }} 
                            />

                            <RootStack.Screen name='CountingScreen' component={CountingScreen} options={{headerShown: false}} />

                            <RootStack.Screen name='SucessSplash' component={SucessSplash} options={{headerShown: false}} />

                            <RootStack.Screen 
                                name='ScheduledTrainingScreen' 
                                component={ScheduledTrainingScreen} 
                                options= {{ 
                                    title: 'Schedule training', 
                                    headerShown: true, 
                                    headerTintColor: '#fff',
                                    headerTitleStyle: {
                                        color: '#fff'
                                    },
                                    headerStyle: {
                                        backgroundColor: '#EF7A2E',
                                        elevation: 0,
                                      }
                                    }} 
                            />

                            <RootStack.Screen 
                                name='ShareNav' 
                                component={ShareNav} 
                                options= {{ 
                                    title: 'Share', 
                                    headerShown: true, 
                                    headerTintColor: '#fff',
                                    headerTitleStyle: {
                                        color: '#fff'
                                    },
                                    headerStyle: {
                                        backgroundColor: '#EF7A2E',
                                        elevation: 0,
                                      }
                                    }} 
                            />


                            {/* <RootStack.Screen name='DrawerNavScreen' component={DrawerNavScreen} options={{headerShown: false}} /> */}
                        
                            {/* </>):(<> */}
                            
                                {/* <RootStack.Screen name='FirstPopUpScreen' component={FirstPopUpScreen} /> */}
                            
                            {/* </>)} */}

                        </>) 
                        : (
                        <>

                        <RootStack.Screen name='Splash1' component={Splash1} />
                        <RootStack.Screen name='Splash2' component={Splash2} />
                        <RootStack.Screen name='Splash3' component={Splash3} />
                        <RootStack.Screen name='SignScreen' component={SignScreen} />
                        <RootStack.Screen name='LoginScreen' component={LoginScreen} />
                        <RootStack.Screen name='RegistrerScreen' component={RegistrerScreen} />
                        <RootStack.Screen name='OtpVerificationScreen' component={OtpVerificationScreen} />
                        <RootStack.Screen name='PasswordCreateScreen' component={PasswordCreateScreen} />
                        <RootStack.Screen name='GenderScreen' component={GenderScreen} />
                        <RootStack.Screen name='WeighScreen' component={WeighScreen} />
                        <RootStack.Screen name='RegistrerInfoScreen' component={RegistrerInfoScreen} />

                        </>
                    
                        )} 
                    </>   
                </RootStack.Navigator>
            </NavigationContainer>
    )
}


