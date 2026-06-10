import { StyleSheet, Text, View } from 'react-native';
import { Telemetry } from '../../types/mission';

type TelemetryStripProps = {
  telemetry: Telemetry;
};

export function TelemetryStrip({ telemetry }: TelemetryStripProps) {
  return (
    <View style={styles.telemetryStrip}>
      <Text style={styles.stripText}>BAT {telemetry.battery}%</Text>
      <Text style={styles.stripText}>COM {telemetry.signal}%</Text>
      <Text style={styles.stripText}>ORB {telemetry.orbitalStability}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  telemetryStrip: {
    borderRadius: 8,
    backgroundColor: '#0d2435',
    borderWidth: 1,
    borderColor: '#173753',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stripText: {
    color: '#d7edf7',
    fontSize: 13,
    fontWeight: '800',
  },
});
