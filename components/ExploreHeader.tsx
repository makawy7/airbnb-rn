import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import Colors from '@/constants/Colors'
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context'
import { useRef, useState } from 'react'

const categories = [
  {
    name: 'Tiny homes',
    icon: 'home',
  },
  {
    name: 'Cabins',
    icon: 'house-siding',
  },
  {
    name: 'Trending',
    icon: 'local-fire-department',
  },
  {
    name: 'Play',
    icon: 'videogame-asset',
  },
  {
    name: 'City',
    icon: 'apartment',
  },
  {
    name: 'Beachfront',
    icon: 'beach-access',
  },
  {
    name: 'Countryside',
    icon: 'nature-people',
  },
]

interface Props {
  onCategoryChanged: (category: string) => void
}
const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const insets = useSafeAreaInsets()
  const scrollRef = useRef<ScrollView>(null)
  const itemsRef = useRef<Array<TouchableOpacity | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const handleActiveIndex = (index: number) => {
    const selected = itemsRef.current[index]
    setActiveIndex(index)
    selected?.measure((x, y, width, height, pageX, pageY) => {
      const scrollToX = Platform.OS === 'android' ? pageX : x
      scrollRef.current?.scrollTo({ x: scrollToX - 16, y: 0, animated: true })
    })
    onCategoryChanged(categories[index].name)
  }
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View style={styles.actionRow}>
        <Link href={'/(modals)/booking'} asChild>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search" size={24} />
            <View>
              <Text style={{ fontFamily: 'mon-sb', fontSize: 16 }}>Where to?</Text>
              <Text style={{ fontFamily: 'mon', fontSize: 12, color: Colors.grey }}>
                Anywere &middot; Any week &middot; Add guests
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', gap: 20, paddingHorizontal: 16 }}
      >
        {categories.map(({ name, icon }, index) => (
          <TouchableOpacity
            ref={(el) => (itemsRef.current[index] = el)}
            onPress={() => handleActiveIndex(index)}
            style={activeIndex === index ? styles.categoryBtnActive : styles.categoryBtn}
            key={index}
          >
            <MaterialIcons
              color={activeIndex === index ? Colors.dark : Colors.grey}
              name={icon as any}
              size={40}
            />
            <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 'auto',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 999,
  },
  searchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c2c2c2',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 40,

    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },

  categoryText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: '#000',
  },
  categoryBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoryBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
})
export default ExploreHeader
