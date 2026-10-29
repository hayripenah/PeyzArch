import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme/colors';

export function NavBar() {
  return (
    <View style={styles.bar}>
      <Text style={styles.brand}>PeyzArch</Text>
      <Text style={styles.tag}>Bitki Arşivi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.surfaceGlass,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  brand: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.text,
    letterSpacing: 0.3,
  },
  tag: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
  },
});
