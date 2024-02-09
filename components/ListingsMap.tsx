import { useRouter } from 'expo-router'
import { View, StyleSheet, Text } from 'react-native'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapView from 'react-native-map-clustering'
import Colors from '@/constants/Colors'
import { memo } from 'react'

interface Props {
  listings: any
}

const ListingsMap: React.FC<Props> = memo(({ listings }) => {
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

  const renderCluster = (cluster: any) => {
    const { id, onPress, properties, geometry } = cluster
    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{ longitude: geometry.coordinates[0], latitude: geometry.coordinates[1] }}
      >
        <View style={styles.marker}>
          <Text style={[styles.markerText, { marginHorizontal: 6 }]}>{properties.point_count}</Text>
        </View>
      </Marker>
    )
  }
  return (
    <View>
      <MapView
        animationEnabled={false}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        renderCluster={renderCluster}
      >
        {listings.features.map((feature: any) => (
          <Marker
            key={feature.properties.id}
            onPress={() => onMarkerSelected(feature.properties.id)}
            coordinate={{
              latitude: +feature.properties.latitude,
              longitude: +feature.properties.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>€ {feature.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  )
})

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
  markerText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
  },
})

export default ListingsMap
