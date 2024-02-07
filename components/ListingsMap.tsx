import { useRouter } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

interface Props {
  listings: any
}

const ListingsMap: React.FC<Props> = ({ listings }) => {
  const router = useRouter()
  const INITIAL_REGION = {
    latitude: 52.52,
    longitude: 13.405,
    latitudeDelta: 1,
    longitudeDelta: 1,
  }

  const onMarkerSelected = (listingId: string | number) => {
    router.push(`/listing/${listingId}`)
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        {listings.features.map((feature: any) => (
          <Marker
            key={feature.properties.id}
            onPress={() => onMarkerSelected(feature.properties.id)}
            coordinate={{
              latitude: +feature.properties.latitude,
              longitude: +feature.properties.longitude,
            }}
          />
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  map: {
    width: '100%',
    height: '100%',
  },
})

export default ListingsMap
