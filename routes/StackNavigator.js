import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screen
import HomeScreen from '../screens/HomeScreen'
import AboutScreen from '../screens/AboutScreen'
import DetectScreen from '../screens/DetectScreen'

const Stack = createNativeStackNavigator()

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
}

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
        />
        <Stack.Screen
          name='About'
          component={AboutScreen}
          options={{
            animation: 'slide_from_bottom'
          }}
        />
        <Stack.Screen
          name='Result'
          component={DetectScreen}
          options={{
            animation: 'slide_from_right'
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default StackNavigator