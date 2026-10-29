import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { ProvinceEnvironment } from '../../types/environment';
import { colors, fonts } from '../../theme/colors';
import { RingGauge } from './RingGauge';

type Props = {
  env: ProvinceEnvironment;
};

function fmt(n: number | null, unit = '', d = 1) {
  if (n == null) return '—';
  const s = Number.isInteger(n) ? String(n) : n.toFixed(d);
  return unit ? `${s}${unit}` : s;
}

export function ClimateHeroCard({ env }: Props) {
  const temp = env.climate.tempNowC;
  const hum = env.climate.humidityPct ?? 0;
  const max = env.climate.tempMaxAvgC;
  const min = env.climate.tempMinAvgC;
  const precip = env.climate.precipWeekMm;

  return (
    <View style={{ paddingTop: 12, gap: 14 }}>
      <LinearGradient
        colors={['#E8F0EA', '#F7F5F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 18,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: fonts.body,
              fontSize: 12,
              color: colors.textMuted,
              marginBottom: 4,
            }}
          >
            Anlık · {env.elevationM != null ? `${env.elevationM} m` : '—'}
          </Text>
          <Text
            style={{
              fontFamily: fonts.display,
              fontSize: 48,
              lineHeight: 54,
              color: colors.text,
            }}
          >
            {fmt(temp, '°')}
          </Text>
          <Text
            style={{
              fontFamily: fonts.body,
              fontSize: 13,
              color: colors.textMuted,
              marginTop: 4,
            }}
          >
            7g {fmt(min, '°')} – {fmt(max, '°')} · yağış {fmt(precip, ' mm')}
          </Text>
        </View>
        <RingGauge
          progress={hum / 100}
          label="Nem"
          valueText={fmt(hum, '%', 0)}
          color={colors.accent}
        />
      </LinearGradient>

      <View
        style={{
          height: 10,
          borderRadius: 999,
          backgroundColor: colors.bgSoft,
          overflow: 'hidden',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            width: `${Math.min(100, Math.max(8, (precip ?? 0) * 4))}%`,
            backgroundColor: colors.accent,
            borderRadius: 999,
          }}
        />
      </View>
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: 11,
          color: colors.textMuted,
          marginTop: -8,
        }}
      >
        7 günlük yağış bandı
      </Text>
    </View>
  );
}
