import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../theme/colors';

type Props = {
  onExplore: () => void;
};

export function Hero({ onExplore }: Props) {
  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={['#EBE8E2', '#F3F1EC', '#E4EBE5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.glass}>
        <Text style={styles.brand}>PeyzArch</Text>
        <Text style={styles.lead}>
          Türkiye illerine göre peyzaj bitki arşivi.
        </Text>
        <Pressable
          onPress={onExplore}
          style={({ pressed }) => [
            styles.cta,
            pressed && { backgroundColor: colors.accentHover },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Haritaya git"
        >
          <Text style={styles.ctaText}>Haritayı aç</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 520,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 64,
  },
  glass: {
    maxWidth: 560,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: colors.surfaceGlass,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  brand: {
    fontFamily: fonts.display,
    fontSize: 56,
    lineHeight: 64,
    color: colors.text,
    marginBottom: 12,
  },
  lead: {
    fontFamily: fonts.body,
    fontSize: 18,
    lineHeight: 28,
    color: colors.textMuted,
    marginBottom: 28,
  },
  cta: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 10,
  },
  ctaText: {
    fontFamily: fonts.bodySemi,
    fontSize: 16,
    color: colors.white,
  },
});
