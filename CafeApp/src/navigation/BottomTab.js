import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from '@react-native-vector-icons/ionicons';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Cart') {
                    iconName = focused ? 'cart' : 'cart-outline';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'person' : 'person-outline';
                } else {
                    iconName = focused ? 'receipt' : 'receipt-outline';
                }

                return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#FF7043',
            tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
        />
        <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{ headerShown: false }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
        />
    </Tab.Navigator>
);

export default HomeTabNavigator;
