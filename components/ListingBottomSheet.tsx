import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef } from 'react'
import Colors from '@/constants/Colors'
import Listings from './Listings'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  listings: any[]
  category: string
}

const ListingBottomSheet = ({ listings, category }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['10%', '100%'], [])

  const showMap = () => {
    bottomSheetRef.current?.collapse()
  }
  return (
    <BottomSheet  
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={1}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      backgroundStyle={{ borderRadius: 0 }}
    >
      <View  style={{ flex: 1 }}>
        <Listings listings={listings} category={category}></Listings>
        <View style={{ position: 'absolute', bottom: 30, width: '100%', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => showMap()}
            style={{
              backgroundColor: Colors.dark,
              paddingHorizontal: 16,
              paddingVertical: 12,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: '#fff', fontFamily: 'mon-sb' }}>Map</Text>
            <Ionicons name="map" size={20} c color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  )
}

export default ListingBottomSheet
