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
import { provincesById } from '../data/provinces';
import { densityColor } from '../lib/search';
import { colors, fonts } from '../theme/colors';

type Props = {
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** İl id → 0–1 yoğunluk (arama ısı haritası) */
  densityByProvince?: Record<string, number> | null;
  heatLegend?: string | null;
};

export function TurkeyMap({
  selectedId,
  onSelect,
  densityByProvince,
  heatLegend,
}: Props) {
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

  const hovered = hoveredId ? provincesById[hoveredId] : null;
  const pathMeta = hoveredId
    ? turkeyProvincePaths.find((p) => p.id === hoveredId)
    : null;
  const hasHeat = densityByProvince && Object.keys(densityByProvince).length > 0;

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
        {heatLegend
          ? heatLegend
          : 'Bir ilin üzerine gelin · tıklayınca veri paneli açılır'}
      </Text>

      <View
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 16,
          padding: 16,
          alignItems: 'center',
          width: '100%',
          position: 'relative',
        }}
      >
        {(hovered || pathMeta) && (
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 12,
              zIndex: 5,
              backgroundColor: 'rgba(42, 42, 40, 0.88)',
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 999,
              maxWidth: '90%',
            }}
          >
            <Text
              style={{
                fontFamily: fonts.bodySemi,
                fontSize: 13,
                color: colors.white,
                textAlign: 'center',
              }}
            >
              {hovered?.name ?? pathMeta?.name}
              {hovered ? ` · ${hovered.region}` : ''}
            </Text>
          </View>
        )}

        <Svg
          width={svgWidth}
          height={height}
          viewBox={MAP_VIEWBOX}
          accessibilityLabel="Türkiye iller haritası"
        >
          {turkeyProvincePaths.map((p) => {
            const active = selectedId === p.id;
            const isHover = hoveredId === p.id;
            const dens = densityByProvince?.[p.id];
            let fill: string = colors.mapFill;
            if (hasHeat) {
              fill = dens != null ? densityColor(dens) : colors.mapFill;
            }
            if (isHover) {
              fill =
                hasHeat && dens != null
                  ? densityColor(Math.min(1, dens + 0.15))
                  : colors.mapHover;
            }
            if (active) fill = colors.mapSelected;

            return (
              <Path
                key={p.id}
                d={p.d}
                fill={fill}
                stroke={active ? colors.accentHover : colors.mapStroke}
                strokeWidth={active ? 1.2 : 0.6}
                accessibilityLabel={`${p.name}${hovered?.region ? `, ${hovered.region}` : ''}`}
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

        {hasHeat ? (
          <View
            style={{
              marginTop: 14,
              width: '100%',
              maxWidth: 320,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                height: 10,
                width: '100%',
                borderRadius: 999,
                overflow: 'hidden',
                flexDirection: 'row',
              }}
            >
              {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                <View
                  key={t}
                  style={{ flex: 1, backgroundColor: densityColor(t) }}
                />
              ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 4,
              }}
            >
              <Text style={{ fontFamily: fonts.body, fontSize: 11, color: colors.textMuted }}>
                Düşük
              </Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 11, color: colors.textMuted }}>
                Yüksek yoğunluk
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}
