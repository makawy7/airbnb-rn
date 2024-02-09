import { Text, View } from 'react-native'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import { useMemo, useState } from 'react'
import listingsData from '@/assets/data/airbnb-listings.json'
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ListingsMap from '@/components/ListingsMap'
import ListingBottomSheet from '@/components/ListingBottomSheet'
const Page = () => {
  const [category, setCategory] = useState<string>('Tiny homes')
  const listings = useMemo(() => listingsData as any, [])

  const onDataChanged = (category: string) => {
    setCategory(category)
  }
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {/* <Listings listings={listings} category={category}></Listings> */}
      <ListingsMap listings={listingsDataGeo} />
      <ListingBottomSheet listings={listings} category={category}></ListingBottomSheet>
    </View>
  )
}
export default Page
