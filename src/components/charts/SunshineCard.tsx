import { Text, View } from 'react-native';
import type { ProvinceEnvironment } from '../../types/environment';
import { colors, fonts } from '../../theme/colors';
import { RingGauge } from './RingGauge';

type Props = {
  env: ProvinceEnvironment;
};

export function SunshineCard({ env }: Props) {
  const rad = env.sun.radiationNowWm2 ?? 0;
  const hours = env.sun.sunshineWeekHours ?? 0;
  // ~1000 W/m² öğlen ölçeği; 7g ~ 50 saat üst sınır yaklaşık
  const radP = Math.min(1, rad / 900);
  const sunP = Math.min(1, hours / 50);

  return (
    <View
      style={{
        paddingTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 8,
      }}
    >
      <RingGauge
        progress={radP}
        label="Işınım"
        valueText={rad ? `${Math.round(rad)}` : '—'}
        color="#C4A35A"
        size={96}
      />
      <View style={{ justifyContent: 'center', flex: 1, paddingLeft: 8 }}>
        <Text
          style={{
            fontFamily: fonts.bodySemi,
            fontSize: 22,
            color: colors.text,
          }}
        >
          {hours ? `${hours.toFixed(1)} saat` : '—'}
        </Text>
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: 13,
            color: colors.textMuted,
            marginTop: 4,
          }}
        >
          7 günlük güneşlenme
        </Text>
        <View
          style={{
            marginTop: 12,
            height: 8,
            borderRadius: 999,
            backgroundColor: colors.bgSoft,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${sunP * 100}%`,
              height: '100%',
              backgroundColor: '#C4A35A',
              borderRadius: 999,
            }}
          />
        </View>
      </View>
    </View>
  );
}
