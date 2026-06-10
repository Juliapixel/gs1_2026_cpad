import { Telemetry } from '../types/mission';

export type SensorStatus = 'normal' | 'warning' | 'critical';

export const statusColor: Record<SensorStatus, string> = {
  normal: '#51f5a8',
  warning: '#ffd166',
  critical: '#ff5d73',
};

export function getStatus(value: number, warning: number, critical: number, reverse = false): SensorStatus {
  if (reverse) {
    if (value >= critical) return 'critical';
    if (value >= warning) return 'warning';
    return 'normal';
  }

  if (value <= critical) return 'critical';
  if (value <= warning) return 'warning';
  return 'normal';
}

export function orbitalMessage(telemetry: Telemetry) {
  if (telemetry.orbitalStability < 62) return 'Correcao de atitude recomendada';
  if (telemetry.signal < 50) return 'Janela de comunicacao degradada';
  if (telemetry.battery < 35) return 'Economia de energia ativa';
  return 'Trajetoria nominal e comunicacao estavel';
}
