import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme
} from 'react-native-paper';
import StackNavigator from './routes/StackNavigator';


const theme = {
  ...DefaultTheme,
  "colors": {
    "primary": "#005AC1",
    "onPrimary": "#FFFFFF",
    "primaryContainer": "#D8E2FF",
    "onPrimaryContainer": "#001A41",
    "secondary": "#575E71",
    "onSecondary": "#FFFFFF",
    "secondaryContainer": "#DBE2F9",
    "onSecondaryContainer": "#141B2C",
    "tertiary": "#715573",
    "onTertiary": "#FFFFFF",
    "tertiaryContainer": "#FBD7FC",
    "onTertiaryContainer": "#29132D",
    "error": "#BA1A1A",
    "success": "#1a936f",
    "onError": "#FFFFFF",
    "errorContainer": "#FFDAD6",
    "onErrorContainer": "#410002",
    "background": "#FEFBFF",
    "onBackground": "#1B1B1F",
    "surface": "#FEFBFF",
    "onSurface": "#1B1B1F",
    "surfaceVariant": "#E1E2EC",
    "onSurfaceVariant": "#44474F",
    "outline": "#74777F",
    "outlineVariant": "rgb(199, 197, 208)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(48, 48, 52)",
    "inverseOnSurface": "rgb(243, 239, 244)",
    "inversePrimary": "rgb(190, 194, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(245, 242, 255)",
      "level2": "rgb(239, 236, 255)",
      "level3": "rgb(233, 230, 255)",
      "level4": "rgb(231, 228, 255)",
      "level5": "rgb(227, 224, 255)"
    },
    "surfaceDisabled": "rgba(27, 27, 31, 0.12)",
    "onSurfaceDisabled": "rgba(27, 27, 31, 0.38)",
    "backdrop": "rgba(48, 48, 56, 0.4)"
  }
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
