import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import ShopStack from './src/navigation/ShopStack';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Convergence-Regular': require('./assets/fonts/Convergence-Regular.ttf'),
    'Inter-Italic-VariableFont_opsz,wght': require('./assets/fonts/Inter-Italic-VariableFont_opsz,wght.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <ShopStack />
    </NavigationContainer>
  );
}