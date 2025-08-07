import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import products from '../data/products.json';


const ProductScreen = ({ route }) => {
    const { category } = route.params;
    const [productsFiltered, setProductsFiltered] = useState([]);


    useEffect(() => {
        const filtered = products.filter(
            (product) =>
                product.category.toLowerCase() === category.toLowerCase() &&
                product.title.toLowerCase().includes(keyword.toLowerCase())
        );
        setProductsFiltered(filtered);
    }, [category, keyword]);

    const renderProductItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Productos de: {category}</Text>
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
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    list: {
        paddingBottom: 20,
    },
    item: {
        padding: 12,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    name: {
        fontSize: 18,
    },
    price: {
        fontSize: 16,
        color: 'green',
    },
});