import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 28,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 150,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#fff',
    fontSize: 14,
  },
});
