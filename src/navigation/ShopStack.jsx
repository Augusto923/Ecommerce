import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoriesScreen, ProductsScreen, ProductScreen } from '../screens';
import { colors } from '../global/theme';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

const Stack = createNativeStackNavigator();

export default function ShopStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.black },
        headerTintColor: colors.white,
        headerTitleStyle: { fontFamily: 'Convergence-Regular' },
      }}
    >
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ title: 'Novae' }}
      />
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={({ route, navigation }) => ({
          title: route.params.category,
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ title: 'Detalle del producto' }}
      />
    </Stack.Navigator>
  );
}