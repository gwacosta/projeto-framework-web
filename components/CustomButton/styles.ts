import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#3498db',
  },
  linkButton: {
    backgroundColor: 'transparent',
    padding: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: '#ffffff',
  },
  linkButtonText: {
    color: '#3498db',
    textDecorationLine: 'underline',
  },
});
