import { useEffect, useState } from 'react';
import {
  LayoutChangeEvent,
  Platform,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { MAP_VIEWBOX, turkeyProvincePaths } from '../data/turkeyPaths';
import { provincesById } from '../data/provinces';
import {
  formatCoord,
  layoutToSvg,
  svgToLonLat,
  type LonLat,
} from '../lib/geoProjection';
import { densityColor } from '../lib/search';
import { colors, fonts } from '../theme/colors';

type Props = {
  selectedId: string | null;
  onSelect: (id: string) => void;
  densityByProvince?: Record<string, number> | null;
  heatLegend?: string | null;
  onPointerGeo?: (geo: LonLat | null) => void;
};

export function TurkeyMap({
  selectedId,
  onSelect,
  densityByProvince,
  heatLegend,
  onPointerGeo,
}: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [pointerLabel, setPointerLabel] = useState<string | null>(null);

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

  const reportPointer = (localX: number, localY: number) => {
    const { x, y } = layoutToSvg(localX, localY, svgWidth, height);
    const geo = svgToLonLat(x, y);
    if (
      geo.lon < 25 ||
      geo.lon > 46 ||
      geo.lat < 35 ||
      geo.lat > 43
    ) {
      setPointerLabel(null);
      onPointerGeo?.(null);
      return;
    }
    setPointerLabel(`${formatCoord(geo.lat)}°N  ${formatCoord(geo.lon)}°E`);
    onPointerGeo?.(geo);
  };

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingBottom: 12,
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
          : 'Hover: il + bölge · imleç: enlem/boylam · tık: veri paneli'}
      </Text>

      <View
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1.5,
          borderColor: '#FFFFFF',
          borderRadius: 20,
          padding: 16,
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          // 2.5D kart derinliği
          shadowColor: '#2A2A28',
          shadowOpacity: 0.14,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          elevation: 6,
          ...(Platform.OS === 'web'
            ? ({ transform: 'perspective(900px) rotateX(2deg)' } as object)
            : {}),
        }}
      >
        {(hovered || pathMeta) && (
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 12,
              zIndex: 5,
              backgroundColor: 'rgba(42, 42, 40, 0.9)',
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.25)',
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

        {pointerLabel ? (
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: hasHeat ? 52 : 14,
              zIndex: 5,
              backgroundColor: 'rgba(247, 245, 241, 0.95)',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
              borderWidth: 1.5,
              borderColor: '#FFFFFF',
            }}
          >
            <Text
              style={{
                fontFamily: fonts.bodySemi,
                fontSize: 11,
                color: colors.text,
                letterSpacing: 0.3,
              }}
            >
              {pointerLabel}
            </Text>
          </View>
        ) : null}

        <View
          {...(Platform.OS === 'web'
            ? ({
                onMouseMove: (e: {
                  nativeEvent?: { offsetX?: number; offsetY?: number };
                }) => {
                  const ox = e.nativeEvent?.offsetX;
                  const oy = e.nativeEvent?.offsetY;
                  if (typeof ox === 'number' && typeof oy === 'number') {
                    reportPointer(ox, oy);
                  }
                },
                onMouseLeave: () => {
                  setPointerLabel(null);
                  onPointerGeo?.(null);
                },
              } as object)
            : {})}
        >
          <Svg
            width={svgWidth}
            height={height}
            viewBox={MAP_VIEWBOX}
            accessibilityLabel="Türkiye iller haritası"
          >
            <G opacity={0.2} transform="translate(0, 3)">
              {turkeyProvincePaths.map((p) => (
                <Path
                  key={`sh-${p.id}`}
                  d={p.d}
                  fill="#2A2A28"
                  stroke="none"
                />
              ))}
            </G>
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
                  strokeWidth={active || isHover ? 1.1 : 0.55}
                  transform={
                    active || isHover ? 'translate(0, -1.5)' : undefined
                  }
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
