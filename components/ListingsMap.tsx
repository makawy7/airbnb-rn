import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'

interface Props {
  listings: any[]
}

const ListingsMap: React.FC<Props> = ({ listings }) => {
  const [initialRegion, setInitialRegion] = useState<any>(null)

  useEffect(() => {
    // Fetch user's current location
    const fetchUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({})
          const { latitude, longitude } = location.coords
          setInitialRegion({
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          })
        }
      } catch (error) {
        console.error('Error fetching user location:', error)
      }
    }

    fetchUserLocation()
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  map: {
    width: '100%',
    height: '100%',
  },
})

export default ListingsMap
