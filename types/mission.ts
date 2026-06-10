export type Telemetry = {
  temperature: number;
  battery: number;
  signal: number;
  orbitalStability: number;
  oxygen: number;
  radiation: number;
};

export type MissionData = {
  name: string;
  commander: string;
  orbitKm: string;
  communicationBand: string;
};

export type MissionSettings = {
  autoSimulation: boolean;
  criticalBattery: number;
  criticalSignal: number;
  criticalStability: number;
};

export type MissionAlert = {
  id: string;
  title: string;
  message: string;
  severity: 'critical' | 'warning';
  createdAt: string;
};

export type MissionContextValue = {
  telemetry: Telemetry;
  mission: MissionData;
  settings: MissionSettings;
  alerts: MissionAlert[];
  updateTelemetry: (telemetry: Telemetry) => void;
  updateMission: (mission: MissionData) => void;
  updateSettings: (settings: MissionSettings) => void;
  acknowledgeAlert: (id: string) => void;
  resetMission: () => void;
};
