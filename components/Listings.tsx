import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

interface Props {
  listings: any[]
  category: string
}

const Listings = ({ listings, category }: Props) => {
  useEffect(() => {
    console.log(listings.length)
  }, [category])

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.listing}>
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
            <Text>Indiviudal Host</Text>
            <Text>24-29 Nov</Text>
            <Text>
              <Text style={{ fontFamily: 'mon-b' }}>${item.weekly_price}</Text> week
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  )

  return (
    <View>
      <FlatList renderItem={renderRow} data={listings} />
    </View>
  )
}

const styles = StyleSheet.create({
  listing: {
    padding: 16,
  },
  imageContainer: {
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
})
export default Listings
