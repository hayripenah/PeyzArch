import { Platform, Pressable, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, fonts } from '../theme/colors';

type Props = {
  onMapPress: () => void;
};

export function NavBar({ onMapPress }: Props) {
  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        top: Platform.OS === 'web' ? 20 : 48,
        left: 0,
        right: 0,
        zIndex: 40,
        alignItems: 'center',
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          maxWidth: 720,
          width: '100%',
          borderRadius: 999,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.55)',
          backgroundColor: 'rgba(247, 245, 241, 0.55)',
          shadowColor: '#2A2A28',
          shadowOpacity: 0.12,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 8 },
          elevation: 6,
        }}
      >
        <BlurView intensity={35} tint="light" style={{ width: '100%' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 10,
              paddingHorizontal: 16,
              gap: 12,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: 20,
                color: colors.text,
                fontWeight: '600',
              }}
            >
              PeyzArch
            </Text>

            <Text
              style={{
                fontFamily: fonts.body,
                fontSize: 14,
                color: colors.textMuted,
                flexShrink: 1,
              }}
              numberOfLines={1}
            >
              Bitki Arşivi
            </Text>

            <Pressable
              onPress={onMapPress}
              accessibilityRole="button"
              accessibilityLabel="Haritayı aç"
              style={({ pressed }) => ({
                backgroundColor: pressed ? colors.accentHover : colors.accent,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 999,
              })}
            >
              <Text
                style={{
                  fontFamily: fonts.bodySemi,
                  fontSize: 13,
                  color: colors.white,
                  fontWeight: '600',
                }}
              >
                Harita
              </Text>
            </Pressable>
          </View>
        </BlurView>
      </View>
    </View>
  );
}
