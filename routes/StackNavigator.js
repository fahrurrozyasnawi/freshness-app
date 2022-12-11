import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screen
import HomeScreen from '../screens/HomeScreen'
import AboutScreen from '../screens/AboutScreen'
import DetectScreen from '../screens/DetectScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='About' component={AboutScreen} />
        <Stack.Screen name='Result' component={DetectScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default StackNavigator