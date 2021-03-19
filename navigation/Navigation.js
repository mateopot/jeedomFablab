import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons";
import consts from '../src/consts';
import HomeScreen from '../screens/home';
import ConnectionScreen from '../screens/connection';
import RegisterScreen from '../screens/inscription';
import SettingsScreen from '../screens/settings';



function MainStackNavigator() {
    return (
        <NavigationContainer>
            <App />
        </NavigationContainer>
    )
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const StackTabs = function MyTabs() {
    return (
        <Tab.Navigator tabBarOptions={{ activeTintColor: consts.YELLOW, inactiveTintColor: '#4E4D53' }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="ios-log-in" size={size} color={color} />
                    ),
                    gestureEnabled: false
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="ios-log-out" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

function App() {
    return (
        <Stack.Navigator initialRouteName='Connection' screenOptions={{ animationEnabled: false }}>
            <Stack.Screen
                name="Connection"
                component={ConnectionScreen}
                options={{ title: '', headerTransparent: true, gestureEnabled: false, headerLeft: null, headerTintColor: '#000' }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: '', headerTransparent: true, gestureEnabled: false, headerTintColor: '#000' }}
            />
            <Stack.Screen name="Stackstabs" component={StackTabs} options={{ title: '', headerShown: false, headerLeft: null, gestureEnabled: false }} />

        </Stack.Navigator>
    );
}



function Home() {
    return (
        <Stack.Navigator initialRouteName='Connection' screenOptions={{ animationEnabled: false }}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: '', headerTransparent: true, gestureEnabled: false, headerLeft: null }}
            />

            <Stack.Screen name="Stackstabs" component={StackTabs} options={{ title: '', headerShown: false, headerLeft: null, gestureEnabled: false }} />

        </Stack.Navigator>
    );
}

function Settings() {
    return (
        <Stack.Navigator initialRouteName='Connection' screenOptions={{ animationEnabled: false }}>
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: '', headerTransparent: true, gestureEnabled: false, headerLeft: null }}
            />
            <Stack.Screen name="Stackstabs" component={StackTabs} options={{ title: '', headerShown: false, headerLeft: null, gestureEnabled: false }} />

        </Stack.Navigator>
    );
}

export default MainStackNavigator