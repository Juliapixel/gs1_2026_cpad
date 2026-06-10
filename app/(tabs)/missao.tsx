import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { FormField } from '../../components/forms/FormField';
import { FormSection } from '../../components/forms/FormSection';
import { useMission } from '../../context/MissionContext';
import { defaultMission, defaultSettings, defaultTelemetry } from '../../data/defaultMission';
import { MissionSettings, Telemetry } from '../../types/mission';
import { Errors, onlyNumber, validateMission, validateTelemetry } from '../../utils/missionValidation';

export default function Missao() {
  const {
    mission,
    settings,
    telemetry,
    updateMission,
    updateSettings,
    updateTelemetry,
    resetMission,
  } = useMission();
  const [missionDraft, setMissionDraft] = useState(mission);
  const [settingsDraft, setSettingsDraft] = useState(settings);
  const [telemetryDraft, setTelemetryDraft] = useState(telemetry);
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);

  function setNumberField(key: keyof Telemetry, value: string) {
    setTelemetryDraft((current) => ({
      ...current,
      [key]: Number(onlyNumber(value)),
    }));
  }

  function setSettingsField(key: keyof MissionSettings, value: string) {
    setSettingsDraft((current) => ({
      ...current,
      [key]: Number(onlyNumber(value)),
    }));
  }

  function save() {
    const nextErrors = {
      ...validateMission(missionDraft),
      ...validateTelemetry(telemetryDraft, settingsDraft),
    };
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSaved(false);
      return;
    }

    updateMission({
      ...missionDraft,
      name: missionDraft.name.trim(),
      commander: missionDraft.commander.trim(),
      communicationBand: missionDraft.communicationBand.trim(),
    });
    updateTelemetry(telemetryDraft);
    updateSettings(settingsDraft);
    setSaved(true);
  }

  function reset() {
    resetMission();
    setMissionDraft(defaultMission);
    setTelemetryDraft(defaultTelemetry);
    setSettingsDraft(defaultSettings);
    setErrors({});
    setSaved(false);
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.kicker}>CONFIGURACAO DE MISSAO</Text>
        <Text style={styles.title}>Entrada e atualizacao de dados</Text>
      </View>

      <FormSection title="Identificacao">
        <FormField
          label="Nome da missao"
          value={missionDraft.name}
          error={errors.name}
          onChangeText={(name) => setMissionDraft((current) => ({ ...current, name }))}
        />
        <FormField
          label="Comandante"
          value={missionDraft.commander}
          error={errors.commander}
          onChangeText={(commander) => setMissionDraft((current) => ({ ...current, commander }))}
        />
        <FormField
          label="Orbita em km"
          keyboardType="numeric"
          value={missionDraft.orbitKm}
          error={errors.orbitKm}
          onChangeText={(orbitKm) => setMissionDraft((current) => ({ ...current, orbitKm: onlyNumber(orbitKm) }))}
        />
        <FormField
          label="Banda de comunicacao"
          value={missionDraft.communicationBand}
          error={errors.communicationBand}
          onChangeText={(communicationBand) => setMissionDraft((current) => ({ ...current, communicationBand }))}
        />
      </FormSection>

      <FormSection>
        <View style={styles.switchRow}>
          <View>
            <Text style={styles.sectionTitle}>Telemetria</Text>
            <Text style={styles.helper}>Simulacao automatica atualiza os sensores a cada 5s.</Text>
          </View>
          <Switch
            value={settingsDraft.autoSimulation}
            onValueChange={(autoSimulation) => setSettingsDraft((current) => ({ ...current, autoSimulation }))}
            trackColor={{ false: '#1b3349', true: '#20768b' }}
            thumbColor={settingsDraft.autoSimulation ? '#65e4ff' : '#8da5bc'}
          />
        </View>

        <View style={styles.twoColumns}>
          <FormField
            label="Temperatura C"
            keyboardType="numeric"
            value={String(telemetryDraft.temperature)}
            error={errors.temperature}
            onChangeText={(value) => setNumberField('temperature', value)}
          />
          <FormField
            label="Bateria %"
            keyboardType="numeric"
            value={String(telemetryDraft.battery)}
            error={errors.battery}
            onChangeText={(value) => setNumberField('battery', value)}
          />
          <FormField
            label="Sinal %"
            keyboardType="numeric"
            value={String(telemetryDraft.signal)}
            error={errors.signal}
            onChangeText={(value) => setNumberField('signal', value)}
          />
          <FormField
            label="Orbital %"
            keyboardType="numeric"
            value={String(telemetryDraft.orbitalStability)}
            error={errors.orbitalStability}
            onChangeText={(value) => setNumberField('orbitalStability', value)}
          />
          <FormField
            label="Oxigenio %"
            keyboardType="numeric"
            value={String(telemetryDraft.oxygen)}
            error={errors.oxygen}
            onChangeText={(value) => setNumberField('oxygen', value)}
          />
          <FormField
            label="Radiacao mSv"
            keyboardType="numeric"
            value={String(telemetryDraft.radiation)}
            error={errors.radiation}
            onChangeText={(value) => setNumberField('radiation', value)}
          />
        </View>
      </FormSection>

      <FormSection title="Limites criticos">
        <View style={styles.twoColumns}>
          <FormField
            label="Bateria minima %"
            keyboardType="numeric"
            value={String(settingsDraft.criticalBattery)}
            error={errors.criticalBattery}
            onChangeText={(value) => setSettingsField('criticalBattery', value)}
          />
          <FormField
            label="Sinal minimo %"
            keyboardType="numeric"
            value={String(settingsDraft.criticalSignal)}
            error={errors.criticalSignal}
            onChangeText={(value) => setSettingsField('criticalSignal', value)}
          />
          <FormField
            label="Orbital minimo %"
            keyboardType="numeric"
            value={String(settingsDraft.criticalStability)}
            error={errors.criticalStability}
            onChangeText={(value) => setSettingsField('criticalStability', value)}
          />
        </View>
      </FormSection>

      {saved ? <Text style={styles.savedText}>Dados salvos</Text> : null}

      <View style={styles.actions}>
        <Pressable style={styles.saveButton} onPress={save}>
          <FontAwesome name="save" size={16} color="#07111f" />
          <Text style={styles.saveText}>Salvar</Text>
        </Pressable>
        <Pressable style={styles.resetButton} onPress={reset}>
          <FontAwesome name="refresh" size={16} color="#e8f7ff" />
          <Text style={styles.resetText}>Restaurar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#030914',
  },
  content: {
    padding: 18,
    paddingBottom: 34,
    gap: 14,
  },
  header: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1d4e73',
    backgroundColor: '#081727',
    padding: 18,
  },
  kicker: {
    color: '#65e4ff',
    fontSize: 12,
    fontWeight: '800',
  },
  title: {
    color: '#f4fbff',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 6,
  },
  sectionTitle: {
    color: '#f4fbff',
    fontSize: 17,
    fontWeight: '800',
  },
  helper: {
    color: '#8da5bc',
    fontSize: 12,
    marginTop: 4,
    maxWidth: 230,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  twoColumns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  savedText: {
    color: '#51f5a8',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#65e4ff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  saveText: {
    color: '#07111f',
    fontSize: 15,
    fontWeight: '800',
  },
  resetButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#244a66',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  resetText: {
    color: '#e8f7ff',
    fontSize: 15,
    fontWeight: '800',
  },
});
