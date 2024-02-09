import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { Link } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { FlatList } from 'react-native-gesture-handler'

import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'
interface Props {
  listings: any[]
  category: string
}

const Listings = ({ listings, category }: Props) => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [category])

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity activeOpacity={0.7}>
        <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item.medium_url }} />
          </View>
          <Ionicons
            name="heart-outline"
            size={24}
            style={{ position: 'absolute', top: 30, right: 30 }}
          />
          <View style={{ marginTop: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: 'mon-b' }}>{item.host_location}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                <Ionicons name="star" size={16} />
                <Text style={{ fontFamily: 'mon' }}>{item.review_scores_rating / 20}</Text>
              </View>
            </View>
            <Text>{item.room_type}</Text>
            <Text>
              <Text style={{ fontFamily: 'mon-b' }}>€{item.price}</Text> night
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  )

  return (
    <View style={{ flex: 1 }}>
      <BottomSheetFlatList
        data={loading ? [] : listings}
        renderItem={renderRow}
        keyExtractor={(item) => item.id.toString()}
        maxToRenderPerBatch={10}
        ListHeaderComponent={
          <Text style={{ fontFamily: 'mon-sb', textAlign: 'center', fontSize: 16 }}>
            {listings.length} Homes
          </Text>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listing: {
    padding: 16,
  },
  imageContainer: {
    backgroundColor: '#fff',

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 8,
    // },
    // shadowOpacity: 0.12,
    // shadowRadius: 8,
    // elevation: 8,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
})
export default Listings
