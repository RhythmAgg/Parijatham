// import React from "react";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { useNavigation } from '@react-navigation/native';
// import PAppointments from '../screens/Patient/PAppointments';
// import Dashboard_patient from '../screens/Patient/Dashboard_patient';
// import Doctorslist from '../screens/Patient/Doctorslist';
// import { useContext } from 'react'
// import { UserContext } from '../contexts/UserContext'
// import BookingDialog from "../screens/Patient/Booking/Booking";
// import ChatScreen from "../screens/chat";
// import { createStackNavigator } from '@react-navigation/stack';
// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function PatientNavigator() {
//     const navigation = useNavigation();
//     const [user, setUser] = useContext(UserContext);
//     return (
//         <Stack.Navigator
//             screenOptions={{
//                 headerShown: false,
//             }}>
//             <Stack.Screen name="PatientTabBar" component={TabBar} />
//             <Stack.Screen name="BookingDialog" component={BookingDialog} />
//             <Stack.Screen name="PatientChatScreen" component={ChatScreen} />
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
//             }}>
//             <Tab.Screen name="Dashboard_patient" component={Dashboard_patient} />
//             <Tab.Screen name="PAppointments" component={PAppointments} />
//             <Tab.Screen name="Doctorslist" component={Doctorslist} />
//         </Tab.Navigator>
//     );
// }



// export default PatientNavigator;

import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import PAppointments from '../screens/Patient/PAppointments';
import Dashboard_patient from '../screens/Patient/Dashboard_patient';
import Doctorslist from '../screens/Patient/Doctorslist';
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import BookingDialog from "../screens/Patient/Booking/Booking";
import ChatScreen from "../screens/chat";
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Screens

const Dashboardname = 'Home'
const PatientAppointmentsname = 'Appointments'
const DoctorsListname = 'Doctors'

function PatientNavigator() {
    const navigation = useNavigation();
    const [user, setUser] = useContext(UserContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="PatientTabBar" component={TabBar} />
            <Stack.Screen name="BookingDialog" component={BookingDialog} />
            <Stack.Screen name="PatientChatScreen" component={ChatScreen} />
        </Stack.Navigator>
    );
}

function TabBar() {
    const navigation = useNavigation();
    const [user, setUser] = useContext(UserContext);
    return (
        <Tab.Navigator
        initialRouteName={Dashboardname}
        screenOptions={ ({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color,size}) => {
                let iconName;
                let rn = route.name;

                if ( rn === Dashboardname ) {
                    iconName = focused ? 'home' : 'home-outline';
                }
                else if ( rn === PatientAppointmentsname) {
                    iconName = focused ? 'notifications' : 'notifications-outline';
                }
                else if ( rn === DoctorsListname ) {
                    iconName = focused ? 'list' : 'list-outline';
                }

                return <Ionicons name ={iconName} size={size} color={color}></Ionicons>
            }
        })
        }
      >
            <Tab.Screen name="Home" component={Dashboard_patient} />
            <Tab.Screen name="Appointments" component={PAppointments} />
            <Tab.Screen name="Doctors" component={Doctorslist} />
        </Tab.Navigator>
    );
}



export default PatientNavigator;