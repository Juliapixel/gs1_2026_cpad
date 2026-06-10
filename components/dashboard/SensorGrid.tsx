import { StyleSheet, View } from 'react-native';
import { MissionData, Telemetry } from '../../types/mission';
import { getStatus } from '../../utils/missionStatus';
import { SensorCard } from './SensorCard';

type SensorGridProps = {
  mission: MissionData;
  telemetry: Telemetry;
};

export function SensorGrid({ mission, telemetry }: SensorGridProps) {
  return (
    <View style={styles.grid}>
      <SensorCard
        icon="thermometer-half"
        label="Sensores termicos"
        value={`${telemetry.temperature} C`}
        detail="Temperatura do modulo tecnico"
        status={getStatus(telemetry.temperature, 58, 72, true)}
      />
      <SensorCard
        icon="battery-three-quarters"
        label="Energia"
        value={`${telemetry.battery}%`}
        detail="Reserva em baterias principais"
        status={getStatus(telemetry.battery, 36, 24)}
      />
      <SensorCard
        icon="wifi"
        label="Comunicacao"
        value={`${telemetry.signal}%`}
        detail={`Canal ativo: ${mission.communicationBand}`}
        status={getStatus(telemetry.signal, 52, 35)}
      />
      <SensorCard
        icon="compass"
        label="Estabilidade orbital"
        value={`${telemetry.orbitalStability}%`}
        detail="Precisao da trajetoria prevista"
        status={getStatus(telemetry.orbitalStability, 74, 62)}
      />
      <SensorCard
        icon="heartbeat"
        label="Suporte de vida"
        value={`${telemetry.oxygen}%`}
        detail="Oxigenio em reserva"
        status={getStatus(telemetry.oxygen, 42, 28)}
      />
      <SensorCard
        icon="sun-o"
        label="Radiacao"
        value={`${telemetry.radiation} mSv`}
        detail="Exposicao acumulada"
        status={getStatus(telemetry.radiation, 58, 78, true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
