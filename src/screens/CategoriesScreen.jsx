import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import TextConvergence from '../components/TextConvergence';
import categories from '../data/categories.json';


const CategoriesScreen = ({ navigation }) => {

  const renderCategoryItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <Pressable
        style={({ pressed }) => [
          styles.cardContainer,
          pressed && styles.cardPressed,
        ]}
        onPress={() => navigation.navigate("Products", { category: item.title })}
      >
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay}>
            <TextConvergence style={styles.title}>{item.title}</TextConvergence>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Nuestras Categorías</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginVertical: 20,
    marginLeft: 12,
  },
  listContainer: {
    paddingBottom: 24,
  },
  //Contenedor para cada item, maneja el espaciado exterior
  cardWrapper: {
    flex: 1,
    padding: 8,
  },
  //tarjeta presionable
  cardContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    aspectRatio: 1,
    backgroundColor: '#333',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    
    //Transición suave
    transition: 'transform 0.2s ease-in-out',
  },
  cardPressed: {
    transform: [{ scale: 0.96 }], //Efecto de "hundimiento"
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    width: '100%',
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffffff',
    textAlign: 'center',
  },
});