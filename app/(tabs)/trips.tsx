import { Image, Text, View } from 'react-native'

const Page = () => {
  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image source={require('@/assets/images/girl.png')} />
    </View>
  )
}

export default Page