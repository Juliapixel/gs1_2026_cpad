import { StyleSheet, Text, View } from 'react-native';

type AlertsHeaderProps = {
  activeAlerts: number;
};

export function AlertsHeader({ activeAlerts }: AlertsHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.titleBlock}>
        <Text style={styles.kicker}>ALERTAS AUTOMATICOS</Text>
        <Text style={styles.title}>Controle de anomalias</Text>
      </View>
      <View style={styles.counter}>
        <Text style={styles.counterValue}>{activeAlerts}</Text>
        <Text style={styles.counterLabel}>ativos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1d4e73',
    backgroundColor: '#081727',
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
  },
  titleBlock: {
    flex: 1,
  },
  kicker: {
    color: '#65e4ff',
    fontSize: 12,
    fontWeight: '800',
  },
  title: {
    color: '#f4fbff',
    fontSize: 25,
    fontWeight: '800',
    marginTop: 6,
  },
  counter: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 1,
    borderColor: '#65e4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: {
    color: '#f4fbff',
    fontSize: 22,
    fontWeight: '800',
  },
  counterLabel: {
    color: '#9eb3c8',
    fontSize: 11,
    fontWeight: '700',
  },
});
