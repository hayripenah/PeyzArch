import {
  ActivityIndicator,
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
import { useProvinceEnvironment } from '../hooks/useProvinceEnvironment';
import { colors, fonts } from '../theme/colors';
import { PlantCard } from './PlantCard';

type Props = {
  provinceId: string | null;
  onClose: () => void;
};

function fmt(value: number | null | undefined, unit = '', digits = 1): string {
  if (value == null || Number.isNaN(value)) return '—';
  const n = Number.isInteger(value) ? String(value) : value.toFixed(digits);
  return unit ? `${n} ${unit}` : n;
}

export function ProvinceModal({ provinceId, onClose }: Props) {
  const { height } = useWindowDimensions();
  const province = provinceId ? provincesById[provinceId] : null;
  const plants = provinceId ? getPlantsForProvince(provinceId) : [];
  const { data: env, loading, error } = useProvinceEnvironment(provinceId);

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
              <Text style={styles.sectionTitle}>Canlı çevre verisi</Text>
              {loading ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator color={colors.accent} />
                  <Text style={styles.loadingText}>API’den alınıyor…</Text>
                </View>
              ) : null}
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              {!loading && env ? (
                <>
                  <View style={styles.grid}>
                    <Info
                      label="Yükselti"
                      value={fmt(env.elevationM, 'm', 0)}
                    />
                    <Info
                      label="Anlık sıcaklık"
                      value={fmt(env.climate.tempNowC, '°C')}
                    />
                    <Info
                      label="Nem"
                      value={fmt(env.climate.humidityPct, '%', 0)}
                    />
                    <Info
                      label="7g ort. max / min"
                      value={`${fmt(env.climate.tempMaxAvgC, '°C')} / ${fmt(env.climate.tempMinAvgC, '°C')}`}
                    />
                    <Info
                      label="7g toplam yağış"
                      value={fmt(env.climate.precipWeekMm, 'mm')}
                    />
                  </View>

                  <Text style={styles.sectionTitle}>Güneş</Text>
                  <View style={styles.grid}>
                    <Info
                      label="Anlık kısa dalga ışınım"
                      value={fmt(env.sun.radiationNowWm2, 'W/m²', 0)}
                    />
                    <Info
                      label="7g güneşlenme"
                      value={fmt(env.sun.sunshineWeekHours, 'saat')}
                    />
                  </View>

                  <Text style={styles.sectionTitle}>Rüzgar</Text>
                  <View style={styles.grid}>
                    <Info
                      label="Anlık hız / yön"
                      value={`${fmt(env.wind.speedNowKmh, 'km/h')} · ${env.wind.directionNowLabel ?? '—'} (${fmt(env.wind.directionNowDeg, '°', 0)})`}
                    />
                    <Info
                      label="7g baskın yön"
                      value={`${env.wind.dominantWeekLabel ?? '—'} (${fmt(env.wind.dominantWeekDeg, '°', 0)})`}
                    />
                    <Info
                      label="7g max hız"
                      value={fmt(env.wind.maxWeekKmh, 'km/h')}
                    />
                  </View>

                  <Text style={styles.sectionTitle}>Toprak (0–5 cm)</Text>
                  <View style={styles.grid}>
                    <Info label="pH" value={fmt(env.soil.ph)} />
                    <Info
                      label="Organik karbon"
                      value={fmt(env.soil.organicCarbonGkg, 'g/kg')}
                    />
                    <Info label="Kil" value={fmt(env.soil.clayPct, '%')} />
                    <Info label="Kum" value={fmt(env.soil.sandPct, '%')} />
                  </View>

                  <Text style={styles.source}>
                    Kaynak: {env.source.weather} · {env.source.soil}
                    {'\n'}
                    İl merkezi noktası · güncellendi{' '}
                    {new Date(env.fetchedAt).toLocaleString('tr-TR')}
                  </Text>
                </>
              ) : null}

              <Text style={styles.sectionTitle}>Peyzaj özeti</Text>
              <View style={styles.grid}>
                <Info label="Köppen (referans)" value={province?.climate.koppen ?? ''} />
                <Info
                  label="Toprak / nem (referans)"
                  value={province?.landscape.soilMoisture ?? ''}
                />
                <Info
                  label="Sulama (referans)"
                  value={province?.landscape.irrigation ?? ''}
                />
              </View>
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
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  loadingText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
  },
  errorText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: '#8B3A3A',
    marginBottom: 12,
  },
  source: {
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textMuted,
    marginBottom: 16,
  },
});
