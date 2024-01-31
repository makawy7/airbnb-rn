import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { useWarmUpBrowser } from '@/hooks/warmUpBrowser'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}

const Page = () => {
  useWarmUpBrowser()
  const router = useRouter()
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' })
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' })
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' })

  const onSelectAuth = React.useCallback(async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Apple]: appleAuth,
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy]

    try {
      const { createdSessionId, setActive } = await selectedAuth()
      console.log(createdSessionId)

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
        router.back()
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <View style={defaultStyles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, defaultStyles.mb20]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View style={styles.seperatorLine}></View>
        <Text style={styles.seperatorText}>or</Text>
        <View style={styles.seperatorLine}></View>
      </View>
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.socialLoginButton}>
          <Ionicons name="call-outline" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.socialLoginText}>Continue with Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialLoginButton}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.socialLoginText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialLoginButton}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons name="logo-google" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.socialLoginText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialLoginButton}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons name="logo-facebook" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.socialLoginText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperatorLine: { borderBottomWidth: StyleSheet.hairlineWidth, flex: 1, borderColor: Colors.grey },
  seperatorText: { color: Colors.grey, fontFamily: 'mon-sb', fontSize: 20 },

  socialLoginContainer: { gap: 20 },
  socialLoginButton: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialLoginText: { fontSize: 16, fontFamily: 'mon-sb' },
})
export default Page
