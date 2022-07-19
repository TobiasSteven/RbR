import React from 'react';
import 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';


import Headers from '../components/Headers';
import HeaderProfile from '../components/HeaderProfile';
import Header from '../components/Header';
import LogOut from '../components/LogOut';

import HomeScreen from '../screens/HomeScreen';
import TrackerScreen from '../screens/TrackerScreen';
import TrackerStartScreen from '../screens/TrackerStartScreen';
import LeaderBoardScreen from '../screens/LeaderBoardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import EventRegistrationScreen from '../screens/EventRegistrationScreen';
import SucessSplash from '../screens/SucessSplash';
import TrainingDayScreen from '../screens/TrainingDayScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SummaryScreen from '../screens/SummaryScreen';
import HistoryScheduledNav from './HistoryScheduledNav';
import ShareNav from './ShareNav';




import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import images from '../constants/images';
import icons from '../constants/icons';
import { Button, } from 'react-native-paper';

const HomeStack = createStackNavigator();
const TrackerStack = createStackNavigator();
const LeaderBoardStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator()

const CustomDrawerContent = (props) => {

  const user = useSelector(state => state.rbr.user.result.result);
  

  return (
    <DrawerContentScrollView {...props}>

      <View style={{height: 150, backgroundColor: '#EF7A2E', alignItems: 'center', flexDirection: 'row', padding: 15}}>
        <View style={{ width: 100, height: 100, borderRadius: 100 / 2, overflow: "hidden", borderWidth: 0.1,}}>
            <Image source={{uri: `data:image/png;base64,${user.image}`}} style={{height: '100%', width: '100%', borderRadius: 40,}}/>
        </View>
        <View style={{ padding: 10}}>
            <Text numberOfLines={2} style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>{user.name}</Text>
        </View>
      </View>


      {
        Object.entries(props.descriptors).map(([key, descriptor], index) => {
          const focused = index === props.state.index
          return (
            <>
              <DrawerItem
                key={key}
                label={() => (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={descriptor.options.icon} style= {{ height: 25, width: 25, tintColor: '#999999'}}/>
                    <Text style={focused ? styles.drawerLabelFocused : styles.drawerLabel}>
                      {descriptor.options.title}
                    </Text>
                  </View>
                )}
                onPress={() => descriptor.navigation.navigate(descriptor.route.name)}
                style={[styles.drawerItem, focused ? styles.drawerItemFocused : null]}
              />
            </>
          )
        })
      }

      <LogOut/>

    </DrawerContentScrollView>
  )
}



