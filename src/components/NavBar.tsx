import { Text, View } from 'react-native';
import { colors, fonts } from '../theme/colors';

export function NavBar() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: colors.surfaceGlass,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.display,
          fontSize: 22,
          color: colors.text,
          letterSpacing: 0.3,
          fontWeight: '600',
        }}
      >
        PeyzArch
      </Text>
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: 13,
          color: colors.textMuted,
        }}
      >
        Bitki Arşivi
      </Text>
    </View>
  );
}
