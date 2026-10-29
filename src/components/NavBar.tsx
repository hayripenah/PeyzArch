import { useEffect, useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { searchCatalog, type SearchResult } from '../lib/search';
import { colors, fonts } from '../theme/colors';

type Props = {
  onMapPress: () => void;
  onSearchSelect: (result: SearchResult) => void;
  activeQuery?: string | null;
  onClearSearch?: () => void;
};

const kindLabel: Record<SearchResult['kind'], string> = {
  province: 'İl',
  region: 'Bölge',
  plant: 'Bitki',
  plantType: 'Tür',
};

const PILL = 999;

export function NavBar({
  onMapPress,
  onSearchSelect,
  activeQuery,
  onClearSearch,
}: Props) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (activeQuery != null) setQuery(activeQuery);
  }, [activeQuery]);

  const results = useMemo(() => searchCatalog(query, 10), [query]);
  const showDropdown = focused && query.trim().length > 0 && results.length > 0;

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        top: Platform.OS === 'web' ? 16 : 44,
        left: 0,
        right: 0,
        zIndex: 50,
        alignItems: 'center',
        paddingHorizontal: 12,
      }}
    >
      <View style={{ maxWidth: 860, width: '100%', position: 'relative' }}>
        {/* Ana kapsül — her zaman tam yuvarlak + beyaz border */}
        <View
          style={{
            borderRadius: PILL,
            overflow: 'hidden',
            borderWidth: 1.5,
            borderColor: '#FFFFFF',
            backgroundColor: 'rgba(247, 245, 241, 0.78)',
            shadowColor: '#2A2A28',
            shadowOpacity: 0.14,
            shadowRadius: 24,
            shadowOffset: { width: 0, height: 8 },
            elevation: 8,
          }}
        >
          <BlurView intensity={40} tint="light">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 6,
                paddingHorizontal: 8,
                gap: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.display,
                  fontSize: 17,
                  color: colors.text,
                  fontWeight: '600',
                  paddingLeft: 10,
                }}
              >
                PeyzArch
              </Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.white,
                  borderRadius: PILL,
                  borderWidth: 1.5,
                  borderColor: '#FFFFFF',
                  paddingHorizontal: 14,
                  minHeight: 40,
                  shadowColor: '#2A2A28',
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 2 },
                }}
              >
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  onFocus={() => setFocused(true)}
                  onBlur={() => {
                    setTimeout(() => setFocused(false), 180);
                  }}
                  placeholder="Bölge, il veya bitki ara…"
                  placeholderTextColor={colors.textMuted}
                  style={
                    {
                      flex: 1,
                      fontFamily: fonts.body,
                      fontSize: 14,
                      color: colors.text,
                      paddingVertical: Platform.OS === 'web' ? 8 : 6,
                      outlineStyle: 'none',
                    } as never
                  }
                />
                {query.length > 0 ? (
                  <Pressable
                    onPress={() => {
                      setQuery('');
                      onClearSearch?.();
                    }}
                    hitSlop={8}
                  >
                    <Text
                      style={{
                        fontFamily: fonts.body,
                        color: colors.textMuted,
                        fontSize: 13,
                      }}
                    >
                      Temizle
                    </Text>
                  </Pressable>
                ) : null}
              </View>

              <Pressable
                onPress={onMapPress}
                accessibilityRole="button"
                accessibilityLabel="Haritayı aç"
                style={({ pressed }) => ({
                  backgroundColor: pressed ? colors.accentHover : colors.accent,
                  paddingHorizontal: 18,
                  minHeight: 40,
                  justifyContent: 'center',
                  borderRadius: PILL,
                  borderWidth: 1.5,
                  borderColor: '#FFFFFF',
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

        {/* Sonuçlar — ayrı soft pill panel, kapsülü bozmaz */}
        {showDropdown ? (
          <View
            style={{
              marginTop: 8,
              borderRadius: 22,
              overflow: 'hidden',
              borderWidth: 1.5,
              borderColor: '#FFFFFF',
              backgroundColor: 'rgba(247, 245, 241, 0.95)',
              maxHeight: 300,
              shadowColor: '#2A2A28',
              shadowOpacity: 0.12,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 6 },
              elevation: 6,
            }}
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              {results.map((r) => (
                <Pressable
                  key={r.id}
                  onPress={() => {
                    setQuery(r.title);
                    setFocused(false);
                    onSearchSelect(r);
                  }}
                  style={({ pressed }) => ({
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor: pressed ? colors.accentSoft : 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  })}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: fonts.bodySemi,
                        fontSize: 10,
                        color: colors.accent,
                        backgroundColor: colors.accentSoft,
                        overflow: 'hidden',
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        borderRadius: PILL,
                      }}
                    >
                      {kindLabel[r.kind]}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.bodySemi,
                        fontSize: 14,
                        color: colors.text,
                        flex: 1,
                      }}
                      numberOfLines={1}
                    >
                      {r.title}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 12,
                      color: colors.textMuted,
                      marginTop: 2,
                    }}
                    numberOfLines={1}
                  >
                    {r.subtitle}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        ) : null}
      </View>
    </View>
  );
}
