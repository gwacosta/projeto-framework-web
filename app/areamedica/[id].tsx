import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
  const { id, name, description } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>Detalhes do item {id} </Text>
      <Text>Nome: {name} </Text>
      <Text>Descrição: {description} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