const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    appearance={{
      tabBarBackground: '#fff',
    }}
    tabBarOptions={{
      activeTintColor: "#FF6400",
      inactiveTintColor: "#000",
      style: {
        backgroundColor: '#fff',
        alignItems: 'center',
        height: '12%',
        justifyContent: 'center',
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
            <View style={styles.icon}>
            <FontAwesome name="home" color={color} size={25} />
           </View>
        ),
      }}
    />
    <Tab.Screen
      name="Tracker"
      component={TrackerStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Tracker',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
          <View style={styles.icon}>
             <MaterialIcons name="track-changes" color={color} size={25} />
            </View>
        ),
      }}
    />

    
    <Tab.Screen
      name="LeaderBoard"
      component={LeaderBoardStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'LeaderBoard',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
          <View style={styles.icon}>
            <FontAwesome5 name="trophy" color={color} size={25} />
          </View>
        ),
      }}
    />


    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Profile',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
          <View style={styles.icon}>
            <Ionicons name="person" color={color} size={25} />
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const MainTabTrackerScreen = () => (
  <Tab.Navigator
    initialRouteName="Tracker"
    appearance={{
      tabBarBackground: '#fff',
    }}
    tabBarOptions={{
      activeTintColor: "#FF6400",
      inactiveTintColor: "#000",
      style: {
        backgroundColor: '#fff',
        alignItems: 'center',
        height: '12%',
        justifyContent: 'center',
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
            <View style={styles.icon}>
            <FontAwesome name="home" color={color} size={25} />
           </View>
        ),
      }}
    />
    <Tab.Screen
      name="Tracker"
      component={TrackerStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Tracker',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
          <View style={styles.icon}>
             <MaterialIcons name="track-changes" color={color} size={25} />
            </View>
        ),
      }}
    />

    
    <Tab.Screen
      name="LeaderBoard"
      component={LeaderBoardStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'LeaderBoard',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
          <View style={styles.icon}>
            <FontAwesome5 name="trophy" color={color} size={25} />
          </View>
        ),
      }}
    />


    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Profile',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
          <View style={styles.icon}>
            <Ionicons name="person" color={color} size={25} />
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const MainTabLeaderBoardScreen = () => (
  <Tab.Navigator
    initialRouteName="LeaderBoard"
    appearance={{
      tabBarBackground: '#fff',
    }}
    tabBarOptions={{
      activeTintColor: "#FF6400",
      inactiveTintColor: "#000",
      style: {
        backgroundColor: '#fff',
        alignItems: 'center',
        height: '12%',
        justifyContent: 'center',
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
            <View style={styles.icon}>
            <FontAwesome name="home" color={color} size={25} />
           </View>
        ),
      }}
    />
    <Tab.Screen
      name="Tracker"
      component={TrackerStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Tracker',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
          <View style={styles.icon}>
             <MaterialIcons name="track-changes" color={color} size={25} />
            </View>
        ),
      }}
    />

    
    <Tab.Screen
      name="LeaderBoard"
      component={LeaderBoardStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'LeaderBoard',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
          <View style={styles.icon}>
            <FontAwesome5 name="trophy" color={color} size={25} />
          </View>
        ),
      }}
    />


    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Profile',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
          <View style={styles.icon}>
            <Ionicons name="person" color={color} size={25} />
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const MainTabProfileScreen = () => (
  <Tab.Navigator
    initialRouteName="Profile"
    appearance={{
      tabBarBackground: '#fff',
    }}
    tabBarOptions={{
      activeTintColor: "#FF6400",
      inactiveTintColor: "#000",
      style: {
        backgroundColor: '#fff',
        alignItems: 'center',
        height: '12%',
        justifyContent: 'center',
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
            <View style={styles.icon}>
            <FontAwesome name="home" color={color} size={25} />
           </View>
        ),
      }}
    />
    <Tab.Screen
      name="Tracker"
      component={TrackerStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Tracker',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
          <View style={styles.icon}>
             <MaterialIcons name="track-changes" color={color} size={25} />
            </View>
        ),
      }}
    />

    
    <Tab.Screen
      name="LeaderBoard"
      component={LeaderBoardStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'LeaderBoard',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
          <View style={styles.icon}>
            <FontAwesome5 name="trophy" color={color} size={25} />
          </View>
        ),
      }}
    />


    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Profile',
        tabBarColor: '#fff',
        tabBarIcon: ({ color }) => (
          <View style={styles.icon}>
            <Ionicons name="person" color={color} size={25} />
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const DrawerNavigator = ({navigation}) => {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          height: 60,
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
          backgroundColor: '#EF7A2E'
        },
        headerLeft: () => (
          <View style={styles.left}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerLeft}>
              <FontAwesome name="bars" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        ),
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={MainTabScreen} options={{
        title: 'Home',
        icon: `${icons.home}`,

        headerTitle: () => <View/>,
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')} style={styles.headerRight}>
            <FontAwesome name="bell" size={25} color="#fff" />
          </TouchableOpacity>
        ),
      }}/>
      <Drawer.Screen name="MainTabTrackerScreen"  component={TrackerStackScreen} options={{
        title: 'Routine Tracker',
        icon: `${icons.routine_tracker}`,
        
        headerTitle: () => <Text style={styles.headerTitle}></Text>,
      }}/>
      <Drawer.Screen name="LeaderBoardScreen" component={LeaderBoardStackScreen} options={{
        title: 'LeaderBoard',
        icon: `${icons.trophy}`,

        headerTitle: () => <Text style={styles.headerTitle}>LeaderBoard</Text>,
      }}/>
      {/* <Drawer.Screen name="ProfileScreen" component={ProfileStackScreen} options={{
        title: 'Event Profile',
        icon: `${icons.profile}`,
        
        headerTitle: () => <Text style={styles.headerTitle}>Profile</Text>,
        headerRight: () => <Button onPress={() => navigation.navigate('EditProfile')} style={{fontSize: 18, paddingLeft: 5,}} color= '#fff'>Modify</Button>
      }}/> */}
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  shadow: {
      shadowColor: '#7F5DF0',
      shadowOffset: {
          width: 0,
          height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5
    },
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 38,
    },

    headerLeft: {
      marginLeft: 15,
    },
    headerTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: '500',
    },
    headerRight: {
      marginRight: 15,
    },
    // drawer content
    drawerLabel: {
      fontSize: 14,
      color: '#000',
      paddingLeft: 15
    },
    drawerLabelFocused: {
      fontSize: 14,
      color: '#551E18',
      fontWeight: '500',
      paddingLeft: 15
    },
    drawerItem: {
      height: 50,
      justifyContent: 'center',
    },
    drawerItemFocused: {
      backgroundColor: '#FFE9E2',
    },
  containers: {
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EF7A2E'
    },
    left: {
        // flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
export default DrawerNavigator;

// function HomeScreen() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//       </View>
//     );
//   }

const HomeStackScreen = ({navigation}) => {

    return(
    <HomeStack.Navigator>
           <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title:'',
            // headerTransparent: true,
            headerShown: false,
            // header: (props) => (
            //   <Headers {...props}/>
            // )
            }} />
            <HomeStack.Screen name="NotificationScreen" component={NotificationScreen} options={{
            title:'',
            headerStyle: {
              backgroundColor: '#EF7A2E',
            },
            headerTintColor: '#fff'
            
            // header: (props) => (
            //   <Headers {...props}/>
            // )
            
            }} />
            <HomeStack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{
            title:'',
            headerStyle: {
              backgroundColor: '#EF7A2E',
            },
            headerTintColor: '#fff'
            
            // header: (props) => (
            //   <Headers {...props}/>
            // )
            
            }} />
            <HomeStack.Screen name="EventRegistrationScreen" component={EventRegistrationScreen} options={{
            title:'',
            headerStyle: {
              backgroundColor: '#EF7A2E',
            },
            headerTintColor: '#fff'
            
            // header: (props) => (
            //   <Headers {...props}/>
            // )
            
            }} />
            {/* <HomeStack.Screen name="SucessSplash" component={SucessSplash} options={{
            title:'',
            headerStyle: {
              backgroundColor: '#EF7A2E',
            },
            headerTintColor: '#fff'
            
            // header: (props) => (
            //   <Headers {...props}/>
            // )
            
            }} /> */}
            <HomeStack.Screen name="TrainingDayScreen" component={TrainingDayScreen} options={{
            title:'',
            headerStyle: {
              backgroundColor: '#EF7A2E',
            },
            headerTintColor: '#fff'
            
            // header: (props) => (
            //   <Headers {...props}/>
            // )
            
            }} />
           {/* <HomeStack.Screen name="Cart" component={CartScreen} options={{
            title:'Tes achats',
            
            }} />
           <HomeStack.Screen name="Payment" component={PaymentScreen} options={{
            title:'Paiement',
            
            }} />
           <HomeStack.Screen name="Products" component={ProductListScreen} options={{
            title:'Products',
            
            }} /> */}
            
    </HomeStack.Navigator>
    )};

  
