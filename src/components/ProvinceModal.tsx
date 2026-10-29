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
import {
  getArchivePlantsForProvince,
  getRegionArchiveForProvince,
} from '../data/archivePlants';
import { provincesById } from '../data/provinces';
import { useProvinceEnvironment } from '../hooks/useProvinceEnvironment';
import { colors, fonts } from '../theme/colors';
import { AccordionSection } from './AccordionSection';
import { ClimateHeroCard } from './charts/ClimateHeroCard';
import { SoilBars } from './charts/SoilBars';
import { SunshineCard } from './charts/SunshineCard';
import { WindRose } from './charts/WindRose';
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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.info}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export function ProvinceModal({ provinceId, onClose }: Props) {
  const { height } = useWindowDimensions();
  const province = provinceId ? provincesById[provinceId] : null;
  const plants = provinceId ? getArchivePlantsForProvince(provinceId) : [];
  const regionArchive = provinceId
    ? getRegionArchiveForProvince(provinceId)
    : null;
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
        <View style={[styles.sheet, { maxHeight: height * 0.9 }]}>
          <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
          <View style={styles.sheetInner}>
            <View style={styles.header}>
              <View style={{ flex: 1, paddingRight: 12 }}>
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
              <AccordionSection
                title="Canlı iklim"
                subtitle={
                  loading
                    ? 'Yükleniyor…'
                    : env
                      ? `${fmt(env.climate.tempNowC, '°C')} · nem ${fmt(env.climate.humidityPct, '%', 0)}`
                      : 'Open-Meteo'
                }
                defaultOpen
              >
                {loading ? (
                  <View style={styles.loadingRow}>
                    <ActivityIndicator color={colors.accent} />
                    <Text style={styles.loadingText}>API’den alınıyor…</Text>
                  </View>
                ) : null}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                {env ? <ClimateHeroCard env={env} /> : null}
              </AccordionSection>

              <AccordionSection
                title="Güneş"
                subtitle={
                  env
                    ? `${fmt(env.sun.radiationNowWm2, 'W/m²', 0)} · ${fmt(env.sun.sunshineWeekHours, 'saat')}`
                    : undefined
                }
              >
                {env ? (
                  <SunshineCard env={env} />
                ) : (
                  <Text style={styles.empty}>Veri bekleniyor…</Text>
                )}
              </AccordionSection>

              <AccordionSection
                title="Rüzgar"
                subtitle={
                  env?.wind.directionNowLabel
                    ? `${env.wind.directionNowLabel} · ${fmt(env.wind.speedNowKmh, 'km/h')}`
                    : undefined
                }
              >
                {env ? (
                  <WindRose env={env} />
                ) : (
                  <Text style={styles.empty}>Veri bekleniyor…</Text>
                )}
              </AccordionSection>

              <AccordionSection
                title="Toprak (canlı)"
                subtitle={env ? `pH ${fmt(env.soil.ph)}` : 'SoilGrids'}
              >
                {env ? (
                  <SoilBars env={env} />
                ) : (
                  <Text style={styles.empty}>Veri bekleniyor…</Text>
                )}
              </AccordionSection>

              {regionArchive ? (
                <>
                  <AccordionSection
                    title="Bölge iklim notları"
                    subtitle={regionArchive.climateData.general_character}
                  >
                    <Text style={styles.strategy}>
                      {regionArchive.climateData.general_character}
                    </Text>
                    {regionArchive.climateData.features.map((f) => (
                      <Text key={f} style={styles.bullet}>
                        • {f}
                      </Text>
                    ))}
                  </AccordionSection>

                  <AccordionSection
                    title="Bölge toprak notları"
                    subtitle={regionArchive.soilStructure.general_character}
                  >
                    <Text style={styles.strategy}>
                      {regionArchive.soilStructure.general_character}
                    </Text>
                    {regionArchive.soilStructure.features.map((f) => (
                      <Text key={f} style={styles.bullet}>
                        • {f}
                      </Text>
                    ))}
                  </AccordionSection>
                </>
              ) : (
                <AccordionSection
                  title="Peyzaj özeti"
                  subtitle={province?.landscape.strategy}
                >
                  <Info
                    label="Köppen"
                    value={province?.climate.koppen ?? ''}
                  />
                  <Info
                    label="Toprak / nem"
                    value={province?.landscape.soilMoisture ?? ''}
                  />
                  <Info
                    label="Sulama"
                    value={province?.landscape.irrigation ?? ''}
                  />
                  <Text style={styles.strategy}>
                    {province?.landscape.strategy}
                  </Text>
                </AccordionSection>
              )}

              <AccordionSection
                title={`Bitki arşivi (${plants.length})`}
                subtitle={
                  regionArchive
                    ? `${regionArchive.city} / ${regionArchive.region}`
                    : plants.length
                      ? 'Bölgesel katalog'
                      : 'Kayıt yok'
                }
                defaultOpen={plants.length > 0}
              >
                {plants.length === 0 ? (
                  <Text style={styles.empty}>
                    Bu il için arşiv kaydı henüz eklenmedi.
                  </Text>
                ) : (
                  plants.map((plant) => (
                    <PlantCard key={plant.id} plant={plant} />
                  ))
                )}
              </AccordionSection>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
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
    padding: 16,
    paddingBottom: 36,
  },
  grid: {
    gap: 4,
    paddingTop: 10,
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
    marginTop: 10,
    marginBottom: 8,
  },
  bullet: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: colors.text,
    marginBottom: 4,
  },
  empty: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    paddingTop: 10,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
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
    paddingTop: 10,
  },
  source: {
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textMuted,
    marginTop: 4,
  },
});
