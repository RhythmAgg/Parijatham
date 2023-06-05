// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { useNavigation } from '@react-navigation/native';
// import DAppointments from '../screens/Doctor/DAppointments';
// import Dashboard_doctor from '../screens/Doctor/Dashboard_doctor';
// import Patientslist from '../screens/Doctor/Patientslist';
// import { UserContext } from '../contexts/UserContext';
// import { useContext } from 'react'
// import ChatScreen from '../screens/chat';
// import { createStackNavigator } from '@react-navigation/stack';
// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function DoctorNavigator() {
//     const navigation = useNavigation();
//     const [user, setUser] = useContext(UserContext);
//     return (
//         <Stack.Navigator
//             screenOptions={{
//                 headerShown: false,
//             }}
//         >
//             <Stack.Screen name="DoctorTabBar" component={TabBar} />
//             <Stack.Screen name="DoctorChatScreen" component={ChatScreen} />
//         </Stack.Navigator>
//     );
// }

// function TabBar() {
//     const navigation = useNavigation();
//     const [user, setUser] = useContext(UserContext);
//     return (
//         <Tab.Navigator
//             screenOptions={{
//                 headerShown: false,
//             }}
//         >
//             <Tab.Screen name="Dashboard_doctor" component={Dashboard_doctor} />
//             <Tab.Screen name="DAppointments" component={DAppointments} />
//             <Tab.Screen name="Patientslist" component={Patientslist} />
//         </Tab.Navigator>
//     );
// }

// export default DoctorNavigator;

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import DAppointments from '../screens/Doctor/DAppointments'
import Dashboard_doctor from '../screens/Doctor/Dashboard_doctor'
import Patientslist from '../screens/Doctor/Patientslist'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import ChatScreen from '../screens/chat'
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

// Screens

const Dashboardname = 'Home'
const DoctorAppointmentsname = 'Appointments'
const PatientsListname = 'Patients'

function DoctorNavigator() {
  const navigation = useNavigation()
  const [user, setUser] = useContext(UserContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DoctorTabBar" component={TabBar} />
      <Stack.Screen name="DoctorChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  )
}

function TabBar() {
  const navigation = useNavigation()
  const [user, setUser] = useContext(UserContext)
  return (
    <Tab.Navigator
      initialRouteName={Dashboardname}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === Dashboardname) {
            iconName = focused ? 'home' : 'home-outline';
          }
          else if (rn === DoctorAppointmentsname) {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }
          else if (rn === PatientsListname) {
            iconName = focused ? 'list' : 'list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color}></Ionicons>
        }
      })
      }
    >
      <Tab.Screen name="Home" component={Dashboard_doctor} label="Home" />
      <Tab.Screen name="Appointments" component={DAppointments} label="Appointments" />
      <Tab.Screen name="Patients" component={Patientslist} label="Patients" />
    </Tab.Navigator>
  )
}

export default DoctorNavigator
