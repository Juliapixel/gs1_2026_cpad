import { StyleSheet, Text, View } from 'react-native';
import { MissionData } from '../../types/mission';

type MissionHeroProps = {
  mission: MissionData;
};

export function MissionHero({ mission }: MissionHeroProps) {
  return (
    <View style={styles.hero}>
      <View style={styles.titleBlock}>
        <Text style={styles.kicker}>CENTRAL DE MONITORAMENTO</Text>
        <Text style={styles.title}>{mission.name}</Text>
        <Text style={styles.subtitle}>Comandante: {mission.commander}</Text>
      </View>
      <View style={styles.orbitBadge}>
        <Text style={styles.orbitValue}>{mission.orbitKm}</Text>
        <Text style={styles.orbitLabel}>km</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 150,
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
    letterSpacing: 0,
    marginBottom: 8,
  },
  title: {
    color: '#f4fbff',
    fontSize: 31,
    fontWeight: '800',
    letterSpacing: 0,
  },
  subtitle: {
    color: '#9eb3c8',
    fontSize: 14,
    marginTop: 8,
  },
  orbitBadge: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 2,
    borderColor: '#65e4ff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d2435',
  },
  orbitValue: {
    color: '#f4fbff',
    fontSize: 22,
    fontWeight: '800',
  },
  orbitLabel: {
    color: '#9eb3c8',
    fontSize: 12,
    fontWeight: '700',
  },
});
