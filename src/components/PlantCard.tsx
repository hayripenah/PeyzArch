import { useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  Text,
  UIManager,
  View,
} from 'react-native';
import type { ArchivePlant } from '../types/plant';
import { colors, fonts } from '../theme/colors';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  plant: ArchivePlant;
};

function Row({ label, value }: { label: string; value: string }) {
  if (!value || value === 'Belirtilmemiş') return null;
  return (
    <View style={{ marginBottom: 8 }}>
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: 11,
          color: colors.textMuted,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: 13,
          lineHeight: 18,
          color: colors.text,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export function PlantCard({ plant }: Props) {
  const [open, setOpen] = useState(false);
  const imgs = plant.images?.length ? plant.images : plant.image ? [plant.image] : [];

  return (
    <View
      style={{
        marginBottom: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        overflow: 'hidden',
      }}
    >
      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOpen((v) => !v);
        }}
        style={({ pressed }) => ({
          flexDirection: 'row',
          gap: 12,
          padding: 12,
          backgroundColor: pressed ? colors.bgSoft : colors.surface,
        })}
      >
        {imgs[0] ? (
          <Image
            source={{ uri: imgs[0] }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 10,
              backgroundColor: colors.bgSoft,
            }}
          />
        ) : (
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 10,
              backgroundColor: colors.bgSoft,
            }}
          />
        )}
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text
            style={{
              fontFamily: fonts.bodySemi,
              fontSize: 15,
              color: colors.text,
            }}
            numberOfLines={1}
          >
            {plant.nameTr}
          </Text>
          <Text
            style={{
              fontFamily: fonts.body,
              fontSize: 12,
              fontStyle: 'italic',
              color: colors.textMuted,
            }}
            numberOfLines={1}
          >
            {plant.nameLa}
          </Text>
          <Text
            style={{
              fontFamily: fonts.body,
              fontSize: 11,
              color: colors.textMuted,
              marginTop: 4,
            }}
            numberOfLines={1}
          >
            {plant.plantType} · {plant.heightM}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: fonts.bodySemi,
            fontSize: 18,
            color: open ? colors.accent : colors.textMuted,
            alignSelf: 'center',
          }}
        >
          {open ? '−' : '+'}
        </Text>
      </Pressable>

      {open ? (
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: colors.border,
            padding: 12,
            backgroundColor: colors.bg,
          }}
        >
          {imgs.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 12 }}
              contentContainerStyle={{ gap: 8 }}
            >
              {imgs.map((uri) => (
                <Image
                  key={uri}
                  source={{ uri }}
                  style={{
                    width: 140,
                    height: 100,
                    borderRadius: 10,
                    backgroundColor: colors.bgSoft,
                  }}
                />
              ))}
            </ScrollView>
          ) : null}

          <Row label="Form / boyut" value={plant.formAndSize} />
          <Row label="Taç çapı" value={plant.crownDiameterM} />
          <Row label="Yaprak durumu" value={plant.foliageStatus} />
          <Row label="Yaprak karakteri" value={plant.leafCharacter} />
          <Row label="Çiçek / meyve" value={plant.flowerAndFruit} />
          <Row label="Peyzaj kullanımı" value={plant.landscapeUse} />
          <Row label="Ekolojik tolerans" value={plant.ecologicalTolerance} />
          <Row label="Maliyet / temin" value={plant.costArchitecture} />
          <Row
            label="Bölge"
            value={`${plant.region} · ${plant.city}`}
          />
        </View>
      ) : null}
    </View>
  );
}