const TrackerStackScreen = ({navigation}) => {
  return(
    <TrackerStack.Navigator>

      <TrackerStack.Screen name="Tracker" component={TrackerScreen} options={{
            title:'',
            headerShown: false,
            // headerTransparent: true,
            // header: (props) => (
            //   <Header {...props}/>
            // )
            }} />
            {/* <TrackerStack.Screen name="TrackerStartScreen" component={TrackerStartScreen} options={{
            title:'',
            // headerTransparent: true,
            headerShown: false,
           
            }} /> */}
            <TrackerStack.Screen name="SummaryScreen" component={SummaryScreen} options={{
            title:'',
            // headerTransparent: true,
            headerShown: false,
           
            }} />
            <TrackerStack.Screen name="HistoryScheduledNav" component={HistoryScheduledNav} options={{
            title:'',
            // headerTransparent: true,
            headerShown: false,
           
            }} />
            {/* <TrackerStack.Screen name="ShareNav" component={ShareNav} options={{
            title:'',
            // headerTransparent: true,
            headerShown: false,
           
            }} /> */}
            
    </TrackerStack.Navigator>
    )};

const LeaderBoardStackScreen = ({navigation}) => {
  return(
    <LeaderBoardStack.Navigator>
            <LeaderBoardStack.Screen name="LeaderBoard" component={LeaderBoardScreen} options={{
            title:'',
            // headerTransparent: true,
            headerShown: false,
            // header: (props) => (
            //   <Header {...props}/>
            // )
            }} />
            
    </LeaderBoardStack.Navigator>
    )};


const ProfileStackScreen = ({navigation}) => {
  return(
    <ProfileStack.Navigator initialRouteName='Profile'>
            <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
            title:'Profile',
            // headerTransparent: true,
            // headerShown: false,
            header: (props) => (
              <HeaderProfile {...props}/>
            )
            }} />
            <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} options={{
            title:'',
            headerStyle: {
              backgroundColor: '#EF7A2E',
            },
            headerTintColor: '#fff'
            }} />
            
    </ProfileStack.Navigator>
    )};




