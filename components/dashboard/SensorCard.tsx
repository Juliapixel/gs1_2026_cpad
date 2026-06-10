import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
import { SensorStatus, statusColor } from '../../utils/missionStatus';

type SensorCardProps = {
  icon: keyof typeof FontAwesome.glyphMap;
  label: string;
  value: string;
  detail: string;
  status: SensorStatus;
};

export function SensorCard({ icon, label, value, detail, status }: SensorCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconBadge, { borderColor: statusColor[status] }]}>
          <FontAwesome name={icon} size={18} color={statusColor[status]} />
        </View>
        <View style={[styles.statusDot, { backgroundColor: statusColor[status] }]} />
      </View>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardDetail}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 158,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#173753',
    backgroundColor: '#0a1624',
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#07111f',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  cardLabel: {
    color: '#9eb3c8',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 14,
  },
  cardValue: {
    color: '#f4fbff',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
  },
  cardDetail: {
    color: '#71879d',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 8,
  },
});
