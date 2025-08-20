import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import Search from "../components/Search";
import { useSelector, useDispatch } from "react-redux";
import { filterProductsByKeyword } from "../features/shop/shopSlice";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useGetProductsByCategoryQuery } from "../services/shopApi";

const ProductCard = ({ item, onPress }) => {
  const hasDiscount = item.discount > 0;
  const finalPrice = hasDiscount
    ? item.price - (item.price * item.discount) / 100
    : item.price;

  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.7}>
      <Image source={{ uri: item.mainImage }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.shortDescription}
        </Text>
        <Text style={styles.brand}>Marca: {item.brand}</Text>
        <Text style={styles.price}>
          ${finalPrice.toLocaleString("es-AR")}
          {hasDiscount && (
            <Text style={styles.oldPrice}>
              {" "}
              ${item.price.toLocaleString("es-AR")}
            </Text>
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ProductsScreen = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const categorySelected = useSelector((state) => state.shop.categorySelected);

  // Usa el hook RTK Query / productos por categoria
  const { data: products, isLoading, error } = useGetProductsByCategoryQuery(categorySelected);

  // Filtrado por palabra clave
  const filteredProducts = products?.filter(product =>product.title.toLowerCase().includes(keyword.toLowerCase()));

  useEffect(() => {
    dispatch(filterProductsByKeyword(keyword));
  }, [keyword, dispatch]);

  // Header dinámico
  useEffect(() => {
    navigation.setOptions({
      title: categorySelected || "Productos",
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("Cart")}>
          <Ionicons name="cart" size={24} color="white" />
        </Pressable>
      ),
    });
  }, [categorySelected, navigation]);

  // Función de renderizado para productos
  const renderProductItem = ({ item }) => (
    <ProductCard
      item={item}
      onPress={() => navigation.navigate("Product", { productId: item.id })}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text style={styles.noResultsText}>Cargando productos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.noResultsText}>Ocurrio un error al cargar los productos</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Productos en {categorySelected}</Text>

      <Search keyword={keyword} setKeyword={setKeyword} />

      {filteredProducts?.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>
            {keyword
              ? `No se encontraron productos para "${keyword}"`
              : "No hay productos en esta categoría"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductItem}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    color: "#222",
  },
  list: {
    paddingBottom: 24,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: "#666",
  },
  card: {
    flexDirection: "row",
    marginBottom: 18,
    backgroundColor: "#f9f9f9",
    borderRadius: 14,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: 110,
    height: 110,
    backgroundColor: "#ddd",
  },
  info: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
  },
  description: {
    fontSize: 13,
    color: "#555",
    marginVertical: 6,
  },
  brand: {
    fontSize: 13,
    color: "#888",
    fontStyle: "italic",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2a9d8f",
  },
  oldPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
  },
});
