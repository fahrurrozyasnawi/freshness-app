import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Logo from '../assets/splash.png'

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={Logo}
        style={styles.logo}
      />  
      <Text style={styles.title}>Politeknik Kesehatan Kemenkes Makassar</Text>
      <Text style={styles.title2}>Jurusan Gizi</Text>
      <Text style={styles.title2}>2022</Text>
      <View style={styles.container2}>
        <Text style={styles.title3}>
          Adriyani Adam
        </Text>
        <Text style={styles.title3}>Ahmad Dinul Islam</Text>
        <Text style={styles.title3}>Nuraqilah Awal</Text>
        <Text style={styles.title3}>Indra Rukmana</Text>
      </View>
    </View>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    justifyContent: 'center',
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    textAlign: 'center'
  },
  title2: {
    fontSize: 18,
  },
  container2: {
    marginTop: 40,
    alignItems: 'center'
  },
  title3: {
    fontWeight: 'medium',
    fontSize: 22
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode:'contain',
    marginBottom: 20,
  }
})