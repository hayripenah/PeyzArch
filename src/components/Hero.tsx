import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../theme/colors';

type Props = {
  onExplore: () => void;
};

export function Hero({ onExplore }: Props) {
  return (
    <View
      style={{
        minHeight: 520,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 64,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <LinearGradient
        colors={['#EBE8E2', '#F3F1EC', '#E4EBE5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      <View
        style={{
          maxWidth: 560,
          alignSelf: 'center',
          width: '100%',
          backgroundColor: 'rgba(247, 245, 241, 0.78)',
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 20,
          paddingVertical: 40,
          paddingHorizontal: 32,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.display,
            fontSize: 56,
            lineHeight: 64,
            color: colors.text,
            marginBottom: 12,
            fontWeight: '600',
          }}
        >
          PeyzArch
        </Text>
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: 18,
            lineHeight: 28,
            color: colors.textMuted,
            marginBottom: 28,
          }}
        >
          Türkiye illerine göre peyzaj bitki arşivi.
        </Text>
        <Pressable
          onPress={onExplore}
          accessibilityRole="button"
          accessibilityLabel="Haritaya git"
          style={({ pressed }) => ({
            alignSelf: 'flex-start',
            backgroundColor: pressed ? colors.accentHover : colors.accent,
            paddingHorizontal: 22,
            paddingVertical: 14,
            borderRadius: 10,
          })}
        >
          <Text
            style={{
              fontFamily: fonts.bodySemi,
              fontSize: 16,
              color: colors.white,
              fontWeight: '600',
            }}
          >
            Haritayı aç
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
