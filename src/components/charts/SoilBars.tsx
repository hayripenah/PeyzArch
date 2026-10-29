import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { ProvinceEnvironment } from '../../types/environment';
import { colors, fonts } from '../../theme/colors';

type Props = {
  env: ProvinceEnvironment;
};

function Bar({
  label,
  value,
  max,
  unit,
}: {
  label: string;
  value: number | null;
  max: number;
  unit: string;
}) {
  const w = useSharedValue(0);
  const pct = value == null ? 0 : Math.min(1, value / max);

  useEffect(() => {
    w.value = withTiming(pct, { duration: 800 });
  }, [pct, w]);

  const style = useAnimatedStyle(() => ({
    width: `${w.value * 100}%`,
  }));

  return (
    <View style={{ marginBottom: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 4,
        }}
      >
        <Text style={{ fontFamily: fonts.body, fontSize: 12, color: colors.textMuted }}>
          {label}
        </Text>
        <Text style={{ fontFamily: fonts.bodySemi, fontSize: 12, color: colors.text }}>
          {value == null ? '—' : `${value}${unit}`}
        </Text>
      </View>
      <View
        style={{
          height: 8,
          borderRadius: 999,
          backgroundColor: colors.bgSoft,
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={[
            {
              height: '100%',
              borderRadius: 999,
              backgroundColor: colors.accent,
            },
            style,
          ]}
        />
      </View>
    </View>
  );
}

export function SoilBars({ env }: Props) {
  return (
    <View style={{ paddingTop: 12 }}>
      <Bar label="pH" value={env.soil.ph} max={14} unit="" />
      <Bar label="Organik karbon" value={env.soil.organicCarbonGkg} max={60} unit=" g/kg" />
      <Bar label="Kil" value={env.soil.clayPct} max={100} unit="%" />
      <Bar label="Kum" value={env.soil.sandPct} max={100} unit="%" />
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: 11,
          color: colors.textMuted,
          marginTop: 4,
        }}
      >
        {env.source.soil} · 0–5 cm
      </Text>
    </View>
  );
}
