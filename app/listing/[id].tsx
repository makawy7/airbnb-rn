import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import listingsData from '@/assets/data/airbnb-listings.json'
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useLayoutEffect } from 'react'

const IMG_HEIGHT = 300

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const listing = (listingsData as any[]).find((item) => item.id === id)
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)
  const navigation = useNavigation()

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      })
    } catch (error) {
      console.log(error)
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Animated.View
          style={[
            {
              backgroundColor: '#fff',
              height: 100,
              borderBottomColor: Colors.grey,
              borderBottomWidth: StyleSheet.hairlineWidth,
            },
            headerAnimatedStyle,
          ]}
        ></Animated.View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 999,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: Colors.grey,
            }}
          >
            <Ionicons name="heart-outline" size={22} color={`#000`} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={shareListing}
            style={{
              backgroundColor: '#fff',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 999,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: Colors.grey,
            }}
          >
            <Ionicons name="share-outline" size={22} color={`#000`} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: '#fff',
            width: 40,
            height: 40,
            justifyContent: 'center',
            borderRadius: 999,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: Colors.grey,
          }}
        >
          <Ionicons style={{ marginLeft: 6 }} name="chevron-back" size={24} color={`#000`} />
        </TouchableOpacity>
      ),
    })
  }, [])
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    }
  })

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    }
  })
  return (
    <Animated.View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Animated.Image
          source={{ uri: listing.xl_picture_url }}
          style={[styles.image, imageAnimatedStyle]}
        />
        <View style={{ paddingHorizontal: 20, paddingTop: 20, backgroundColor: '#fff' }}>
          <Text style={{ fontFamily: 'mon-b', fontSize: 25 }}>{listing.name}</Text>
          <Text style={{ fontFamily: 'mon-b', fontSize: 16, marginTop: 10 }}>
            {listing.room_type} in {listing.city}, {listing.country}
          </Text>
          <Text style={{ fontFamily: 'mon', marginTop: 5 }}>
            {`${listing.guests_included} guests · ${listing.bedrooms} bedrooms · ${listing.beds} bed · ${listing.bathrooms} bathrooms`}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 }}>
            <Ionicons name="star" size={16} />
            <Text style={{ fontFamily: 'mon-b' }}>{`${listing.review_scores_rating / 20} · ${
              listing.number_of_reviews
            } reviews`}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              borderTopWidth: StyleSheet.hairlineWidth,
              borderTopColor: Colors.grey,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: Colors.grey,
              paddingVertical: 10,
              marginVertical: 15,
            }}
          >
            <Image
              source={{ uri: listing.host_thumbnail_url }}
              style={{ width: 65, height: 65, borderRadius: 999 }}
            />
            <View>
              <Text style={{ fontFamily: 'mon-b' }}>Hosted by {listing.host_name}</Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontFamily: 'mon' }}>{listing.description}</Text>
          </View>
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: Colors.grey,
          paddingVertical: 15,
        }}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{ flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between' }}
        >
          <Text style={{ fontFamily: 'mon-b' }}>€{listing.price} night</Text>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              paddingHorizontal: 40,
              paddingVertical: 15,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: '#fff', fontFamily: 'mon-b' }}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: IMG_HEIGHT,
    width: 'auto',
  },
})
export default Page
