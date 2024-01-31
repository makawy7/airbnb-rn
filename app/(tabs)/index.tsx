import { Text, View } from 'react-native'
import { Link } from 'expo-router'

const Page = () => {
  return (
    <View>
      <Text>
        <Link href={'/(modals)/login'}>Login</Link>
        <Link href={'/(modals)/booking'}>Booking</Link>
        <Link href={'/listing/511521'}>Listing Details</Link>
      </Text>
    </View>
  )
}
export default Page
