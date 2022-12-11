import {
  Button,
  StyleSheet,
  View,
  Image,
  Alert
} from 'react-native'
import {
  Button as ButtonPaper,
  Text,
  useTheme
} from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { Icon } from '@rneui/base'
import axios from 'axios'


const HomeScreen = () => {
  const navigation = useNavigation()
  const theme = useTheme()
  const [image, setImage] = useState(null)


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri)
      navigation.navigate('Result', { img_data: result.uri })
    }
  };

  const launchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
      navigation.navigate('Result', { img_data: result.uri })
    }

  }


  const getPermission = async () => {
    let result = await ImagePicker.requestCameraPermissionsAsync()
    return result
  }

  useEffect(() => {
    getPermission()
  }, [])

  // console.log('Image ', image)
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Icon
          name='info'
          type='feather'
          size={30}
          color={theme.colors.onPrimaryContainer}
          onPress={() => navigation.navigate('About')}
        />
      </View>
      <Image style={{ width: 150, height: 150 }} source={require('../assets/logoapp.png')} />
      <Text style={{ margin: 16 }} variant='headlineMedium'>Pilih Mode</Text>
      <View style={styles.button}>
        <ButtonPaper icon='image' mode='contained' onPress={pickImage}>Impor Gambar</ButtonPaper>
      </View>
      <View style={styles.button}>
        <ButtonPaper icon='camera' mode='contained' onPress={launchCamera}>Ambil Gambar</ButtonPaper>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 4,
  },
  image: {
    marginBottom: 24,
    width: 350,
    // height: 80,
  },
  detect: {
    marginVertical: 12
  },
  info: {
    alignSelf: 'flex-end',
    top: 0,
    marginTop: 40,
    right: 10,
    position: 'absolute'
  },
  viewDetection: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
})