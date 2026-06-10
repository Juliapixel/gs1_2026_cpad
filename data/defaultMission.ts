import { MissionData, MissionSettings, Telemetry } from '../types/mission';

export const defaultTelemetry: Telemetry = {
  temperature: 22,
  battery: 84,
  signal: 91,
  orbitalStability: 96,
  oxygen: 78,
  radiation: 18,
};

export const defaultMission: MissionData = {
  name: 'Artemis LXVII',
  commander: 'Dra. Helena Costa',
  orbitKm: '408',
  communicationBand: 'X-Band',
};

export const defaultSettings: MissionSettings = {
  autoSimulation: true,
  criticalBattery: 24,
  criticalSignal: 35,
  criticalStability: 62,
};
