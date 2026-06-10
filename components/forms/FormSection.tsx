import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type FormSectionProps = {
  title?: string;
  children: ReactNode;
};

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <View style={styles.section}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#173753',
    backgroundColor: '#081321',
    padding: 15,
    gap: 12,
  },
  sectionTitle: {
    color: '#f4fbff',
    fontSize: 17,
    fontWeight: '800',
  },
});
