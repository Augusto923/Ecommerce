import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import { Text, View, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

function Header({ title, subtitle }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        header: ({ route }) => <Header title="Novae" subtitle={route.name} />,
        headerStyle: {
          backgroundColor: '#000',
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'PressStart2P',
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    fontFamily: 'Montserrat',
  },
});
