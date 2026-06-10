import { MissionData, MissionSettings, Telemetry } from '../types/mission';

export type Errors = Record<string, string>;

export function onlyNumber(value: string) {
  return value.replace(/[^0-9]/g, '');
}

export function validateMission(mission: MissionData) {
  const errors: Errors = {};
  const orbit = Number(mission.orbitKm);

  if (!mission.name.trim()) errors.name = 'Informe o nome da missao.';
  if (!mission.commander.trim()) errors.commander = 'Informe o comandante.';
  if (!mission.communicationBand.trim()) errors.communicationBand = 'Informe a banda de comunicacao.';
  if (!mission.orbitKm.trim() || Number.isNaN(orbit) || orbit < 160 || orbit > 2000) {
    errors.orbitKm = 'Use uma orbita entre 160 e 2000 km.';
  }

  return errors;
}

export function validateTelemetry(telemetry: Telemetry, settings: MissionSettings) {
  const errors: Errors = {};
  const values = {
    battery: telemetry.battery,
    signal: telemetry.signal,
    orbitalStability: telemetry.orbitalStability,
    oxygen: telemetry.oxygen,
    radiation: telemetry.radiation,
  };

  Object.entries(values).forEach(([key, value]) => {
    if (Number.isNaN(value) || value < 0 || value > 100) {
      errors[key] = 'Informe um valor de 0 a 100.';
    }
  });

  if (Number.isNaN(telemetry.temperature) || telemetry.temperature < -80 || telemetry.temperature > 120) {
    errors.temperature = 'Use temperatura entre -80 e 120 C.';
  }

  if (settings.criticalBattery < 5 || settings.criticalBattery > 80) {
    errors.criticalBattery = 'Limite entre 5 e 80%.';
  }

  if (settings.criticalSignal < 5 || settings.criticalSignal > 80) {
    errors.criticalSignal = 'Limite entre 5 e 80%.';
  }

  if (settings.criticalStability < 20 || settings.criticalStability > 95) {
    errors.criticalStability = 'Limite entre 20 e 95%.';
  }

  return errors;
}
