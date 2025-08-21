import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from '../../features/cart/cartSlice';
import { Ionicons } from '@expo/vector-icons';

const CartItem = React.memo(({ item, onIncrease, onDecrease, onRemove }) => {
  const hasDiscount = item.discount > 0;
  const finalPrice = hasDiscount
    ? item.price - (item.price * item.discount) / 100
    : item.price;
  const subtotal = finalPrice * item.quantity;

  const handleRemove = () => {
    Alert.alert(
      'Eliminar producto',
      `¿Querés sacar "${item.title}" del carrito?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí, eliminar', style: 'destructive', onPress: onRemove },
      ]
    );
  };

  return (
    <View style={styles.item}>
      <Image source={{ uri: item.mainImage }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>
          ${finalPrice.toLocaleString('es-AR')}
          {hasDiscount && (
            <Text style={styles.oldPrice}>
              {' '}
              ${item.price.toLocaleString('es-AR')}
            </Text>
          )}
        </Text>

        <View style={styles.quantityRow}>
          <Pressable
            style={({ pressed }) => [styles.qtyButton, pressed && styles.btnPressed]}
            onPress={() => onDecrease(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`Disminuir cantidad de ${item.title}`}
          >
            <Text style={styles.qtyButtonText}>−</Text>
          </Pressable>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <Pressable
            style={({ pressed }) => [styles.qtyButton, pressed && styles.btnPressed]}
            onPress={() => onIncrease(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`Aumentar cantidad de ${item.title}`}
          >
            <Text style={styles.qtyButtonText}>+</Text>
          </Pressable>
        </View>

        <Text style={styles.subtotal}>
          Subtotal: ${subtotal.toLocaleString('es-AR')}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.removeButton, pressed && styles.btnPressed]}
        onPress={handleRemove}
        accessibilityRole="button"
        accessibilityLabel={`Eliminar ${item.title} del carrito`}
      >
        <Ionicons name="trash" size={20} color="white" />
      </Pressable>
    </View>
  );
});

export default function CartScreen() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => {
    const finalPrice = item.discount > 0
      ? item.price - (item.price * item.discount) / 100
      : item.price;
    return sum + finalPrice * (item.quantity || 1);
  }, 0);

  const handleClearCart = useCallback(() => {
    Alert.alert(
      'Vaciar carrito',
      '¿Seguro que quieres eliminar todos los productos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí, vaciar', style: 'destructive', onPress: () => dispatch(clearCart()) },
      ]
    );
  }, [dispatch]);

  const handleCheckout = useCallback(() => {
    Alert.alert('Compra realizada', 'Gracias por tu compra.');
  }, []);

  const handleIncrease = useCallback((id) => {
    dispatch(increaseQuantity(id));
  }, [dispatch]);

  const handleDecrease = useCallback((id) => {
    dispatch(decreaseQuantity(id));
  }, [dispatch]);

  const handleRemove = useCallback((id) => {
    dispatch(removeFromCart(id));
  }, [dispatch]);

  if (cart.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons name="cart-outline" size={64} color="#999" />
        <Text style={styles.emptyText}>Tu carrito está vacío</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={() => handleRemove(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Total: ${total.toLocaleString('es-AR')}
        </Text>
        <View style={styles.footerButtons}>
          <Pressable
            style={({ pressed }) => [styles.clearButton, pressed && styles.btnPressed]}
            onPress={handleClearCart}
            accessibilityRole="button"
            accessibilityLabel="Vaciar carrito"
          >
            <Text style={styles.clearButtonText}>Vaciar</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.checkoutButton, pressed && styles.btnPressed]}
            onPress={handleCheckout}
            accessibilityRole="button"
            accessibilityLabel="Finalizar compra"
          >
            <Text style={styles.checkoutButtonText}>Finalizar compra</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
    fontFamily: 'Convergence-Regular',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fafafa',
    marginHorizontal: 8,
    borderRadius: 10,
    marginVertical: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  info: { flex: 1, marginLeft: 14 },
  title: { fontSize: 16, fontWeight: '700', color: '#222' },
  price: { fontSize: 15, fontWeight: '700', color: '#2a9d8f', marginTop: 2 },
  oldPrice: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
    fontWeight: '400',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyButton: {
    backgroundColor: '#ddd',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  btnPressed: {
    opacity: 0.6,
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  subtotal: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
    fontWeight: '500',
  },
  removeButton: {
    backgroundColor: '#d32f2f',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 14,
    color: '#222',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clearButton: {
    backgroundColor: '#777',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  clearButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  checkoutButton: {
    backgroundColor: '#2a9d8f',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  checkoutButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
