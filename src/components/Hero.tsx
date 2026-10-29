import {
  ImageBackground,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { colors, fonts } from '../theme/colors';

/** Peyzaj atmosferi — full-bleed hero */
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=80';

type Props = {
  onExplore: () => void;
};

export function Hero({ onExplore }: Props) {
  const { height } = useWindowDimensions();
  const heroHeight = Math.max(height, 640);

  return (
    <View style={{ height: heroHeight, width: '100%' }}>
      <ImageBackground
        source={{ uri: HERO_IMAGE }}
        style={{ flex: 1, width: '100%' }}
        resizeMode="cover"
      >
        {/* Soft read-legibility veil — not a card */}
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(243, 241, 236, 0.28)',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingTop: 72,
            paddingBottom: 88,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.display,
              fontSize: 64,
              lineHeight: 72,
              color: colors.text,
              textAlign: 'center',
              fontWeight: '600',
              marginBottom: 14,
              textShadowColor: 'rgba(255,255,255,0.55)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 8,
            }}
          >
            PeyzArch
          </Text>

          <Text
            style={{
              fontFamily: fonts.body,
              fontSize: 18,
              lineHeight: 28,
              color: colors.text,
              textAlign: 'center',
              maxWidth: 420,
              marginBottom: 28,
              opacity: 0.85,
            }}
          >
            Türkiye illerine göre peyzaj bitki arşivi.
          </Text>

          <Pressable
            onPress={onExplore}
            accessibilityRole="button"
            accessibilityLabel="Haritayı aç"
            style={({ pressed }) => ({
              backgroundColor: pressed ? colors.accentHover : colors.accent,
              paddingHorizontal: 26,
              paddingVertical: 14,
              borderRadius: 999,
              shadowColor: '#2A2A28',
              shadowOpacity: 0.18,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 6 },
              elevation: 4,
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
              Haritayı aç →
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 28,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}
        >
          <Pressable
            onPress={onExplore}
            accessibilityRole="button"
            accessibilityLabel="Aşağı kaydır"
            style={{
              backgroundColor: 'rgba(42, 42, 40, 0.45)',
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 999,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.bodySemi,
                fontSize: 12,
                letterSpacing: 1.2,
                color: colors.white,
                fontWeight: '600',
              }}
            >
              SCROLL ↓
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
