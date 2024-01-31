import { useAuth } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Button, Text, View } from 'react-native'

const Page = () => {
  const { signOut, isSignedIn } = useAuth()
  return (
    <View>
      <Text>
        <Button title="log out" onPress={() => signOut} />
        {isSignedIn || (
          <Link href={'/(modals)/login'}>
            <Text>Login</Text>
          </Link>
        )}
      </Text>
    </View>
  )
}

export default Page
