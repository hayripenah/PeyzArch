import { useEffect, useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
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
      <View
        style={{
          maxWidth: 860,
          width: '100%',
          borderRadius: focused || showDropdown ? 22 : 999,
          overflow: 'visible',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.55)',
          backgroundColor: 'rgba(247, 245, 241, 0.72)',
          shadowColor: '#2A2A28',
          shadowOpacity: 0.14,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 8 },
          elevation: 8,
        }}
      >
        <BlurView intensity={40} tint="light" style={{ borderRadius: 22, overflow: 'hidden' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
              paddingHorizontal: 12,
              gap: 10,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: 18,
                color: colors.text,
                fontWeight: '600',
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
                borderRadius: 999,
                borderWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: 12,
                minHeight: 40,
              }}
            >
              <TextInput
                value={query}
                onChangeText={setQuery}
                onFocus={() => setFocused(true)}
                onBlur={() => {
                  // küçük gecikme: sonuç tıklaması kaçmasın
                  setTimeout(() => setFocused(false), 180);
                }}
                placeholder="Bölge, il veya bitki ara…"
                placeholderTextColor={colors.textMuted}
                style={{
                  flex: 1,
                  fontFamily: fonts.body,
                  fontSize: 14,
                  color: colors.text,
                  paddingVertical: Platform.OS === 'web' ? 8 : 6,
                  outlineStyle: 'none',
                } as never}
              />
              {query.length > 0 ? (
                <Pressable
                  onPress={() => {
                    setQuery('');
                    onClearSearch?.();
                  }}
                  hitSlop={8}
                >
                  <Text style={{ color: colors.textMuted, fontSize: 13 }}>Temizle</Text>
                </Pressable>
              ) : null}
            </View>

            <Pressable
              onPress={onMapPress}
              accessibilityRole="button"
              accessibilityLabel="Haritayı aç"
              style={({ pressed }) => ({
                backgroundColor: pressed ? colors.accentHover : colors.accent,
                paddingHorizontal: 14,
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

          {showDropdown ? (
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: colors.border,
                backgroundColor: colors.surface,
                maxHeight: 320,
              }}
            >
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
                    backgroundColor: pressed ? colors.accentSoft : colors.surface,
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
                        borderRadius: 999,
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
                      marginLeft: 2,
                    }}
                    numberOfLines={1}
                  >
                    {r.subtitle}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </BlurView>
      </View>
    </View>
  );
}
