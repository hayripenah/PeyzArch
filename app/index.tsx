import { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
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

  const scrollToMap = () => {
    scrollRef.current?.scrollTo({ y: mapY, animated: true });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="dark" />
      <NavBar onMapPress={scrollToMap} />
      <ScrollView
        ref={scrollRef as never}
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        <Hero onExplore={scrollToMap} />
        <View
          onLayout={(e) => setMapY(e.nativeEvent.layout.y)}
          collapsable={false}
          style={{
            backgroundColor: colors.bg,
            paddingTop: 28,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            marginTop: -20,
          }}
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
