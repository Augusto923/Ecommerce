import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import products from '../../data/products.json';

const Price = ({ price, discount }) => {
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount
    ? price - (price * discount) / 100
    : price;

  return (
    <Text style={styles.price}>
      ${finalPrice.toLocaleString('es-AR')}
      {hasDiscount && (
        <Text style={styles.oldPrice}>
          {' '}
          ${price.toLocaleString('es-AR')}
        </Text>
      )}
    </Text>
  );
};

const ProductScreen = ({ route }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();

  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [productId]
  );

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundText}>Producto no encontrado</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    Alert.alert('Agregado', `"${product.title}" fue agregado al carrito.`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: product.mainImage }}
        style={styles.image}
        accessibilityRole="image"
        accessibilityLabel={`Imagen del producto ${product.title}`}
      />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.brand}>Marca: {product.brand}</Text>

      <Price price={product.price} discount={product.discount} />

      <Text style={styles.shortDescription}>{product.shortDescription}</Text>
      <Text style={styles.longDescription}>{product.longDescription}</Text>

      <Text style={styles.stock}>
        {product.stock > 0
          ? `Stock disponible: ${product.stock}`
          : 'Producto sin stock disponible'}
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.addButtonPressed,
          product.stock === 0 && styles.addButtonDisabled,
        ]}
        onPress={handleAddToCart}
        disabled={product.stock === 0}
        accessibilityRole="button"
        accessibilityLabel="Agregar producto al carrito"
      >
        <Text style={styles.addButtonText}>Agregar al carrito</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: '#888',
  },
  image: {
    width: '100%',
    height: 320,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    color: '#222',
  },
  brand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2a9d8f',
    marginBottom: 10,
  },
  oldPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  shortDescription: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  longDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    marginBottom: 16,
  },
  stock: {
    fontSize: 14,
    color: '#444',
    fontWeight: '600',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#2a9d8f',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  addButtonPressed: {
    backgroundColor: '#247a74',
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});