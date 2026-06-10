import { ScrollView, StyleSheet } from 'react-native';
import { AlertCard } from '../../components/alerts/AlertCard';
import { AlertsHeader } from '../../components/alerts/AlertsHeader';
import { EmptyAlerts } from '../../components/alerts/EmptyAlerts';
import { TelemetryStrip } from '../../components/alerts/TelemetryStrip';
import { useMission } from '../../context/MissionContext';

export default function Avisos() {
  const { alerts, acknowledgeAlert, telemetry } = useMission();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <AlertsHeader activeAlerts={alerts.length} />
      <TelemetryStrip telemetry={telemetry} />
      {alerts.length === 0 ? (
        <EmptyAlerts />
      ) : (
        alerts.map((alert) => <AlertCard key={alert.id} alert={alert} onAcknowledge={acknowledgeAlert} />)
      )}
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
});
