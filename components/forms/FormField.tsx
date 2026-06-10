import { StyleSheet, Text, TextInput, View } from 'react-native';

type FormFieldProps = {
  label: string;
  value: string;
  error?: string;
  keyboardType?: 'default' | 'numeric';
  onChangeText: (value: string) => void;
};

export function FormField({ label, value, error, keyboardType = 'default', onChangeText }: FormFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholderTextColor="#61758a"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    width: '100%',
    gap: 6,
  },
  label: {
    color: '#9eb3c8',
    fontSize: 12,
    fontWeight: '800',
  },
  input: {
    minHeight: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#244a66',
    backgroundColor: '#06101c',
    color: '#f4fbff',
    paddingHorizontal: 12,
    fontSize: 15,
    fontWeight: '700',
  },
  inputError: {
    borderColor: '#ff5d73',
  },
  error: {
    color: '#ff8fa0',
    fontSize: 12,
    lineHeight: 16,
  },
});
