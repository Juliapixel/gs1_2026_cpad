import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MissionAlert } from '../../types/mission';

type AlertCardProps = {
  alert: MissionAlert;
  onAcknowledge: (id: string) => void;
};

function formatTime(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
  }).format(new Date(value));
}

export function AlertCard({ alert, onAcknowledge }: AlertCardProps) {
  const isCritical = alert.severity === 'critical';

  return (
    <View style={[styles.alertCard, isCritical && styles.criticalCard]}>
      <View style={styles.alertHeader}>
        <View style={styles.alertTitleRow}>
          <FontAwesome
            name={isCritical ? 'exclamation-triangle' : 'info-circle'}
            size={18}
            color={isCritical ? '#ff5d73' : '#ffd166'}
          />
          <Text style={styles.alertTitle}>{alert.title}</Text>
        </View>
        <Text style={styles.alertTime}>{formatTime(alert.createdAt)}</Text>
      </View>
      <Text style={styles.alertMessage}>{alert.message}</Text>
      <Pressable style={styles.ackButton} onPress={() => onAcknowledge(alert.id)}>
        <FontAwesome name="check" size={14} color="#07111f" />
        <Text style={styles.ackText}>Reconhecer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  alertCard: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3b3a25',
    backgroundColor: '#17180f',
    padding: 15,
    gap: 12,
  },
  criticalCard: {
    borderColor: '#6d2735',
    backgroundColor: '#1b1018',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  alertTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  alertTitle: {
    color: '#f4fbff',
    fontSize: 16,
    fontWeight: '800',
    flexShrink: 1,
  },
  alertTime: {
    color: '#8da5bc',
    fontSize: 12,
    fontWeight: '700',
  },
  alertMessage: {
    color: '#d2dce7',
    fontSize: 14,
    lineHeight: 20,
  },
  ackButton: {
    alignSelf: 'flex-start',
    height: 34,
    borderRadius: 17,
    backgroundColor: '#65e4ff',
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ackText: {
    color: '#07111f',
    fontSize: 13,
    fontWeight: '800',
  },
});
