import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
import { Telemetry } from '../../types/mission';
import { orbitalMessage } from '../../utils/missionStatus';

type MissionSummaryProps = {
  criticalAlerts: number;
  telemetry: Telemetry;
};

export function MissionSummary({ criticalAlerts, telemetry }: MissionSummaryProps) {
  return (
    <View style={styles.summaryPanel}>
      <View style={styles.summaryText}>
        <Text style={styles.summaryLabel}>Estado da missao</Text>
        <Text style={styles.summaryValue}>{orbitalMessage(telemetry)}</Text>
      </View>
      <View style={styles.alertPill}>
        <FontAwesome name="bell" size={15} color={criticalAlerts > 0 ? '#ff5d73' : '#51f5a8'} />
        <Text style={styles.alertPillText}>{criticalAlerts} criticos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryPanel: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#18344e',
    backgroundColor: '#081321',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  summaryText: {
    flex: 1,
  },
  summaryLabel: {
    color: '#8da5bc',
    fontSize: 12,
    fontWeight: '700',
  },
  summaryValue: {
    color: '#e8f7ff',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
    flexShrink: 1,
  },
  alertPill: {
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#244a66',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  alertPillText: {
    color: '#d7edf7',
    fontSize: 12,
    fontWeight: '700',
  },
});
