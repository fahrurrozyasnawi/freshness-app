import { 
  Button, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { Icon } from '@rneui/base'
import axios from 'axios'

const URL_API = 'http:/172.20.10.3:5000'
const apiKey = 'test12345'
const headers = {
  'Content-Type': 'multipart/form-data',
  'Accept': '*',
  'Access-Control-Allow-Origin': '*',
  Authorization: apiKey
}

const HomeScreen = () => {
  const navigation = useNavigation()

  const [image, setImage] = useState(null)
  const [results, setResults] = useState({fish: "", freshness: ""})
  const [isLoading, setIsLoading] = useState(false)
  

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

   if (!result.cancelled){
    setImage(result.uri)
   }
   
  }

  const createFormData = (uri) => {
    const fileName = uri.split('/').pop();
    const fileType = fileName.split('.').pop();
    const formData = new FormData();
    let data = { 
      uri, 
      name: fileName, 
      type: `image/${fileType}` 
    }
    formData.append('file', data);
   
    return formData;
  }


  const classifyImg = async () => { 
    // const data = new FormData()
    // data.append('file', image)
    console.log('Button pressed')
    const newData = createFormData(image)
    
    // console.log('Form data ', data)
    // console.log('Form data 2', newData)
    // console.log('Base64 ', dataBase64)
    if (image === null){
      return Alert.alert(
        'No Image',
        'Please upload image first..',
        [{ text: 'Ok'}]
      )
    } else {
      setIsLoading(true)
      await axios.post(URL_API + '/results', newData , {
        headers: headers})
        .then(res => {
          setResults(res.data)
          setIsLoading(false)
        })
        .catch(err => console.error('Err ', err))      
    }
  } 

  const getPermission = async () => { 
    let result = await ImagePicker.requestCameraPermissionsAsync()
    return result
  }
  
  useEffect(()=>{
    getPermission()
  },[])

  // console.log('Image ', image)
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Icon 
          name='info'
          type='feather'
          size={30}
          color='blue'
          onPress={() => navigation.navigate('About')}
        />
        {/* <Button>
        </Button> */}
      </View>
      <View style={styles.image}>
        {/* {image && <Image source={{ uri: image }} style={{ width: 350, height: 350}} />} */}
        {image !== null ? (
          <Image 
            source={{ uri: image}}
            style={{ width: 350, height: 350}}
          />
        ) : (
          <Icon 
            name='image'
            type='feather'
            size={350}
          />
        )}
      </View>
      <Text>Choose Mode</Text>
      <View style={styles.button}>
        <Button title='Import Image' onPress={pickImage}/>
      </View>
      <View style={styles.button}>
        <Button title='Take Picture' onPress={launchCamera}/>
      </View>
      <View style={styles.detect}>
        {image && 
        <>
          <Button title='Detect Freshness' onPress={classifyImg} /> 
          <View style={styles.viewDetection}>
            <Text style={{ fontSize: 24 }}>Fish : 
              <Text style={{ color: 'orange', fontWeight: '500' }}>
                {" " + results.fish}
              </Text>
            </Text>
            <Text style={{ fontSize: 24 }}>Freshness : 
              <Text style={{ fontWeight: '500', color: results.freshness === 'Segar' ? 'green' : 'red'}}>
                {" " + results.freshness}
              </Text>
            </Text>
          </View>
        </>
        }
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
  image:{
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