import { useState } from 'react';
import { LayoutChangeEvent, Platform, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MAP_VIEWBOX, turkeyProvincePaths } from '../data/turkeyPaths';
import { colors, fonts } from '../theme/colors';

type Props = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function TurkeyMap({ selectedId, onSelect }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const [, , vbW, vbH] = MAP_VIEWBOX.split(' ').map(Number);
  const height = width > 0 ? (width * vbH) / vbW : 220;

  return (
    <View style={styles.section} onLayout={onLayout}>
      <Text style={styles.hint}>Bir il seçin</Text>
      <View style={styles.mapCard}>
        {width > 0 && (
          <Svg
            width={width - 32}
            height={height}
            viewBox={MAP_VIEWBOX}
            accessibilityLabel="Türkiye iller haritası"
          >
            {turkeyProvincePaths.map((p) => {
              const active = selectedId === p.id;
              const hovered = hoveredId === p.id;
              return (
                <Path
                  key={p.id}
                  d={p.d}
                  fill={
                    active
                      ? colors.mapSelected
                      : hovered
                        ? colors.mapHover
                        : colors.mapFill
                  }
                  stroke={colors.mapStroke}
                  strokeWidth={0.6}
                  accessibilityLabel={p.name}
                  onPress={() => onSelect(p.id)}
                  {...(Platform.OS === 'web'
                    ? ({
                        onMouseEnter: () => setHoveredId(p.id),
                        onMouseLeave: () => setHoveredId(null),
                        cursor: 'pointer',
                      } as Record<string, unknown>)
                    : {})}
                />
              );
            })}
          </Svg>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingBottom: 48,
    paddingTop: 8,
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 12,
  },
  mapCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },
});
