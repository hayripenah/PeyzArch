import { useCallback, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Hero } from '../src/components/Hero';
import { NavBar } from '../src/components/NavBar';
import { ProvinceModal } from '../src/components/ProvinceModal';
import { TurkeyMap } from '../src/components/TurkeyMap';
import type { SearchResult } from '../src/lib/search';
import { colors } from '../src/theme/colors';

export default function HomeScreen() {
  const scrollRef = useRef<{ scrollTo: (o: { y: number; animated?: boolean }) => void } | null>(
    null
  );
  const [mapY, setMapY] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [density, setDensity] = useState<Record<string, number> | null>(null);
  const [heatLegend, setHeatLegend] = useState<string | null>(null);
  const [activeQuery, setActiveQuery] = useState<string | null>(null);

  const scrollToMap = useCallback(() => {
    scrollRef.current?.scrollTo({ y: mapY, animated: true });
  }, [mapY]);

  const onSearchSelect = useCallback(
    (result: SearchResult) => {
      setActiveQuery(result.title);
      setDensity(result.density);
      setHeatLegend(
        result.kind === 'plant'
          ? `${result.title} yayılımı`
          : result.kind === 'plantType'
            ? `${result.title} yoğunluğu`
            : result.kind === 'region'
              ? `${result.title} illeri`
              : `${result.title} konumu`
      );
      scrollToMap();

      if (result.kind === 'province' && result.provinceIds[0]) {
        setSelectedId(result.provinceIds[0]);
      } else {
        setSelectedId(null);
      }
    },
    [scrollToMap]
  );

  const clearSearch = () => {
    setActiveQuery(null);
    setDensity(null);
    setHeatLegend(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="dark" />
      <NavBar
        onMapPress={scrollToMap}
        onSearchSelect={onSearchSelect}
        activeQuery={activeQuery}
        onClearSearch={clearSearch}
      />
      <ScrollView
        ref={scrollRef as never}
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
          <TurkeyMap
            selectedId={selectedId}
            onSelect={setSelectedId}
            densityByProvince={density}
            heatLegend={heatLegend}
          />
        </View>
      </ScrollView>
      <ProvinceModal
        provinceId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </View>
  );
}
