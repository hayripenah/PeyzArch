import { Image, StyleSheet, Text, View } from 'react-native';
import type { Plant } from '../types/plant';
import { colors, fonts } from '../theme/colors';

type Props = {
  plant: Plant;
};

export function PlantCard({ plant }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: plant.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.nameTr}>{plant.nameTr}</Text>
        <Text style={styles.nameLa}>{plant.nameLa}</Text>
        <Text style={styles.meta}>
          {plant.habit} · {plant.heightM} m · {plant.light}
        </Text>
        <Text style={styles.desc} numberOfLines={3}>
          {plant.description}
        </Text>
        <View style={styles.tags}>
          <Text style={styles.tag}>{plant.water} su</Text>
          <Text style={styles.tag}>{plant.hardiness}</Text>
          {plant.endemic ? <Text style={styles.tagAccent}>Endemik</Text> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 10,
    backgroundColor: colors.bgSoft,
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  nameTr: {
    fontFamily: fonts.bodySemi,
    fontSize: 16,
    color: colors.text,
  },
  nameLa: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.textMuted,
    marginBottom: 4,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 6,
  },
  desc: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.text,
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.textMuted,
    backgroundColor: colors.bgSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  tagAccent: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    color: colors.accent,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
