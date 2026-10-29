import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { provincesById } from '../data/provinces';
import { getPlantsForProvince } from '../data/plants';
import { colors, fonts } from '../theme/colors';
import { PlantCard } from './PlantCard';

type Props = {
  provinceId: string | null;
  onClose: () => void;
};

export function ProvinceModal({ provinceId, onClose }: Props) {
  const { height } = useWindowDimensions();
  const province = provinceId ? provincesById[provinceId] : null;
  const plants = provinceId ? getPlantsForProvince(provinceId) : [];

  return (
    <Modal
      visible={!!province}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={[styles.sheet, { maxHeight: height * 0.88 }]}>
          <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
          <View style={styles.sheetInner}>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>{province?.name}</Text>
                <Text style={styles.sub}>
                  {province?.region} · Plaka {province?.id}
                </Text>
              </View>
              <Pressable
                onPress={onClose}
                style={styles.close}
                accessibilityRole="button"
                accessibilityLabel="Kapat"
              >
                <Text style={styles.closeText}>Kapat</Text>
              </Pressable>
            </View>

            <ScrollView
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.sectionTitle}>İklim</Text>
              <View style={styles.grid}>
                <Info label="Köppen" value={province?.climate.koppen ?? ''} />
                <Info label="Yağış (mm)" value={province?.climate.rainfallMm ?? ''} />
                <Info label="Ort. sıcaklık (°C)" value={province?.climate.tempC ?? ''} />
                <Info label="Don riski" value={province?.climate.frostRisk ?? ''} />
                <Info label="Yükselti (m)" value={province?.climate.elevationM ?? ''} />
              </View>

              <Text style={styles.sectionTitle}>Peyzaj</Text>
              <Info label="Toprak / nem" value={province?.landscape.soilMoisture ?? ''} />
              <Info label="Sulama" value={province?.landscape.irrigation ?? ''} />
              <Text style={styles.strategy}>{province?.landscape.strategy}</Text>

              <Text style={styles.sectionTitle}>
                Bitki arşivi ({plants.length})
              </Text>
              {plants.length === 0 ? (
                <Text style={styles.empty}>
                  Bu il için test kaydı henüz eklenmedi.
                </Text>
              ) : (
                plants.map((plant) => <PlantCard key={plant.id} plant={plant} />)
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.info}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    padding: 16,
  },
  sheet: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceGlass,
  },
  sheetInner: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.text,
  },
  sub: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  close: {
    backgroundColor: colors.bgSoft,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  closeText: {
    fontFamily: fonts.bodySemi,
    fontSize: 13,
    color: colors.text,
  },
  content: {
    padding: 20,
    paddingBottom: 36,
  },
  sectionTitle: {
    fontFamily: fonts.bodySemi,
    fontSize: 15,
    color: colors.accent,
    marginTop: 8,
    marginBottom: 10,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  grid: {
    gap: 8,
    marginBottom: 8,
  },
  info: {
    marginBottom: 8,
  },
  infoLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
  },
  infoValue: {
    fontFamily: fonts.bodySemi,
    fontSize: 15,
    color: colors.text,
  },
  strategy: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: colors.text,
    marginBottom: 12,
  },
  empty: {
    fontFamily: fonts.body,
    color: colors.textMuted,
  },
});
