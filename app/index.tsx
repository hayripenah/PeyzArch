import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Hero } from '../src/components/Hero';
import { NavBar } from '../src/components/NavBar';
import { ProvinceModal } from '../src/components/ProvinceModal';
import { TurkeyMap } from '../src/components/TurkeyMap';
import { colors } from '../src/theme/colors';

export default function HomeScreen() {
  const scrollRef = useRef<{ scrollTo: (o: { y: number; animated?: boolean }) => void } | null>(
    null
  );
  const [mapY, setMapY] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <NavBar />
      <ScrollView
        ref={scrollRef as never}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Hero
          onExplore={() =>
            scrollRef.current?.scrollTo({ y: mapY, animated: true })
          }
        />
        <View
          onLayout={(e) => setMapY(e.nativeEvent.layout.y)}
          collapsable={false}
        >
          <TurkeyMap selectedId={selectedId} onSelect={setSelectedId} />
        </View>
      </ScrollView>
      <ProvinceModal
        provinceId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingBottom: 40,
  },
});
