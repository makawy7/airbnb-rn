import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  console.log(id)
  return (
    <View>
      <Text>Listing</Text>
    </View>
  )
}

export default Page