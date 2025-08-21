import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoriesScreen, ProductsScreen, ProductScreen } from '../screens';
import { colors } from '../global/theme';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import CartScreen from '../screens/cart/CartScreen';

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
        options={({ navigation }) => ({
          title: 'Novae',
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Cart')}>
              <Ionicons name="cart" size={24} color="white" />
            </Pressable>
          ),
        })}
      />

      <Stack.Screen
        name="Products"
        component={ProductsScreen}
      />

      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={({ navigation }) => ({
          title: 'Detalle del producto',
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Cart')}>
              <Ionicons name="cart" size={24} color="white" />
            </Pressable>
          ),
        })}
      />

      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Mi Carrito',
        }}
      />
    </Stack.Navigator>
  );
}
