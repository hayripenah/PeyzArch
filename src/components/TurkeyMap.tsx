import { useEffect, useState } from 'react';
import {
  LayoutChangeEvent,
  Platform,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MAP_VIEWBOX, turkeyProvincePaths } from '../data/turkeyPaths';
import { colors, fonts } from '../theme/colors';

type Props = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function TurkeyMap({ selectedId, onSelect }: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [layoutWidth, setLayoutWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0) setLayoutWidth(w);
  };

  useEffect(() => {
    if (layoutWidth === 0 && windowWidth > 0) {
      setLayoutWidth(Math.min(windowWidth - 32, 1100));
    }
  }, [layoutWidth, windowWidth]);

  const width = layoutWidth > 0 ? layoutWidth : Math.min(windowWidth - 32, 1100);
  const [, , vbW, vbH] = MAP_VIEWBOX.split(' ').map(Number);
  const svgWidth = Math.max(width - 32, 280);
  const height = (svgWidth * vbH) / vbW;

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingBottom: 48,
        paddingTop: 8,
        width: '100%',
      }}
      onLayout={onLayout}
    >
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: 14,
          color: colors.textMuted,
          textAlign: 'center',
          marginBottom: 12,
        }}
      >
        Bir il seçin
      </Text>
      <View
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 16,
          padding: 16,
          alignItems: 'center',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Svg
          width={svgWidth}
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
      </View>
    </View>
  );
}
