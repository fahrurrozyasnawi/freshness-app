import {
  StyleSheet,
  View,
  Image,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import {
  Button,
  Text,
  Card,
  Divider,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper'
import axios from 'axios'

const URL_API = 'http://192.168.1.14:5000'
const apiKey = 'test12345'
const headers = {
  'Content-Type': 'multipart/form-data',
  'Accept': '*',
  'Access-Control-Allow-Origin': '*',
  Authorization: apiKey
}

const DetectScreen = (props) => {
  const { img_data } = props.route.params
  const theme = useTheme()
  const [results, setResults] = useState({ fish: "", freshness: "" })
  const [isLoading, setIsLoading] = useState(false)

  const classifyImg = async () => {
    // const data = new FormData()
    // data.append('file', image)
    console.log('Button pressed')
    const newData = createFormData(img_data)

    // console.log('Form data ', data)
    // console.log('Form data 2', newData)
    // console.log('Base64 ', dataBase64)
    if (img_data === null) {
      return Alert.alert(
        'No Image',
        'Please upload image first..',
        [{ text: 'Ok' }]
      )
    } else {
      setIsLoading(true)
      await axios.post(URL_API + '/results', newData, {
        headers: headers
      })
        .then(res => {
          setResults(res.data)
          setIsLoading(false)
        })
        .catch(err => {
          console.error('Err ', err)
          setIsLoading(false)
          return Alert.alert(
            'Error',
            'Terjadi Kesalahan.. harap coba lagi',
            [{ text: 'Ok' }]
          )
        })
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

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          style={{ width: '100%', height: '100%', borderRadius: 12 }}
          source={{ uri: img_data }}
        />
      </View>
      <View style={styles.resultView}>
        <View
          style={{
            height: 80,
            width: '100%',
            marginBottom: 20,
          }}>
          <Card style={{ backgroundColor: theme.colors.onSecondary }}>
            <Card.Content>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text variant='titleMedium' >Jenis Ikan</Text>
                <Text variant='titleMedium'>{results.fish}</Text>
              </View>
              <Divider style={{ marginVertical: 16 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text variant='titleMedium' >Status</Text>
                <Text
                  style={{
                    color: results.freshness === 'Segar' ? theme.colors.success : theme.colors.error
                  }}
                  variant='titleMedium'
                >{results.freshness}</Text>
              </View>

            </Card.Content>
          </Card>

        </View>
        <View style={{ height: 20, }}>
          {isLoading &&
            <>
              <ActivityIndicator animating={true} color={theme.colors.primary} />
              <Text style={{ marginTop: 4 }}>Mendeteksi...</Text>
            </>
          }
        </View>
        <View>
          <Button
            style={{
              paddingHorizontal: 12,
              paddingVertical: 2,
              borderRadius: 24
            }}
            onPress={classifyImg}
            uppercase
            mode='contained'>
            {/* Deteksi */}
            <Text style={{ color: 'white' }} variant='titleLarge' >Deteksi</Text>
          </Button>

        </View>
      </View>
    </View>
  )
}

export default DetectScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingBottom: 20,
    paddingHorizontal: 24
  },
  imageView: {
    flex: 1,
    // marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center'

  },
  resultView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

})