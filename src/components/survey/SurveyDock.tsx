import { Text, View } from 'react-native';
import { formatCoord } from '../../lib/geoProjection';
import { colors, fonts } from '../../theme/colors';
import { SurveyCompass } from './SurveyCompass';

type Props = {
  lon: number | null;
  lat: number | null;
  headingDeg: number;
  compassSource: string;
  provinceLabel?: string | null;
};

export function SurveyDock({
  lon,
  lat,
  headingDeg,
  compassSource,
  provinceLabel,
}: Props) {
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginBottom: 20,
        marginTop: 4,
        borderRadius: 22,
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
        backgroundColor: 'rgba(247, 245, 241, 0.92)',
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        shadowColor: '#2A2A28',
        shadowOpacity: 0.1,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
      }}
    >
      <SurveyCompass
        headingDeg={headingDeg}
        size={88}
        label={compassSource}
      />

      <View style={{ flex: 1, gap: 8 }}>
        <Text
          style={{
            fontFamily: fonts.bodySemi,
            fontSize: 11,
            letterSpacing: 0.8,
            color: colors.accent,
            textTransform: 'uppercase',
          }}
        >
          Sörvey kiti
        </Text>
        <View>
          <Text style={{ fontFamily: fonts.body, fontSize: 11, color: colors.textMuted }}>
            Enlem
          </Text>
          <Text style={{ fontFamily: fonts.bodySemi, fontSize: 16, color: colors.text }}>
            {lat != null ? `${formatCoord(lat)}°` : '—'}
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: fonts.body, fontSize: 11, color: colors.textMuted }}>
            Boylam
          </Text>
          <Text style={{ fontFamily: fonts.bodySemi, fontSize: 16, color: colors.text }}>
            {lon != null ? `${formatCoord(lon)}°` : '—'}
          </Text>
        </View>
        {provinceLabel ? (
          <Text
            style={{
              fontFamily: fonts.body,
              fontSize: 12,
              color: colors.textMuted,
            }}
          >
            {provinceLabel}
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: fonts.body,
              fontSize: 12,
              color: colors.textMuted,
            }}
          >
            Harita üzerinde gezinerek koordinat alın
          </Text>
        )}
      </View>
    </View>
  );
}
