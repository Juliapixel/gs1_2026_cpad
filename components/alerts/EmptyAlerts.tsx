import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';

export function EmptyAlerts() {
  return (
    <View style={styles.emptyState}>
      <FontAwesome name="check-circle" size={34} color="#51f5a8" />
      <Text style={styles.emptyTitle}>Nenhuma anomalia detectada</Text>
      <Text style={styles.emptyText}>Os parametros atuais estao dentro dos limites configurados.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#173753',
    backgroundColor: '#081321',
    padding: 28,
    alignItems: 'center',
    gap: 10,
  },
  emptyTitle: {
    color: '#f4fbff',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptyText: {
    color: '#9eb3c8',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
