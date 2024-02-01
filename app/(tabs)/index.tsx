import { Text, View } from 'react-native'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import { useState } from 'react'

const Page = () => {
  const [category, setCategory] = useState<string>('Tiny homes')

  const onDataChanged = (category: string) => {
    setCategory(category)
  }
  return (
    <View>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Listings listings={[]} category={category}></Listings>
    </View>
  )
}
export default Page
