import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';

import products from '../data/products.json';
import Search from '../components/Search';

const ProductScreen = ({ route }) => {
  const { category } = route.params;

  const [productsFiltered, setProductsFiltered] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.category.toLowerCase() === category.toLowerCase() &&
        product.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setProductsFiltered(filtered);
  }, [category, keyword]);

  const renderProductItem = ({ item }) => {
    const hasDiscount = item.discount > 0;
    const finalPrice = hasDiscount
      ? item.price - (item.price * item.discount) / 100
      : item.price;

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.mainImage }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.shortDescription}</Text>
          <Text style={styles.brand}>Marca: {item.brand}</Text>
          <Text style={styles.price}>
            ${finalPrice.toLocaleString('es-AR')}
            {hasDiscount && (
              <Text style={styles.oldPrice}>  ${item.price.toLocaleString('es-AR')}</Text>
            )}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Productos en {category}</Text>

      <Search keyword={keyword} setKeyword={setKeyword} />

      <FlatList
        data={productsFiltered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 110,
    height: 110,
    backgroundColor: '#ccc',
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  brand: {
    fontSize: 12,
    color: '#888',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
  },
  oldPrice: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
  },
});
