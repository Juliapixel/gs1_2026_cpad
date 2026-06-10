import { ScrollView, StyleSheet } from 'react-native';
import { MissionHero } from '../../components/dashboard/MissionHero';
import { MissionSummary } from '../../components/dashboard/MissionSummary';
import { SensorGrid } from '../../components/dashboard/SensorGrid';
import { useMission } from '../../context/MissionContext';

export default function Index() {
  const { telemetry, mission, alerts } = useMission();
  const criticalAlerts = alerts.filter((alert) => alert.severity === 'critical').length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <MissionHero mission={mission} />
      <MissionSummary criticalAlerts={criticalAlerts} telemetry={telemetry} />
      <SensorGrid mission={mission} telemetry={telemetry} />
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
    gap: 16,
  },
});
